import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import SearchBar from "../../components/global/searchBar";
import Table from "../../components/global/table";
import TablePagination from "../../components/global/tablePagination";
import yieldData from "../../../data/yieldData";
import { ServerConfig } from "../../../global/config";
import { POST } from "../../../utils/API";
import ExportToCSV from "../../components/export/excel";

//  add table header
const columns = [
  "ID",
  "OppID",
  "Tenure year",
  "Net irr",
  "Yield Year 1",
  "Yield Year 2",
  "Yield Year 3",
  "Yield Year 4",
  "Yield Year 5",
  "Yield Year 6",
  "Yield Year 7",
  "Yield Year 8",
  "Yield Year 9",
  "Yield Year 10",
  "Status",
  "FP Extension Month",
  "FP Investment Till",
  "Created at",
];

// set number of rows in a table
const pageLimit = 10;

const Yield = () => {
  const [searchPage, setSearchPage] = useState("yield_id,opp_id");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState(yieldData);
  const [selectedOption, setSelectedOption] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state
  const [data, setData] = useState([]);

  // Filter data based on search term
  const filteredData = data.filter(
    (item) =>
      (item.ID && item.ID.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.Opp_ID &&
        item.Opp_ID.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Table pagination
  const offset = currentPage * pageLimit;
  const currentData = filteredData.slice(offset, offset + pageLimit);
  const pageCount = Math.ceil(filteredData.length / pageLimit);

  // Event handler for pagination
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Event handler for search bar
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setCurrentPage(0); // Reset current page to the first page
  };

  useEffect(() => {
    listallYield();
  }, []);

  const listallYield = async () => {
    setLoading(true);
    try {
      const SERVERTYPE = ServerConfig.SERVER_TYPE.INTERNAL.TYPE;

      const payload = {};

      const response = await POST(SERVERTYPE, "/Yields/fetch", payload);
      console.log("Yield Details:", response.data.data.data);

      const yields = response.data.data.data;
      const jsonData = yields.reverse();


      // console.log("resssssss:",jsonData);
      if (Array.isArray(jsonData)) {
        const modifiedData = jsonData.map((row) => {
          const dateOnly = row.cr_at.split("T")[0];
          return {
            ID: row.id,
            OppID: row.portid,
            "Tenure year": row.tenure_years,
            "Net irr": row.net_irr,
            "Yield Year 1": row.yieldyear1,
            "Yield Year 2": row.yieldyear2,
            "Yield Year 3": row.yieldyear3,
            "Yield Year 4": row.yieldyear4,
            "Yield Year 5": row.yieldyear5,
            "Yield Year 6": row.yieldyear6,
            "Yield Year 7": row.yieldyear7,
            "Yield Year 8": row.yieldyear8,
            "Yield Year 9": row.yieldyear9,
            "Yield Year 10": row.yieldyear10,
            "FP Extension Month":
              row.fixed_pay_extension_months === null
                ? 0
                : row.fixed_pay_extension_months,
            "FP Investment Till":
              row.fixed_pay_for_investment_till === null
                ? 0
                : row.fixed_pay_for_investment_till,
            Status: row.status,
            "Created at": dateOnly,
          };
        });
        setData(modifiedData);
        setLoading(false);
      } else {
        console.log("Response data is not an array:", response.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Layout>
        <div className="sm:mx-px lg:mx-2 ml-3 mt-4">
          <h2 className="text-2xl font-bold mb-4 sm:ml-3 lg:ml-4  relative inline-block group">
            Yield
            <div className="absolute left-0 right-0 bottom-0 h-1 bg-primary transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-200"></div>
          </h2>{" "}
          <div className="flex justify-between sm:w-auto md:w-auto lg:w-auto pt-4 pb-4 sm:mx-3 rounded-xl bg-white">
            <span className="mt-2">
              <SearchBar onPageChange={searchPage} onSearch={handleSearch} />
            </span>
            <div className="flex sm:space-x-5 lg:mr-5 md:mr-5 sm:mr-5">
              {/* <span className="lg:mt-2 sm:mt-2 lg:mr-10 md:mr-10 md:mt-2">
                <Filter options={fund_options} onChange={typeChange} />
              </span> */}
              <div className="flex sm:-translate-y-2 md:translate-y-1 lg:mr-6 md:ml-2">
                <ExportToCSV
                  data={filteredData}
                  fileName="earnings_data.xlsx"
                  sheetName="earning data"
                />
              </div>
            </div>
          </div>
          <div className="px-3 pt-4">
            <Table data={currentData} columns={columns} />
          </div>
        </div>
        <div className="flex justify-center my-4">
          <TablePagination
            pageCount={pageCount}
            onPageChange={handlePageClick}
          />
        </div>
      </Layout>
    </div>
  );
};

export default Yield;
