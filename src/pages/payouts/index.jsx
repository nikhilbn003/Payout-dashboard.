import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import Table from "../../components/payouts/table";
import SearchBar from "../../components/payouts/searchBar";
import { useRouter } from "next/router";
import Button from "../../components/global/custButton";
import { ServerConfig } from "../../../global/config";
import { POST } from "../../../utils/API";
import { usePayoutData } from "../../context/PayoutContext";
import Link from "next/link";
import { Tooltip } from "@nextui-org/react";
import TablePagination from "../../components/global/tablePagination";
import { saveAs } from "file-saver";
import { FaFileCsv } from "react-icons/fa";
import SearchForm from "../dashboard/samp";

const Payout = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [option, setOption] = useState("");
  const [payData, setPayData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { payoutData, setPayoutData } = usePayoutData();
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [csvData, setCsvData] = useState("");
  const [month, setMonth] = useState();
  const [earnMonth, setEarnMonth] = useState("");

  const columns = [
    "ID",
    "Invest Id",
    "Name",
    "OppId",
    "Opp Name",
    "Earn Month",
    "Earn Amount",
    "Principal",
    "Interest",
    "Consultation",
    "GST Amount",
    "TDS Per",
    "TDS Amount",
    "Principal Remaining",
    "Payout Status",
    // "Report Status"
  ];

  const pageLimit = 10;
  const router = useRouter();

  const displayPayouts = async (searchData) => {
    setIsLoading(true);
    try {
      const SERVERTYPE = ServerConfig.SERVER_TYPE.INTERNAL.TYPE;
      const pageSize = pageLimit || 15;
      const pageNumber = currentPage + 1;

      console.log("pageNumberrr", pageNumber);

      const payload = searchData;

      const response = await POST(
        SERVERTYPE,
        `/Payouts/fetch?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        payload
      );

      console.log("Payouts Details:", response.data.data);
      console.log("pagesssss", response.data.data.count);
      setCount(response.data.data.count);
      console.log("counts", count);
      setPage(Math.ceil(response.data.data.count / pageSize));

      const payouts = response.data.data.data;
      const jsonData = payouts.reverse();

      if (Array.isArray(jsonData)) {
        const modifiedData = jsonData.map((row) => {
          let payoutStatus;
          if (row.report_path === null) {
            payoutStatus = <p className="text-red-500">Pending</p>;
          } else {
            payoutStatus = (
              <Link
                href={row.report_path}
                target="_blank"
                className="text-green-600 underline"
              >
                Generated
              </Link>
            );
          }

          const Name = row.lname ? row.fname + " " + row.lname : row.fname;

          return {
            ID: row.id,
            "Invest Id": row.investid,
            Name: Name,
            OppId: row.portid,
            "Opp Name": row.opp_name,
            "Earn Month": row.earn_month,
            "Earn Amount": row.earn_amount,
            Principal: row.principal,
            Interest: row.interest,
            Consultation: row.consultation,
            "GST Per": row.gst_per === null ? 0 : row.gst_per,
            "GST Amount": row.gst_amount === null ? 0 : row.gst_amount,
            "TDS Per": row.tds_per === null ? 0 : row.tds_per,
            "TDS Amount": row.tds_amount === null ? 0 : row.tds_amount,
            "Principal Remaining": row.principal_remaining,
            "Payout Status": payoutStatus,
          };
        });
        setPayData(modifiedData);
        setPayoutData(modifiedData);
        setIsLoading(false);
      } else {
        console.log("Response data is not an array:", response.data);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const csvDownload = async (searchData) => {
    try {
      const SERVERTYPE = ServerConfig.SERVER_TYPE.INTERNAL.TYPE;
      const pageSize = count;
      const pageNumber = currentPage + 1;
      const payload = searchData;

      const response = await POST(
        SERVERTYPE,
        `/Payouts/csvDownload?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        payload
      );

      console.log("csvDownload :", response.data);
      setCsvData(response.data);
      // Convert the response data to a Blob
      const blob = new Blob([response.data], {
        type: "text/csv;charset=utf-8",
      });

      // Use file-saver to save the Blob as a file
      // saveAs(blob, `payout_data_${searchTerm.earn_month}.csv`);
      saveAs(
        blob,
        searchTerm.earn_month
          ? `payout_data_${searchTerm.earn_month}.csv`
          : "payout_data.csv"
      );
    } catch (error) {
      console.error("csvDownload Error:", error);
    }
  };

  console.log("payyoutss", payData);

  console.log("Context Value:", payoutData);

  useEffect(() => {
    displayPayouts(searchTerm);
    // csvDownload(searchTerm)
  }, [currentPage, searchTerm]);

  // Event handler for pagination
  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
  };

  console.log("currentPagee", currentPage);

  const filteredData = payData;

  const handleAddPayoutsClick = () => {
    router.push("/payouts/add");
  };

  const handleRowClick = (item) => {
    // console.log("Item details:", item);
    router.push(`/payouts/edit?id=${item.ID}`);
  };

  const handleCalculate = () => {
    router.push("/payouts/calculate");
  };

  const handleGenerate = () => {
    router.push("/payouts/generate");
  };

  const handleSend = () => {
    router.push("/payouts/sendReport");
  };

  const handle = (searchData) => {
    console.log("SearchedTerm:", searchTerm);
    console.log("monttttt", searchData);
    displayPayouts(searchData);
    setSearchTerm(searchData);
    setCurrentPage(0);
  };

  const handleExportToCSV = () => {
    console.log("Button clicked");
    csvDownload(searchTerm);
  };

  console.log("serach", searchTerm);

  console.log("filtered", filteredData);

  console.log("month1906", month);
  console.log("option186", option);

  console.log("csvdata22", csvData);

  return (
    <div>
      <Layout>
        <div className="sm:mx-px lg:mx-2 mt-4 ml-3">
          <h2 className="text-2xl font-bold mb-4 sm:ml-3 lg:ml-4  relative inline-block group">
            Payouts
            <div className="absolute left-0 right-0 bottom-0 h-1 bg-primary transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-200"></div>
          </h2>
          <div className="flex justify-between pt-4 pb-4 sm:w-auto md:w-auto lg:w-auto sm:mx-3 rounded-xl bg-white">
            <SearchBar handleSearch={handle} />
            {/* <SearchForm/> */}
            {/* <SearchBar onPageChange={searchPage} onSearch={handleSearch} /> */}
            <div className="flex lg:space-x-28 md:space-x-12 sm:space-x-3 sm:mr-10 md:mr-10 lg:mr-14 lg:-translate-y-4 sm:mt-5 md:mt-3 sm:-translate-y-4">
              <span className="lg:translate-x-14 md:translate-x-6 md:translate-y-1">
                <Button
                  onClick={handleAddPayoutsClick}
                  label="+"
                  label1="Create"
                  lclassName="lg:mr-5 sm:-ml-4 sm:mr-3 text-white"
                  l1className="text-white"
                  className="translate-y-2 sm:w-24 md:w-32 lg:w-auto mt-1"
                />
              </span>
              <div className="flex w-0 lg:mt-0 lg:-translate-x-6 md:translate-y-3 sm:-translate-y-1 md:-translate-x-4">
                <Tooltip content={"CSV Download"} placement="bottomStart">
                  <button className="" onClick={handleExportToCSV}>
                    <FaFileCsv className="hover:fill-green-700 h-10 w-10" />
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
          <div>
            <Button
              label="Calculate Payouts"
              className={`mt-5 ml-5 -mb-8 ${"bg-white text-black"}`}
              onClick={handleCalculate}
            />
            <Button
              label="Generate Reports"
              className={`ml-4 ${"bg-white text-black"}`}
              onClick={handleGenerate}
            />
            <Button
              label="Send Reports"
              className={`ml-4 sm:mt-4 pl-10 pr-12 ${"bg-white text-black"}`}
              onClick={handleSend}
            />
          </div>
          <div className="px-2 pt-4 -mt-7">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="loader ease-linear rounded-full border-4 border-t-8 border-green-400 h-16 w-16 animate-spin"></div>
              </div>
            ) : (
              <Table
                data={filteredData}
                columns={columns}
                onRowView={handleRowClick}
              />
            )}
          </div>
        </div>
        <div className="sticky bottom-0 flex justify-center my-4">
          <TablePagination pageCount={page} onPageChange={handlePageClick} />
        </div>
      </Layout>
    </div>
  );
};

export default Payout;
