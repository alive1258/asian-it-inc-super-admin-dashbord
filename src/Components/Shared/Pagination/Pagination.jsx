"use client";
import { useState } from "react";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import ReactPaginate from "react-paginate";

const Pagination = ({ totalPage, setSearchValue, total, searchValue }) => {
  const handlePageClick = ({ selected }) => {
    setSearchValue({ ...searchValue, page: selected + 1 });
  };

  const showNextButton = searchValue?.page !== totalPage;
  const showPrevButton = searchValue?.page !== 1;
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    setSearchValue({ ...searchValue, limit: e.target.value });
  };

  return (
    <div className="pt-5 w-full">
      <div className="flex justify-center md:justify-between flex-wrap items-center gap-4 md:gap-3">
        <div className="">
          <select
            id="options"
            value={selectedOption}
            onChange={handleSelectChange}
            className="block w-full mt-1 py-2 px-3 border border-secondary bg-primary-base  rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-blue-500"
          >
            <option className="text-base dark:bg-darkBoxColor" value="10">
              10 / page
            </option>
            <option className="text-base dark:bg-darkBoxColor" value="20">
              20 / page
            </option>
            <option className="text-base dark:bg-darkBoxColor" value="30">
              30 / page
            </option>
            <option className="text-base dark:bg-darkBoxColor" value="50">
              50 / page
            </option>
            <option className="text-base dark:bg-darkBoxColor" value="100">
              100 / page
            </option>
          </select>
        </div>

        <ReactPaginate
          containerClassName="flex items-center gap-1 justify-center py-3"
          breakLabel={<span className="text-[20px] dark:text-white"> ...</span>}
          nextLabel={
            <p
              className={`w-8 h-8 text-center rounded-full text-[14px] flex justify-center font-semibold py-2 border border-darkHoverBgColor dark:text-white hover:text-blue duration-200 ${
                showNextButton
                  ? "hover:dark:bg-darkHoverBgColor"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              <MdKeyboardDoubleArrowRight />
            </p>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={totalPage}
          previousLabel={
            <p
              className={`w-8 h-8 text-center rounded-full text-[14px] flex justify-center font-semibold py-2 border border-darkHoverBgColor dark:text-white hover:text-blue duration-200 ${
                showPrevButton
                  ? "hover:dark:bg-darkHoverBgColor"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              <MdKeyboardDoubleArrowLeft />
            </p>
          }
          
          pageClassName="text-[14px] h-8 w-8 rounded-md flex items-center justify-center dark:text-white hover:text-blue hover:bg-primary-base duration-200"
          activeClassName=" bg-primary text-white" // Active page color
          renderOnZeroPageCount={null}
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default Pagination;
