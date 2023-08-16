// // import React from "react";
// // import * as xlsx from "xlsx";
// // import { saveAs } from "file-saver";
// // import { FaFileCsv } from "react-icons/fa";

// // const ExportToExcel = ({ data, fileName, sheetName }) => {
// //   // Function to export data to Excel
// //   const exportToExcel = () => {
// //     // Convert json data to excelsheet
// //     const worksheet = xlsx.utils.json_to_sheet(data);
// //     const workbook = xlsx.utils.book_new();
// //     xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);
// //     const excelBuffer = xlsx.write(workbook, {
// //       bookType: "xlsx",
// //       type: "array",
// //     });
// //     saveAsExcel(excelBuffer, fileName);
// //   };

// //   // Function to save Excel file
// //   const saveAsExcel = (buffer, fileName) => {
// //     const data = new Blob([buffer], { type: "application/octet-stream" });
// //     saveAs(data, fileName);
// //   };

// //   return (
// //     <div className="pt-1 md:-translate-y-3">
// //       <FaFileCsv
// //         className="h-10 lg:w-12 sm:w-6 md:w-10 mt-3 cursor-pointer hover:fill-primary"
// //         onClick={() => exportToExcel()}
// //       />
// //     </div>
// //   );
// // };

// // export default ExportToExcel;




// import React from "react";
// import { saveAs } from "file-saver";
// import { FaFileCsv } from "react-icons/fa";

// const ExportToCSV = ({ data, fileName }) => {
//   // Function to export data to CSV
//   const exportToCSV = () => {
//     console.log("Exporting CSV:", data, fileName);
//     const csvData = convertToCSV(data);
//     const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
//     saveAs(blob, fileName);
//   };

//   // Function to convert JSON data to CSV format
//   const convertToCSV = (data) => {
//     const csvRows = [];
//     const headers = Object.keys(data[0]);

//     csvRows.push(headers.join(','));

//     for (const item of data) {
//       const values = headers.map(header => item[header]);
//       csvRows.push(values.join(','));
//     }

//     return csvRows.join('\n');
//   };

//   return (
//     <div className="pt-1 md:-translate-y-3">
//       <FaFileCsv
//         className="h-10 lg:w-12 sm:w-6 md:w-10 mt-3 cursor-pointer hover:fill-primary"
//         onClick={() => exportToCSV()}
//       />
//     </div>
//   );
// };

// export default ExportToCSV;


import React from "react";
import { saveAs } from "file-saver";
import { FaFileCsv } from "react-icons/fa";

const ExportToCSV = ({ data, fileName,searchTerm }) => {

  console.log("searchTerm:", searchTerm);
  // Function to export data to CSV
  const exportToCSV = () => {
    console.log("Exporting CSV:", data, fileName);
    if (!data || data.length === 0) {
      console.error("No data to export.");
      return;
    }

    const csvData = convertToCSV(data);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, fileName);
  };

  // Function to convert JSON data to CSV format
  const convertToCSV = (data) => {
    const csvRows = [];
    const headers = Object.keys(data[0]);

    csvRows.push(headers.join(','));

    for (const item of data) {
      const values = headers.map(header => item[header]);
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  };

  return (
    <div className="pt-1 md:-translate-y-3">
      <FaFileCsv
        className="h-10 lg:w-12 sm:w-6 md:w-10 mt-3 cursor-pointer hover:fill-primary"
        onClick={() => exportToCSV()}
      />
    </div>
  );
};

export default ExportToCSV;
