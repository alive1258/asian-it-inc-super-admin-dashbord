"use client";

import {
  useDeleteExpenseCategoryMutation,
  useGetAllExpenseCategoriesQuery,
} from "@/redux/api/expenseCategoriesApi";

import { truncateCharacters } from "@/utils/descriptionTextCounter";
import { filterBySearchQuery } from "@/utils/filterBySearchQuery";
import Link from "next/link";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { LiaEditSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import TableSkeleton from "../Shared/Loading/TableSkeleton";

const AllExpenseCategories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const query = {};
  const { data, error, isLoading } = useGetAllExpenseCategoriesQuery(query);
  const [deleteExpenseCategory] = useDeleteExpenseCategoryMutation();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filters companies based on the search query
  const filteredData = filterBySearchQuery(data?.data?.data, searchQuery);

  const handleDeleteExpenseCategory = async (branch) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Are you sure you want to delete the ExpenseCategory "${branch?.name}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const response = await deleteExpenseCategory(branch?.id).unwrap();
        if (response?.success) {
          Swal.fire({
            title: "Deleted!",
            text: `The ExpenseCategory "${branch?.name}" has been successfully deleted.`,
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
    <section className="md:px-6 px-4 py-7 mt-6 bg-primary-base mx-6 rounded-lg">
      {/* Header section with title and search bar */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">All Expense Category</h1>
        <div className="flex items-center space-x-4">
          {/* Search input with icon */}
          <div className="relative w-full max-w-xs">
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
          <Link href="/expense-categories/add-expense-category">
            <button className="btn w-56">Create Expense Category</button>
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full pt-6">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-primary-base text-[#ADB5BD] border-gray-200 mb-10 rounded-lg">
            <thead>
              <tr className="bg-primary-base text-start text-[13px] ">
                <th className="py-4 px-4 text-start rounded-l-xl">ID</th>
                <th className="py-4 px-4 text-start">Expense Category Name</th>
                <th className="py-4 px-4 text-start">Company Name</th>
                <th className="py-4 px-4 text-start">Remark</th>
                <th className="py-4 px-4 text-start">Branch Status</th>

                <th className="py-4 px-4 text-end rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr
                    key={item?.id}
                    className={`${
                      (index + 1) % 2 === 0
                        ? "text-[#ECECEC]"
                        : "bg-[#1C1C1C] text-[#ECECEC]"
                    } text-[13px] px-[10px]`}
                  >
                    <td className="py-3 rounded-l-xl px-4">{index + 1}</td>

                    <td className="py-3 px-4 ">
                      <div>
                        <p>{truncateCharacters(item?.name, 30)}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 ">
                      <div>
                        <p>{truncateCharacters(item?.company_id?.name, 30)}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p> {item?.remark}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p
                          className={
                            item?.branch_status
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {item?.branch_status ? "Active" : "Inactive"}
                        </p>
                        {/* Correct display based on boolean */}
                      </div>
                    </td>

                    <td className="my-2 px-4 text-end rounded-r-xl">
                      <div className="flex items-center justify-end w-full gap-4">
                        <Link
                          href={`/expense-categories/edit-expense-category/${item?.id}`}
                        >
                          <LiaEditSolid className="text-info-base text-2xl" />
                        </Link>
                        <button
                          onClick={() => handleDeleteExpenseCategory(item)}
                        >
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
    </section>
  );
};

export default AllExpenseCategories;
