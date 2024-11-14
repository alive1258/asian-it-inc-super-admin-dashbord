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
import { useCreateVariantsMutation } from "@/redux/api/variantsApi";

const AddVariant = () => {
  // Initialize form handling and state for data
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const query = {};
  const [createDesignation, { isLoading }] = useCreateVariantsMutation();
  const { data } = useGetAllCompaniesQuery(query);
  const router = useRouter();
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Extract company data
  const companyData = data?.data?.data;

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      // Make API request to create designation
      const res = await createDesignation({
        ...data,
      }).unwrap();
      if (res?.success) {
        reset();
        router.back();
        toast.success("Designation added successfully!", {
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
        <h1 className="font-semibold text-[22px] text-white">Add Variant</h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/">
            <span className="text-secondary-base font-medium">Home</span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Add Variant</span>
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
            {/* Variant Name Input */}
            <Input
              placeholder="Enter Variant Name"
              text="name"
              label="Variant Name"
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

export default AddVariant;
