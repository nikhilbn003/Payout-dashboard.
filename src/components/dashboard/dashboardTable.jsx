
import React, { useState } from 'react';
import Link from 'next/link';

const TableWithShowMore = ({ headers, data,showMoreLink,month }) => {


  if (!data) {
   
    return <div>Loading...
    </div>;
  }


  const filteredData = data.slice(0, 5);

  return (
    <section className="py-1 bg-blueGray-50 ">
      <div className="w-full  px-2 mx-auto  ">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-md shadow-green-500/50 rounded-lg bg-white group">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-end">
            <div className="relative w-full px-2 max-w-full flex-grow flex-1 flex items-center">
                <h3 className="font-bold text-base text-blueGray-700">{headers.title}</h3>
                
              </div>

<div className='flex items-center mb-1'>
    <p className="text-sm  text-blueGray-700 font-semibold">{month}</p>
  </div>

              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                
                    <Link href={showMoreLink} legacyBehavior>
                  <a className="bg-green-500 text-white active:bg--600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    Show More
                  </a>
                </Link>
            
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full border-collapse text-blueGray-700">
              <thead className="thead-light">
                <tr>
                  {headers.columns.map((column, index) => (
                    <th
                      key={index}
                      className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, index) => (
                  <tr key={index}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {row[headers.columns[0]]}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {row[headers.columns[1]]}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {row[headers.columns[2]]}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {row[headers.columns[3]]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TableWithShowMore;
