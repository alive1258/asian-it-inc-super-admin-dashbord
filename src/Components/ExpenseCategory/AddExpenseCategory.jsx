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
import { useCreateExpenseCategoriesMutation } from "@/redux/api/expenseCategoriesApi";

const AddExpenseCategory = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const query = {};
  const [createExpenseCategory, { isLoading }] =
    useCreateExpenseCategoriesMutation();
  const { data } = useGetAllCompaniesQuery(query);
  const router = useRouter();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [branchStatus, setBranchStatus] = useState("true");

  const companyData = data?.data?.data;

  const onSubmit = async (formData) => {
    formData.branch_status = branchStatus === "true";

    try {
      const res = await createExpenseCategory(formData).unwrap();
      if (res?.success) {
        reset();
        router.back();
        toast.success("Expense Category added successfully!", {
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
      <h1 className="font-semibold text-[22px] text-white">
        Add Expense Category
      </h1>
      <div className="flex items-center text-[16px] py-1">
        <Link href="/">
          <span className="text-secondary-base font-medium">Home</span>
        </Link>
        <MdKeyboardArrowRight />
        <span>Add Expense Category</span>
      </div>

      <div className="bg-primary-base rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="grid sm:grid-cols-1 items-start gap-5">
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
            <Input
              placeholder="Enter Expense Category Name"
              text="name"
              label="Expense Category Name"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Remark Name"
              text="remark"
              label="Remark Name"
              register={register}
              errors={errors}
            />
            <div className="flex items-center gap-4">
              <label className="text-white font-medium">Branch Status</label>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="active"
                  value="true"
                  {...register("branch_status")}
                  onChange={() => setBranchStatus("true")}
                  checked={branchStatus === "true"}
                  className="mr-1"
                />
                <label htmlFor="active" className="text-white">
                  Active
                </label>

                <input
                  type="radio"
                  id="inactive"
                  value="false"
                  {...register("branch_status")}
                  onChange={() => setBranchStatus("false")}
                  checked={branchStatus === "false"}
                  className="ml-4 mr-1"
                />
                <label htmlFor="inactive" className="text-white">
                  Inactive
                </label>
              </div>
              {errors.branch_status && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.branch_status.message}
                </p>
              )}
            </div>
            {/* Display dynamic status message */}
            <div className="mt-2 text-white font-medium">
              {branchStatus === "true"
                ? "Branch is Active"
                : "Branch is Inactive"}
            </div>
          </div>

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

export default AddExpenseCategory;
