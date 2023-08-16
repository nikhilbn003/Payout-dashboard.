import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import Filter from "../global/filter";
import Button from "../global/custButton";
import moment from "moment/moment";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(null); 

  const options = [
    {
      name:"Investment Id",
      value:"investment.id"
    },
     {name:"Opportunity Id",
      value:"investment.portid"
    },
      {name:"Payout Id",
        value:"po.id"
      },
       {
        name:"Investor Id",
        value:"investment.investorid"
      },
       {
        name:"Investor Name",
        value:"investor.fname"
      }
  ];

  const value_options = [
    { value: "", label: "Fields" },
    ...options.map((option) => ({
      value: option.value, 
      label: option.name,
    })),
  ];

  const valueChange = (selectedOption) => {
    setSelectedOption(selectedOption.value);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();

    console.log('Search value:', searchTerm);
    console.log('Month value:', selectedMonth);

    const formattedMonth = selectedMonth ? moment(selectedMonth).format("YYYY-MM") : "";


    const searchData = {
      ...(searchTerm !== "" && {[selectedOption]: searchTerm}),
      ...(formattedMonth && {earn_month: formattedMonth})
    };
  
    console.log("dataa",searchData);
    handleSearch(searchData);
  };

  const isMonthDisabled = selectedOption === "po.id";

  return (
    <div className="flex items-center justify-center">
      <Filter options={value_options} onChange={valueChange} className="px-2 ml-2"/>
      <form>
        <div className=" flex -ml-2">
          <input
            type="text"
            placeholder="Search..."
            className="px-2.5 p-2 w-full text text-gray-900 bg-transparent rounded-r-lg border border-gray-300 appearance-none dark:text-black dark:border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {isMonthDisabled ? (
            <div className="relative ml-4">
              <input
                type="month"
                placeholder="month"
                className="px-2.5 p-2 w-full text text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-300"
                disabled
              />
            </div>
          ) : (
            <div className="relative ml-4">
            <ReactDatePicker
              selected={selectedMonth}
              onChange={(date) => setSelectedMonth(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              className="px-3 p-2 w-full text text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-black dark:border-gray-300"
              placeholderText="Earn Month"
            />
          </div>
          )}
        </div>
      </form>

      <div className="mx-10">
        <button
          type="submit"
          onClick={handleSearchClick}
          className="bg-primary hover:bg-green-400 text-white font-bold py-2 px-8 rounded"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;


