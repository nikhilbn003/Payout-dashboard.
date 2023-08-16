import React, { useState, useEffect, useContext } from "react";
import Layout from "../../components/layout";
import Table from "../../components/opportunities/table";
import SearchBar from "../../components/global/searchBar";
import TablePagination from "../../components/global/tablePagination";
import { useRouter } from "next/router";
import ExportToExcel from "../../components/export/excel";
import Button from "../../components/global/custButton";
import { ServerConfig } from "../../../global/config";
import { GET } from "../../../utils/API";
import { OppContext } from "../../context/OpportunityContext";
import {Tooltip } from "@nextui-org/react";


// Add table header
const columns = [
  "ID",
  "Property ID",
  "Name",
  "Fund Type",
  "Unit Value",
  "Area",
  "Status",
];

// Set number of rows in a table
const pageLimit = 10;

const Opportunities = () => {
  const { opp, setOpp } = useContext(OppContext);
  const [searchPage, setSearchPage] = useState("ID,Name");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const [showClosedOnly, setShowClosedOnly] = useState(false);
  const [allOpp, setAllOpp] = useState([]);
  const [showRBFOnly, setShowRBFOnly] = useState(false);
  const [showALOnly, setShowALOnly] = useState(false);
  const [showALPOnly, setShowALPOnly] = useState(false);
  const [showFREOnly, setShowFREOnly] = useState(false);
  const [showUHNIOnly, setShowUHNIOnly] = useState(false);
  const [dataCount,setDataCount] = useState(0);

  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();

  const [Data, setData] = useState([]);

  useEffect(() => {
    ListAllOpp();
  }, []);

  // Fetching data from API
  const ListAllOpp = () => {
    setLoading(true);
    try {
      const SERVER_TYPE = ServerConfig.SERVER_TYPE.INTERNAL.TYPE;

      GET(SERVER_TYPE, "/Opportunity/OppList")
        .then((response) => {
          console.log(
            "LIST OF ALL OPPORTUNITIES:-)",
            response.data.opportunities
          );
          setAllOpp(response.data.opportunities);
          console.log("ALL Opps Data::", allOpp);

          return response.data.opportunities;
        })
        .then((jsonData) => {
          if (Array.isArray(jsonData)) {
            const modifiedData = jsonData.map((row) => ({
              "Property ID": row.propid,
              ID: row.id,
              Name: row.name,
              "Net IRR": row.net_irr,
              "Return Factor": row.return_factor,
              Location: (
                <a
                  className="underline text-blue-600 hover:underline-offset-4"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    row.loc
                  )}`}
                >
                 <svg  viewBox="0 0 48 48" className="w-7 h-7 ml-3 fill-primary hover:fill-green-500" xmlns="http://www.w3.org/2000/svg"><path d="M24 4c-7.73 0-14 6.27-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.73-6.27-14-14-14zm0 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>
             
                </a>
              ),
              Area: row.area,
              "Unit Value": row.unit_val,
              'Fund Type':
                row.fundid === 2
                  ? "RBF"
                  : row.fundid && row.fundid === 3
                  ? "FRE"
                  : row.fundid && row.fundid === 4
                  ? "AL"
                  : row.fundid && row.fundid === 6
                  ? "ALP"
                  : row.fundid && row.fundid === 5
                  ? "UHNI"
                  : row.fundid,
              Status: row.status === 1 ? "Open" : "Closed",
            }));
            setData(modifiedData);
            setOpp(modifiedData);
            console.log("Data Count:", modifiedData.length); 
            setDataCount(modifiedData.length)

          } else {
            console.error("Invalid data format:", jsonData);
          }
          setLoading(false); // Update loading state to false after data retrieval
        })
        .catch((error) => {
          console.log(error);
          setLoading(false); // Update loading state to false on error
        });
    } catch (error) {
      console.log("Error fetching data:", error);
      setLoading(false); // Update loading state to false on error
    }
  };

  console.log("context", opp);

  // Filter data based on search term AND opened status
  const filteredData = Data.filter((item) => {
    const includesSearchTerm =
      item.ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Name.toLowerCase().includes(searchTerm.toLowerCase());
    

    if (showOpenOnly) { 
      
      return includesSearchTerm && item.Status === "Open";
    }
    if (showClosedOnly) { 
      
      return includesSearchTerm && item.Status === "Closed";
    }

    if (showRBFOnly) {
      return includesSearchTerm && item["Fund Type"] === "RBF";
    }

    if (showALOnly) {
      return includesSearchTerm && item["Fund Type"] === "AL";
    }

    if (showALPOnly) {
      return includesSearchTerm && item["Fund Type"] === "ALP";
    }

    if (showFREOnly) {
      return includesSearchTerm && item["Fund Type"] === "FRE";
    }

    if (showUHNIOnly) {
      return includesSearchTerm && item["Fund Type"] === "UHNI";
    }

    return (
      includesSearchTerm && (item.Status === "Open" || item.Status === "Closed")
    );
            
  }).sort((a, b) => {       // Custom sorting to display "Open" status first                
    
    if (a.Status === "Open" && b.Status === "Closed") return -1;
    if (a.Status === "Closed" && b.Status === "Open") return 1;
    return 0;

  });

  // Table pagination
  const offset = currentPage * pageLimit;
  const currentData = filteredData.slice(offset, offset + pageLimit);
  const pageCount = Math.ceil(filteredData.length / pageLimit);

  const handlePageClick = (event) => {
    const selectedPage = event.selected;

    setCurrentPage(selectedPage);

  };

  // Event handler for search bar
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm.toLowerCase());
    setCurrentPage(0);
  };

  // Handle row click and route to next page
  const handleRowClick = (item) => {
    setSelectedRow(item);
    // router.push({
    //   pathname: "/opportunities/payOpp",
    //   query: { id: item.ID, name: item.Name },
    // });
  };

  // Check for the status open
  const handleActiveOpportunityClick = () => {
    setShowOpenOnly(true);
    setShowRBFOnly(false);
    setShowALOnly(false);
    setShowALPOnly(false);
    setShowFREOnly(false);
    setShowUHNIOnly(false);
    setShowClosedOnly(false);
    setCurrentPage(0); 
  };

  const handleClosedOpportunityClick = () => {
    setShowClosedOnly(true);
    setShowOpenOnly(false);
    setShowRBFOnly(false);
    setShowALOnly(false);
    setShowALPOnly(false);
    setShowFREOnly(false);
    setShowUHNIOnly(false);
    setCurrentPage(0); 
  };

  const handleAllOpportunityClick = () => {
    setShowOpenOnly(false);
    setShowRBFOnly(false);
    setShowClosedOnly(false);
    setShowALOnly(false);
    setShowALPOnly(false);
    setShowFREOnly(false);
    setShowUHNIOnly(false);
    setCurrentPage(0); 
  };

  const handleRBFClick = () => {
    setShowRBFOnly(true);
    setShowALOnly(false);
    setShowALPOnly(false);
    setShowClosedOnly(false);
    setShowFREOnly(false);
    setShowUHNIOnly(false);
    setShowOpenOnly(false);
    setCurrentPage(0); 
  };

  const handleALClick = () => {
    setShowRBFOnly(false);
    setShowClosedOnly(false);
    setShowALOnly(true);
    setShowALPOnly(false);
    setShowFREOnly(false);
    setShowUHNIOnly(false);
    setShowOpenOnly(false);
    setCurrentPage(0); 
  };

  const handleALPClick = () => {
    setShowRBFOnly(false);
    setShowALOnly(false);
    setShowClosedOnly(false);
    setShowALPOnly(true);
    setShowFREOnly(false);
    setShowOpenOnly(false);
    setShowUHNIOnly(false);
    setCurrentPage(0); 
  };

  const handleFREClick = () => {
    setShowRBFOnly(false);
    setShowClosedOnly(false);
    setShowALOnly(false);
    setShowALPOnly(false);
    setShowFREOnly(true);
    setShowUHNIOnly(false);
    setShowOpenOnly(false);
    setCurrentPage(0); 
  };

  const handleUHNIClick = () => {
    setShowClosedOnly(false);
    setShowRBFOnly(false);
    setShowALOnly(false);
    setShowALPOnly(false);
    setShowFREOnly(false);
    setShowUHNIOnly(true);
    setShowOpenOnly(false);
    setCurrentPage(0); 
  };

  return (
    <>
      <Layout>
        <div className="sm:mx-px lg:mx-2 mt-4 ml-3">
          <h2 className="text-2xl font-bold mb-4 sm:ml-3 lg:ml-4  relative inline-block group">
  Opportunities
  <div className="absolute left-0 right-0 bottom-0 h-1 bg-primary transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-200"></div>
</h2>

          <div className="flex justify-between pt-4 sm:mx-3 sm:w-auto md:w-auto lg:w-auto rounded-xl bg-white">
            <div className="mt-2">
              <SearchBar onPageChange={searchPage} onSearch={handleSearch} />
            </div>
            <div className="mx-10 lg:-translate-y-1 md:translate-y-0.5 sm:-translate-y-2 mb-2">
               <Tooltip content={"Excel Download "} placement="bottomStart" >
              <ExportToExcel
                data={currentData}
                fileName="opportunities_data.xlsx"
                sheetName="opportunity data"
              />
              </Tooltip>
            </div>
          </div>
          <div className="mt-5  w-full">
            <Button
              label="All"
              className={`mt-5 ml-4 -mb-8 w-20 ${
                !showOpenOnly &&
                !showRBFOnly &&
                !showALOnly &&
                !showALPOnly &&
                !showFREOnly &&
                !showUHNIOnly
                  ? "bg-primary text-white"
                  : "bg-white text-black"
              }`}
              onClick={handleAllOpportunityClick}
            />
            <Button
              label="RBF"
              className={`mt-5 ml-4 -mb-8 w-20 ${
                showRBFOnly ? "bg-primary text-white" : "bg-white text-black"
              }`}
              onClick={handleRBFClick}
            />
            <Button
              label="AL"
              className={`mt-5 ml-4 -mb-8 w-20 ${
                showALOnly ? "bg-primary text-white" : "bg-white text-black"
              }`}
              onClick={handleALClick}
            />
            <Button
              label="ALP"
              className={`mt-5 ml-4 -mb-8 w-20 ${
                showALPOnly ? "bg-primary text-white" : "bg-white text-black"
              }`}
              onClick={handleALPClick}
            />
            <Button
              label="FRE"
              className={`mt-5 ml-4 -mb-8 w-20 ${
                showFREOnly ? "bg-primary text-white" : "bg-white text-black"
              }`}
              onClick={handleFREClick}
            />
            <Button
              label="UHNI"
              className={`mt-5 ml-4 -mb-8 w-24 ${
                showUHNIOnly ? "bg-primary text-white" : "bg-white text-black"
              }`}
              onClick={handleUHNIClick}
            />
            <Button
              label="Active"
              className={` mt-5 ml-4 -mb-8 w-24 ${
                showOpenOnly ? "bg-primary text-white" : "bg-white text-black"
              }`}
              onClick={handleActiveOpportunityClick}
            />
            {/* <Button
              label="Closed"
              className={` mt-5 ml-4 -mb-8 w-24 ${
                showClosedOnly ? "bg-primary text-white" : "bg-white text-black"
              }`}
              onClick={handleClosedOpportunityClick}
            /> */}

          </div>
              
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="loader ease-linear rounded-full border-4 border-t-8 border-green-400 h-16 w-16 animate-spin"></div>
            </div>
          ) : (
            <div className="mt-10">
              <Table
                data={currentData}
                columns={columns}
                handleRowClick={handleRowClick}
              />
            </div>
        
          )}
          <div className="flex justify-end">
         
          </div>
        </div>
        <TablePagination pageCount={pageCount} onPageChange={handlePageClick} />
      </Layout>
    </>
  );
};

export default Opportunities;
