"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import Input from "@/Components/UI/Forms/Input";
import Select from "@/Components/UI/Forms/Select";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useGetAllCompaniesQuery } from "@/redux/api/companiesApi";
import {
  useGetSingleStockTypeQuery,
  useUpdateStockTypeMutation,
} from "@/redux/api/stockTypesApi";

const EditStockType = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const {
    data: stockTypeData,
    isLoading: fetchLoading,
    error,
  } = useGetSingleStockTypeQuery(id);

  const [updateMobileBank, { isLoading }] = useUpdateStockTypeMutation();
  const { data: companiesData } = useGetAllCompaniesQuery({});
  const router = useRouter();
  const [selectedCompany, setSelectedCompany] = useState(null);
  // Extract company data
  const companyOptions = companiesData?.data?.data?.map((company) => ({
    value: company?.id,
    label: company?.name,
  }));

  useEffect(() => {
    if (stockTypeData) {
      setValue("name", stockTypeData?.data?.name || "");
      // Set company_id to the ID instead of name
      if (stockTypeData?.data?.company_id && !selectedCompany) {
        setSelectedCompany({
          value: stockTypeData?.data?.company_id?.id,
          label: stockTypeData?.data?.company_id?.name,
        });
      }
    }
  }, [stockTypeData, setValue, selectedCompany]);

  const onSubmit = async (data) => {
    data.company_id = selectedCompany.value;
    try {
      const res = await updateMobileBank({ id: id, data }).unwrap();
      if (res?.success === true) {
        router.back();
        toast.success("stock Type  updated successfully!", {
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

  if (fetchLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="md:px-6 px-4 py-7 mt-6 bg-primary-base mx-6 rounded-lg">
      <div>
        <h1 className="font-semibold text-[22px] text-white">
          Update stock Type
        </h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/">
            <span className="text-secondary-base font-medium">Home</span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Update stock Type </span>
        </div>
      </div>

      <div className="bg-primary-base rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="grid sm:grid-cols-1 gap-5">
            <Select
              label="Select Company"
              text="company_id"
              placeholder="Select a company"
              options={companyOptions}
              selectedOption={selectedCompany}
              setSelectedOption={setSelectedCompany}
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Mobile Bank Name"
              text="name"
              label="mobile Bank Name"
              register={register}
              errors={errors}
            />
          </div>

          <div className="pt-3">
            <button disabled={isLoading} className="btn" type="submit">
              {isLoading ? "Loading..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditStockType;
