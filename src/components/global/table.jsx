import React, { useState } from "react";

function Table({ data, columns }) {
  const [doubleTappedRow, setDoubleTappedRow] = useState(null);

  // Handle row double-tap
  const handleDoubleTap = (index) => {
    setDoubleTappedRow(index === doubleTappedRow ? null : index);
  };

  return (
    <>
      {/* Table */}
      <div className="flex mt-10 overflow-x-auto px-3 group">
        <div className="pb-12 rounded-xl border border-gray-200 inline-block mr-3 bg-white  group-hover:block">
          <table className="divide-y divide-gray-200">
            {/* Table Header */}
            <thead className="sticky">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="px-7 py-5 text-center text-sm whitespace-nowrap font-bold text-gray-800 uppercase tracking-wide"
                  >
                    <div className="flex flex-col items-center">
                      <span>{column}</span>
                      <div className="mt-1 h-1 bg-primary w-full transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-200"></div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="bg-gray-100 divide-y-[20px] divide-white overflow-scroll h-max relative">
              {data.map((item, index) => (
                <tr
                  key={item.id}
                  className={`transition-colors ${
                    index === doubleTappedRow
                      ? "bg-opacity-50 ring ring-primary ring-offset-2 rounded-lg"
                      : ""
                  }`}
                  onDoubleClick={() => handleDoubleTap(index)}
                >
                  {columns.map((column) => (
                    <td
                      key={`${item.id}-${column}`}
                      className="px-7 py-4 text-center whitespace-nowrap"
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

      {/* Selected Form */}
      {/* {selectedRow && <SelectedForm selectedRow={selectedRow} />} */}

      {/* Table Pagination */}
      {/* <div className='flex justify-center my-4'>
        <TablePagination  pageCount={pageCount} onPageChange={handlePageClick}/>
    </div> */}
    </>
  );
}

export default Table;
