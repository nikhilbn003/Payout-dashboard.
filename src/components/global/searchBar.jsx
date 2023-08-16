import React, { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import Button from "./custButton";

function SearchBar({ onPageChange, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    // Update the placeholder value based on the page change
    setPlaceholder(` ${onPageChange}...`);
  }, [onPageChange]);

  const handleSearch = () => {
    // Perform search logic here
    onSearch(searchTerm);
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="items-center relative flex">
      {/* Search icon */}
      <div className="">
        <GoSearch className="absolute pointer-events-none w-8 h-4 transform -translate-y-2 left-3 fill-gray-500  ml-2" />
      </div>

      {/* Search input */}
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-7 py-2 ml-6 border sm:w-44 rounded-md focus:outline-none focus:ring focus:ring-primary bg-gray-200"
      />

      {/* Search button */}
      <div className="mx-10">
        <Button
          label="Search"
          lclassName="text-white sm:-ml-3 md:mx-auto"
          onClick={handleSearch}
          className="sm:w-20 md:w-auto lg:w-auto"
        />
      </div>
    </div>
  );
}

export default SearchBar;
