import React, { useState, useEffect } from "react";
import Button from "../../components/global/custButton";
import Table from "../../components/earnings/table";
import Layout from "../../components/layout";
import Filter from "../../components/global/filter";
import ExportToExcel from "../../components/export/excel";
import { useRouter } from "next/router";
import { ServerConfig } from "../../../global/config";
import { GET } from "../../../utils/API";
import { FaSpinner } from "react-icons/fa";
// import { getEarningsData, setEarningsData } from "./earningsData";
import { useEarningsData } from "../../context/EarningContext";
import { Tooltip } from "@nextui-org/react";
import ExportToCSV from "../../components/export/excel";

const Earnings = () => {
  const router = useRouter();
  const { earningsData, setEarningsData } = useEarningsData();
  // const [earnData, setEarnData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedProp, setSelectedProp] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedOpp, setSelectedOpp] = useState("");
  const [Data, setData] = useState([]);
  // const [showRBFValues, setShowRBFValues] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // dropdown value filtering for prop_name
  const prop_options = [
    { value: "", label: " Property name" },
    ...Array.from(new Set(Data.map((option) => option["Prop Name"]))).map(
      (PropName) => ({
        value: PropName,
        label: PropName,
      })
    ),
  ];

  // dropdown value filtering for month
  const month_options = [
    { value: "", label: "Earnings month" },
    ...Array.from(new Set(Data.map((option) => option["Earn Month"]))).map(
      (EarnMonth) => ({
        value: EarnMonth,
        label: EarnMonth,
      })
    ),
  ];

  // dropdown value filtering for opp id
  const opp_options = [
    { value: "", label: "Opportunity id" },
    ...Array.from(new Set(Data.map((option) => option.OppID))).map((OppID) => ({
      value: OppID,
      label: OppID,
    })),
  ];

  // define the column name
  const columns = [
    "ID",
    "OppID",
    "Opportunity Name",
    "Prop Name",
    "Earn Month",
    "Gross Earn",
    "Total Earn",
    "Col Advance",
  ];

  // define number of rows in table
  const pageLimit = 10;

  const displayEarnings = () => {
    setIsLoading(true);
    // fetch the data from the api
    try {
      const SERVERTYPE = ServerConfig.SERVER_TYPE.INTERNAL.TYPE;
      GET(SERVERTYPE, "/Earnings/fetch")
        .then((response) => {
          console.log("Earn Details:", response.data);
          const earnings = response.data.data
          // reverse the earning data 
          const reversedEarnings = earnings.reverse();
          console.log("Reversed earnings", reversedEarnings);
          return reversedEarnings;
        })
        .then((jsonData) => {
          if (Array.isArray(jsonData)) {
            const modifiedData = jsonData.map((row) => ({
              ID: row.id,
              OppID: row.portid,
              'Opportunity Name': row.opp_name,
              'Prop Name': row.prop_name,
              'Earn Month': row.earn_month,
              'Gross Earn': row.gross_earn,
              'Total Earn': row.total_earn,
              'Col Advance': row.perf_fees,
            }));
            setData(modifiedData);
            setEarningsData(modifiedData);
          } else {
            console.log("Response data is not an array:", response.data);
          }
          setIsLoading(false);
        })

        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      alert("server is not available ! please come back after some time");
      // Add route to /dashboard if there is no server
      //  router.push("/dashboard/error");
    }
  };

  console.log("context", earningsData);

  const filterData = (prop, month, opp) => {
    // filter the data based on requirments
    const filtered = Data.filter((item) => {
      const propMatch = prop === "" || item["Prop Name"] === prop;
      const monthMatch = month === "" || item["Earn Month"] === month;
      const oppMatch = opp === "" || item.OppID === opp;
      return propMatch && monthMatch && oppMatch;
    });
    setFilteredData(filtered);
  };

  const handleRowClick = (item) => {
    // const encodedItem = encodeURIComponent(JSON.stringify(item));
    // console.log("row values", encodedItem);
    // router.push("/Earnings/editt3");
    console.log("Item details:", item);
    router.push(`/earnings/edit?id=${item.ID}`);
  };

  // const handleDelete = (item) => {
  //   const updatedData = filteredData.filter((row) => row.id !== item.id);
  //   setFilteredData(updatedData);
  // };

  const handleDelete = () => {
    // Do nothing
  };

  const addEarnings = (newEarningsData) => {
    const updatedData = [...filteredData, newEarningsData];
    setFilteredData(updatedData);
  };

  const handleAddEarningsClick = () => {
    router.push("/earnings/add");
  };

  useEffect(() => {
    displayEarnings();
  }, []);

  useEffect(() => {
    setFilteredData([...Data]);
    // Filter the data initially with empty filters
    filterData(selectedProp, selectedMonth, selectedOpp);
  }, [Data, selectedProp, selectedMonth, selectedOpp]);

  const propChange = (selectedOption) => {
    setSelectedProp(selectedOption.value);
    filterData(selectedOption.value, selectedMonth, selectedOpp);
  };

  const monthChange = (selectedOption) => {
    setSelectedMonth(selectedOption.value);
    filterData(selectedProp, selectedOption.value, selectedOpp);
  };

  const oppChange = (selectedOption) => {
    setSelectedOpp(selectedOption.value);
    filterData(selectedProp, selectedMonth, selectedOption.value);
  };

  return (
    <div>
    <Layout>
      <div className="lg:mx-2 sm:mx-px ml-3 mt-4">
      <h2 className="text-2xl font-bold mb-4 sm:ml-3 lg:ml-4  relative inline-block group">
  Earnings
  <div className="absolute left-0 right-0 bottom-0 h-1 bg-primary transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-200"></div>
</h2>

  
        <div className="flex flex-col sm:flex-row justify-between pb-4 sm:w-auto md:w-auto lg:w-auto pt-4 sm:mx-3 rounded-xl bg-white">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row lg:space-x-5 md:space-x-2 sm:space-x-1 mt-3 sm:mt-0 ml-3 lg:mt-4">
            <div>
              <Filter
                options={prop_options}
                onChange={propChange}
                className="w-40 text-sm sm:text-base"
              />
            </div>

            <div>
              <Filter
                options={opp_options}
                onChange={oppChange}
                className="w-40 text-sm sm:text-base"
              />
            </div>
  
            <div>
              <Filter
                options={month_options}
                onChange={monthChange}
                className="w-40 text-sm sm:text-base"
              />
            </div>
  
            
          </div>
  
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:space-y-2 sm:space-x-5 sm:mr-10 md:mr-10 lg:mr-14 sm:mt-3">
            <Button
              onClick={handleAddEarningsClick}
              label="+"
              label1="Add Earnings"
              lclassName="sm:mr-3 text-white text-sm sm:text-base"
              l1className="text-white text-sm sm:text-base"
              className="sm:w-28 md:w-36 w-40 sm:text-sm lg:pl-3 lg:h-12"
            />
  
            <Tooltip content={"Excel Download"} placement="bottomStart">
              <div className="lg:-mt-2">
                <ExportToCSV
                  data={filteredData}
                  fileName="earnings_data.csv"
                  sheetName="earning data"
                />
              </div>
            </Tooltip>
          </div>
        </div>
  
        {/* Table */}
        <div className="table-container overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="loader ease-linear rounded-full border-4 border-t-8 border-green-400 h-16 w-16 animate-spin"></div>
            </div>
          ) : (
            <Table
              data={filteredData}
              columns={columns}
              pageLimit={pageLimit}
              // handleRowClick={handleRowClick}
              onDelete={handleDelete}
              onRowView={handleRowClick}
            />
          )}
        </div>
      </div>
    </Layout>
  </div>
  
  );
};

export default Earnings;
