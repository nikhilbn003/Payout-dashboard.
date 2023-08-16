

import React from "react";

const PageLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row-reverse">
      {/* Banner */}
      <div className="lg:w-1/4 bg-gray-200">
        {/* Your banner component goes here */}
        {/* Example code for demonstration */}
        <div className="flex justify-center items-center lg:h-64 sm:h-32">
          <img
            src="banner-image.jpg"
            alt="Banner"
            className="lg:max-h-full sm:max-h-full"
          />
        </div>
      </div>

      {/* Table */}
      <div className="lg:w-3/4 bg-white">
        {/* Your table component goes here */}
        {/* Example code for demonstration */}
        <table>
          <thead>
            <tr>
              <th>Header 1</th>
              <th>Header 2</th>
              {/* ... other table headers ... */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Data 1</td>
              <td>Data 2</td>
              {/* ... other table data ... */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PageLayout;


