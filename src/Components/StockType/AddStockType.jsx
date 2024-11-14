"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import Input from "@/Components/UI/Forms/Input";
import Select from "@/Components/UI/Forms/Select";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useCreateDesignationMutation } from "@/redux/api/designationApi";
import { useGetAllCompaniesQuery } from "@/redux/api/companiesApi";
import { useCreateStockTypesMutation } from "@/redux/api/stockTypesApi";

const AddStockType = () => {
  // Initialize form handling and state for data
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const query = {};
  const [createStockType, { isLoading }] = useCreateStockTypesMutation();
  const { data } = useGetAllCompaniesQuery(query);
  const router = useRouter();
  const [selectedCompany, setSelectedCompany] = useState(null);
  // Extract company data
  const companyData = data?.data?.data;

  // Form submission handler
  const onSubmit = async (data) => {
    console.log("desi data", data);
    try {
      // Make API request to create designation
      const res = await createStockType({
        ...data,
      }).unwrap();
      if (res?.success) {
        reset();
        router.back();
        toast.success("Stock Type added successfully!", {
          position: toast.TOP_RIGHT,
        });
      } else {
        toast.error(res.message, { position: toast.TOP_RIGHT });
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred", {
        position: toast.TOP_RIGHT,
      });
    }
  };

  return (
    <section className="md:px-6 px-4 py-7 mt-6 bg-primary-base mx-6 rounded-lg">
      {/* Header Section */}
      <div className="">
        <h1 className="font-semibold text-[22px] text-white">Add Stock Type</h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/">
            <span className="text-secondary-base font-medium">Home</span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Add Stock Type</span>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-primary-base rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="grid sm:grid-cols-1 items-start gap-5">
            {/* Dropdown for Company Selection */}
            <Select
              label="Select Company"
              text="company_id"
              placeholder="Select a company"
              options={companyData?.map((company) => ({
                value: company?.id,
                label: company?.name,
              }))}
              selectedOption={selectedCompany}
              setSelectedOption={setSelectedCompany}
              register={register}
              errors={errors}
            />
            {/* Designation Name Input */}
            <Input
              placeholder="Enter Stock Type Name"
              text="name"
              label="Stock Type Name"
              register={register}
              errors={errors}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button disabled={isLoading} className="btn" type="submit">
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddStockType;
