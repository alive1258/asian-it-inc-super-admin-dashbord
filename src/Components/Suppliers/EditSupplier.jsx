"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import Input from "@/Components/UI/Forms/Input";
import Select from "@/Components/UI/Forms/Select";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useGetAllCompaniesQuery } from "@/redux/api/companiesApi";
import {
  useGetSingleSupplierQuery,
  useUpdateSupplierMutation,
} from "@/redux/api/suppliersApi";

const EditSupplier = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const {
    data: supplierData,
    isLoading: fetchLoading,
    error,
  } = useGetSingleSupplierQuery(id);

  const [updateSupplier, { isLoading }] = useUpdateSupplierMutation();
  const { data: companiesData } = useGetAllCompaniesQuery({});
  const router = useRouter();

  // Extract company data
  const companyOptions = companiesData?.data?.data?.map((company) => ({
    value: company?.id,
    label: company?.name,
  }));

  useEffect(() => {
    if (supplierData) {
      setValue("business_name", supplierData?.data?.business_name || "");
      setValue("business_logo", supplierData?.data?.business_logo || "");
      setValue(
        "business_owner_name",
        supplierData?.data?.business_owner_name || ""
      );
      setValue(
        "business_owner_mobile",
        supplierData?.data?.business_owner_mobile || ""
      );
      setValue(
        "business_owner_photo",
        supplierData?.data?.business_owner_photo || ""
      );
      setValue(
        "contact_person_name",
        supplierData?.data?.contact_person_name || ""
      );
      setValue(
        "contact_person_mobile",
        supplierData?.data?.contact_person_mobile || ""
      );
      setValue("business_address", supplierData?.data?.business_address || "");
      setValue("remarks", supplierData?.data?.remarks || "");
      // Set company_id to the ID instead of name
      setValue("company_id", supplierData?.data?.company_id?.id || "");
    }
  }, [supplierData, setValue]);

  const onSubmit = async (data) => {
    try {
      const res = await updateSupplier({ id: id, data }).unwrap();
      if (res?.success === true) {
        router.back();
        toast.success("Supplier updated successfully!", {
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
          Update Supplier
        </h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/">
            <span className="text-secondary-base font-medium">Home</span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Update Supplier</span>
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
              defaultValue={supplierData?.data?.company_id?.id} // Use ID for correct selection
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

export default EditSupplier;
