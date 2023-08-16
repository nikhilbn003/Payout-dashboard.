
import React, { useState, useEffect, useRef } from "react";
import TablePagination from "../global/tablePagination";

function Table({ data, columns, pageLimit, onDelete, onRowView }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewedData, setViewedData] = useState(null);
  const [doubleTappedRow, setDoubleTappedRow] = useState(null);
  const dropdownRef = useRef(null);


   // Handle row double-tap
   const handleDoubleTap = (index) => {
    setDoubleTappedRow(index === doubleTappedRow ? null : index);
  };

  // Calculate the offset and current data based on the current page
  const offset = currentPage * pageLimit;
  const currentData = data.slice(offset, offset + pageLimit);
  const pageCount = Math.ceil(data.length / pageLimit);

  // Handle page change
  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
  };

  // Handle dropdown click
  const handleDropdownClick = (index) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  // Handle row view
  const handleRowView = (item) => {
    setViewedData(item);
    onRowView(item);
  };

  // Handle row delete
  const handleRowDelete = (item) => {
    console.log("Delete:", item);
    // onDelete(item);
  };

  // Close the dropdown menu when clicking outside
  const handleClickOutsideDropdown = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !event.target.classList.contains("bi-three-dots-vertical")
    ) {
      setSelectedRow(null);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutsideDropdown);
    return () => {
      window.removeEventListener("click", handleClickOutsideDropdown);
    };
  }, []);

  return (
    <>
      <div className="flex mt-10 overflow-x-auto px-3 group">
        <div className="pb-12 rounded-xl border border-gray-200 inline-block mr-3 bg-white  group-hover:block">
          <table className="divide-y divide-gray-200">
            {/* Table headers */}
            <thead className="sticky">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="px-7 py-5 text-center whitespace-nowrap text-sm font-bold text-gray-500 uppercase tracking-wide"
                  >
                    <div className="flex flex-col items-center">
                      <span>{column}</span>
                      <div className="mt-1 h-1 bg-primary w-full transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-200"></div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-gray-100 divide-y-[20px] divide-white overflow-scroll h-max relative">
              {/* Table rows */}
              {currentData.map((item, index) => (
                <tr
                 key={item.id}
                 className={`transition-colors ${
                  index === doubleTappedRow ? "bg-opacity-50 ring ring-primary ring-offset-2 rounded-lg" : ""
                }`}
                onDoubleClick={() => handleDoubleTap(index)}>
                  {columns.map((column) => (
                    <td
                      key={`${item.id}-${column}`}
                      className="px-7 py-4 text-center whitespace-nowrap"
                    >
                       <div
                        className={`text-sm text-black ${
                          index === doubleTappedRow ? "text-base/5 font-semibold " : ""
                        }`}
                      >
                        {item[column]}
                        </div>
                    </td>
                  ))}
                  <td className="px-3 pb-5">
                    <div className="text-sm text-gray-500">
                      <div>
                        {/* Dropdown button */}
                        <button
                          className="flex p-2 rounded-md  text-gray-600 hover:text-gray-900 focus:outline-none"
                          onClick={() => handleDropdownClick(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-three-dots-vertical translate-y-2"
                            viewBox="0 0 16 16"
                            onClick={() => handleDropdownClick(index)}
                          >
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                          </svg>
                        </button>
                      </div>
                      {/* Dropdown menu */}
                      {selectedRow === index && (
                        <div
                          ref={dropdownRef}
                          className="absolute right-0 mt-2 w-24 justify-center mr-3 bg-white rounded-md shadow-lg"
                        >
                          <ul className="list-none w-full">
                            <li className="py-1 px-3 hover:bg-gray-100 hover:rounded-t-md cursor-pointer">
                              <button onClick={() => handleRowView(item)}>
                              <span className="px-5"> Edit</span>
                              </button>
                            </li>
                            <li className="py-1 px-3 hover:bg-gray-100 hover:rounded-b-md cursor-pointer">
                              <button onClick={() => handleRowDelete(item)}>
                                <span className="blur-[1px] px-3">Delete</span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center my-4">
        {/* Table pagination */}
        <TablePagination pageCount={pageCount} onPageChange={handlePageClick} />
      </div>
    </>
  );
}

export default Table;
