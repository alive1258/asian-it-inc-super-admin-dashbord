"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import Input from "@/Components/UI/Forms/Input";
import Select from "@/Components/UI/Forms/Select";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useGetAllCompaniesQuery } from "@/redux/api/companiesApi";
import { useCreateSuppliersMutation } from "@/redux/api/suppliersApi";

const AddSuppliers = () => {
  // Initialize form handling and state for data
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const query = {};
  const [createSupplier, { isLoading }] = useCreateSuppliersMutation();
  const { data } = useGetAllCompaniesQuery(query);
  const router = useRouter();
  const [selectedCompany, setSelectedCompany] = useState(null);
  // Extract company data
  const companyData = data?.data?.data;

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      // Make API request to create designation
      const res = await createSupplier({
        ...data,
      }).unwrap();
      if (res?.success) {
        reset();
        router.back();
        toast.success("Supplier added successfully!", {
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
        <h1 className="font-semibold text-[22px] text-white">Add Supplier</h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/">
            <span className="text-secondary-base font-medium">Home</span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Add Supplier</span>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-primary-base rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="grid sm:grid-cols-2 items-start gap-5">
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
            {/* business_name Input */}
            <Input
              placeholder="Enter Business Name"
              text="business_name"
              label="Business Name"
              register={register}
              errors={errors}
            />
            {/* business_logo Input */}
            <Input
              placeholder="Enter Business Logo"
              text="business_logo"
              label="Business Logo"
              register={register}
              errors={errors}
            />
            {/* business_owner_name Input */}
            <Input
              placeholder="Enter Business Owner Name"
              text="business_owner_name"
              label="Business Owner Name"
              register={register}
              errors={errors}
            />
            {/* business_owner_mobile Input */}
            <Input
              placeholder="Enter Business Owner Mobile"
              text="business_owner_mobile"
              label="Business Owner Mobile"
              register={register}
              errors={errors}
            />
            {/* business_owner_photo Input */}
            <Input
              placeholder="Enter Business Owner Photo"
              text="business_owner_photo"
              label="Business Owner Photo"
              register={register}
              errors={errors}
            />
            {/* contact_person_name Input */}
            <Input
              placeholder="Enter Contact Person Name"
              text="contact_person_name"
              label="Contact Person Name"
              register={register}
              errors={errors}
            />
            {/* contact_person_mobile Input */}
            <Input
              placeholder="Enter Contact Person Mobile"
              text="contact_person_mobile"
              label="Contact Person Mobile"
              register={register}
              errors={errors}
            />
            {/* business_address Input */}
            <Input
              placeholder="Enter Business Address"
              text="business_address"
              label="Business Address"
              register={register}
              errors={errors}
            />
            {/* remarks Input */}
            <Input
              placeholder="Enter Remarks"
              text="remarks"
              label="Remarks"
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

export default AddSuppliers;
