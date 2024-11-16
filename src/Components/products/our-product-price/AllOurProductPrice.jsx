"use client";
import { truncateCharacters } from "@/utils/descriptionTextCounter";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { LiaEditSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import Swal from "sweetalert2";
import {
  useDeleteOurProductPriceMutation,
  useGetAllOurProductPriceQuery,
} from "@/redux/api/ourProductPriceApi";
import Pagination from "@/Components/Shared/Pagination/Pagination";
import TableSkeleton from "@/Components/Shared/Loading/TableSkeleton";

const AllOurProductPrice = () => {
  const [searchValue, setSearchValue] = useState({
    limit: 10,
    page: 1,
    search: "",
  });
  const { data, isLoading, error } = useGetAllOurProductPriceQuery(searchValue);
  const [deleteOurProductPrice] = useDeleteOurProductPriceMutation();

  const handleSearchChange = (e) => {
    setSearchValue({ ...searchValue, search: e.target.value.toLowerCase() });
  };

  const handleDeleteProduct = async (ourProduct) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Are you sure you want to delete the our product price "${ourProduct?.name}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const response = await deleteOurProductPrice(ourProduct?.id).unwrap();
        if (response?.success) {
          Swal.fire({
            title: "Deleted!",
            text: `The our product price"${ourProduct?.name}" has been successfully deleted.`,
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
    <>
      <section className="md:px-6 px-4 py-7 mt-6 bg-primary-base mx-6 rounded-lg">
        {/* Header section with title and search bar */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Our Product Price</h1>
          <div className="flex items-center space-x-4">
            {/* Search input with icon */}
            <div className="relative w-full max-w-xs">
              <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                onChange={handleSearchChange}
                placeholder="Search for..."
                className="bg-primary-base border border-gray-700 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
              />
            </div>
            {/* Link to create a new company */}
            <Link href="/products/our-product-price/add-our-product-price">
              <button className="btn w-56">Create our product price</button>
            </Link>
          </div>
        </div>

        <div className="mx-auto w-full pt-6">
          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-primary-base text-[#ADB5BD] border-gray-200 mb-10 rounded-lg">
              <thead>
                <tr className="bg-primary-base text-start text-[13px] ">
                  <th className="py-4 px-4 text-start rounded-l-xl">ID</th>
                  <th className="py-4 px-4 text-start">Name</th>
                  <th className="py-4 px-4 text-start">Image</th>
                  <th className="py-4 px-4 text-start">Price</th>
                  <th className="py-4 px-4 text-start">Description</th>
                  <th className="py-4 px-4 text-start">Date</th>

                  <th className="py-4 px-4 text-end rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.data?.length > 0 ? (
                  data?.data?.data?.map((item, index) => (
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
                          <Image
                            className="w-[200px] h-[100px] object-cover"
                            width={200}
                            height={100}
                            src={
                              process.env.NEXT_PUBLIC_IMAGE_URL + item?.photo
                            }
                            alt="service"
                          />
                        </div>
                      </td> 
                      <td className="py-3 px-4">
                        <div>
                          <p> {item?.price} </p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p>{truncateCharacters(item?.description, 30)}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-black dark:text-white text-[14px] w-[180px]">
                          {moment(item?.created_at).format(
                            "DD-MM-YYYY / HH:mm:ss"
                          )}
                        </p>
                      </td>

                      <td className="my-2 px-4 text-end rounded-r-xl">
                        <div className="flex items-center justify-end w-full gap-4">
                          <Link
                            href={`/products/our-product-price/edit/${item?.id}`}
                          >
                            <LiaEditSolid className="text-info-base text-2xl" />
                          </Link>
                          <button onClick={() => handleDeleteProduct(item)}>
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

        <Pagination
          totalPage={data?.data?.meta?.totalPages}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </section>
    </>
  );
};

export default AllOurProductPrice;
