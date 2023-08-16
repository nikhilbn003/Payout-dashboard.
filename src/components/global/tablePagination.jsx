import React from "react";
import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const TablePagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={onPageChange}
      previousLabel={
        <span className="w-10 h-10 flex items-center justify-center bg-white hover:bg-green-600 rounded-md mr-4">
          <BsChevronLeft />
        </span>
      }
      nextLabel={
        <span className="w-10 h-10 flex items-center justify-center bg-white hover:bg-green-600 rounded-md">
          <BsChevronRight />
        </span>
      }
      breakLabel={<span className="mr-4">...</span>}
      breakClassName="break-me"
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      containerClassName="flex items-center justify-center mt-8 mb-4"
      subContainerClassName="pages pagination"
      activeClassName="bg-primary text-white"
      pageClassName="block border- border-solid border-lightGray hover:bg-green-600 w-10 h-10 flex items-center justify-center rounded-md mr-4"
      renderOnZeroPageCount={null}
    />
  );
};

export default TablePagination;

// <ReactPaginate
//       pageCount={pageCount}
//       onPageChange={onPageChange}
//       previousLabel={
//         <span className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-md mr-4">
//           <BsChevronLeft />
//         </span>
//       }
//       nextLabel={
//         <span className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-md">
//           <BsChevronRight />
//         </span>
//       }
//       breakLabel={<span className="mr-4">...</span>}
//       breakClassName="break-me"
//       marginPagesDisplayed={2}
//       pageRangeDisplayed={5}
//       containerClassName="flex items-center justify-center mt-8 mb-4"
//       subContainerClassName="pages pagination"
//       activeClassName="active"
//     />
