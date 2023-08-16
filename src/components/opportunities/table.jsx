import React, { useState } from "react";
import TablePagination from "../global/tablePagination";

function Table({ data, columns, handleRowClick }) {
  const [doubleTappedRow, setDoubleTappedRow] = useState(null);

  // Handle row double-tap
  const handleDoubleTap = (index) => {
    setDoubleTappedRow(index === doubleTappedRow ? null : index);
  };

  if (!Array.isArray(data)) {
    return <p>No data available</p>;
  }

  return (
    <>
      <div className="flex mt-10 overflow-x-auto px-3 group">
        <div className="pb-12 rounded-xl border border-gray-200 inline-block mr-3 bg-white  group-hover:block">
          <table className="divide-y divide-gray-200">
            <thead className="sticky">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="px-7 w-72 py-5 relative text-center whitespace-nowrap text-sm font-bold text-gray-500 uppercase tracking-wide group"
                  >
                    <div className="flex flex-col items-center">
                      <span>{column}</span>
                      <div className="mt-1 h-1 bg-primary w-full transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-200"></div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-gray-100 divide-white divide-y-[20px] relative h-max overflow-scroll">
              {data.map((item, index) => (
                <tr
                  key={item.id}
                  className={`transition-colors ${
                    index === doubleTappedRow
                      ? "bg-opacity-50 ring ring-primary ring-offset-2 rounded-lg"
                      : ""
                  }`}
                  onDoubleClick={() => handleDoubleTap(index)}
                  onClick={() => handleRowClick(item)}
                >
                  {columns.map((column) => (
                    <td
                      key={`${item.id}-${column}`}
                      className="px-7 py-4 text-center "
                    >
                      <div
                        className={`text-sm text-black ${
                          index === doubleTappedRow
                            ? "text-base/5 font-semibold "
                            : ""
                        }`}
                      >
                        {item[column]}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* {selectedRow && <SelectedForm selectedRow={selectedRow} />} */}
      {/* <div className='flex justify-center my-4'>
        <TablePagination  pageCount={pageCount} onPageChange={handlePageClick}/>
    </div> */}
    </>
  );
}

export default Table;
