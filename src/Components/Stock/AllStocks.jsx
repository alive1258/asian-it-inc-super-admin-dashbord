"use client";
import Link from "next/link";
import React, { useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import TableSkeleton from "../Shared/Loading/TableSkeleton";
import { filterBySearchQuery } from "@/utils/filterBySearchQuery";
import { IoSearch } from "react-icons/io5";
import { truncateCharacters } from "@/utils/descriptionTextCounter";

import {
  useDeleteStockMutation,
  useGetAllStocksQuery,
} from "@/redux/api/stocksApi";

const AllStocks = () => {
  const query = {};
  const [searchQuery, setSearchQuery] = useState(""); // State to track search input value
  const { data, error, isLoading } = useGetAllStocksQuery(query);
  const [deleteStock] = useDeleteStockMutation();

  // Handler to update search query as user types
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filters companies based on the search query
  const filteredData = filterBySearchQuery(data?.data?.data, searchQuery);

  // Confirm and delete the selected company
  const handleDeleteStock = async (stock) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Are you sure you want to delete the stock "${stock?.name}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      // Proceed with deletion if confirmed
      if (result.isConfirmed) {
        const response = await deleteStock(stock?.id).unwrap();
        if (response?.success) {
          Swal.fire({
            title: "Deleted!",
            text: `The stock "${stock?.name}" has been successfully deleted.`,
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: `${response?.message}`,
            icon: "error",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: `An error occurred: ${error.data || error.message}`,
        icon: "error",
      });
    }
  };

  // Render loading state
  if (isLoading) {
    return <TableSkeleton />;
  }

  // Render error state if there was an error fetching data
  if (error) {
    return (
      <div className="flex h-[85vh] w-full items-center justify-center">
        <h1>Error: {error.message}</h1>
      </div>
    );
  }

  return (
    <div className="md:px-6 px-4 pt-5 mt-6 bg-primary-base mx-6 rounded-lg">
      {/* Header section with title and search bar */}
      <div className="md:flex justify-between items-center">
        <h1 className="text-2xl font-semibold">All Stock </h1>
        <div className="md:flex items-center space-x-4">
          {/* Search input with icon */}
          <div className="relative w-full max-w-xs md:mt-0 mt-4">
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for..."
              className="bg-primary-base border border-gray-700 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
            />
          </div>
          {/* Link to create a new company */}
          <Link href="/designations/add-designation">
            <button className="btn w-44">Create Stock </button>
          </Link>
        </div>
      </div>
      <div className="mx-auto w-full pt-6">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-primary-base text-[#ADB5BD] border-gray-200 mb-10 rounded-lg">
            <thead>
              <tr className="bg-primary-base text-start text-[16px] ">
                <th className="py-4 px-4 text-start rounded-l-xl">ID</th>

                <th className="py-4 px-4 text-start">Product Name</th>
                <th className="py-4 px-4 text-start">Stock</th>
                <th className="py-4 px-4 text-start">Average Price</th>
                <th className="py-4 px-4 text-start">Company Name</th>
                <th className="py-4 px-4 text-start">Branch Name</th>
                <th className="py-4 px-4 text-start">Stock Type Name</th>

                <th className="py-4 px-4 text-end rounded-r-xl">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredData?.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      (index + 1) % 2 === 0
                        ? "text-[#ECECEC]"
                        : "bg-[#1C1C1C] text-[#ECECEC]"
                    } text-[14px] px-[10px]`}
                  >
                    <td className="py-5 px-4">{index + 1}</td>
                    <td className="py-5 px-4">
                      <p>{truncateCharacters(item?.product_id?.name, 30)}</p>
                    </td>
                    <td className="py-5 px-4">
                      <p>{truncateCharacters(item?.stock, 30)}</p>
                    </td>
                    <td className="py-5 px-4">
                      <p>{truncateCharacters(item?.average_price, 30)}</p>
                    </td>
                    <td className="py-5 px-4">
                      <p>{truncateCharacters(item?.company_id?.name, 30)}</p>
                    </td>
                    <td className="py-5 px-4">
                      <p>{truncateCharacters(item?.branch_id?.name, 30)}</p>
                    </td>

                    <td className="py-5 px-4">
                      <p>{truncateCharacters(item?.stock_type_id?.name, 30)}</p>
                    </td>

                    <td className="my-2 px-4 text-end">
                      {/* Edit and delete action icons */}
                      <div className="flex items-center justify-end w-full gap-4">
                        <Link href={`/stocks/edit-stock/${item?.id}`}>
                          <LiaEditSolid className="text-info-base text-2xl" />
                        </Link>
                        <button onClick={() => handleDeleteStockType(item)}>
                          <MdDelete className="text-danger-base text-2xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                // Display message when no companies match the search criteria
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-6 text-red-600 text-2xl font-bold"
                  >
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllStocks;
