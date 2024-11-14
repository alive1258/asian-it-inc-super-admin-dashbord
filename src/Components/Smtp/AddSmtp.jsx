"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import Input from "@/Components/UI/Forms/Input";
import Select from "@/Components/UI/Forms/Select";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useCreateSmtpMutation } from "@/redux/api/smtpApi";
import { useGetAllCompaniesQuery } from "@/redux/api/companiesApi";

const AddSmtp = () => {
  // Initialize form handling and state for data
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const query = {};
  const [createSmtp, { isLoading }] = useCreateSmtpMutation();
  const { data } = useGetAllCompaniesQuery(query);
  const router = useRouter();
  const [selectedCompany, setSelectedCompany] = useState(null);
  // Extract company data
  const companyData = data?.data?.data;

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      // Ensure company_id is taken from the selected company
      const res = await createSmtp({
        ...data,
      }).unwrap();

      if (res?.success) {
        reset();
        router.back();
        toast.success("SMTP added successfully!", {
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
      <div>
        <h1 className="font-semibold text-[22px] text-white">
          Add SMTP Configuration
        </h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/">
            <span className="text-secondary-base font-medium">Home</span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Add SMTP Configuration</span>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-primary-base rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="grid sm:grid-cols-2 items-start gap-5">
            {/* Dropdown for Company Selection */}
            <Select
              label="Select Company"
              text="company_id" // Make sure this matches the key you want in the form data
              placeholder="Select a company"
              options={companyData?.map((company) => ({
                value: company?.id,
                label: company?.name,
              }))}
              selectedOption={selectedCompany}
              setSelectedOption={setSelectedCompany}
              register={register} // Pass the register function
              errors={errors}
            />
            {/* Mail Username Input */}
            <Input
              placeholder="Enter Mail Username"
              text="mail_username"
              label="Mail Username"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Mail driver"
              text="mail_driver"
              label="Mail Driver"
              register={register}
              errors={errors}
            />
            {/* Mail Password Input */}
            <Input
              type="password"
              placeholder="Enter Mail Password"
              text="mail_password"
              label="Mail Password"
              register={register}
              errors={errors}
            />
            {/* Mail Host Input */}
            <Input
              placeholder="Enter Mail Host"
              text="mail_host"
              label="Mail Host"
              register={register}
              errors={errors}
            />
            {/* Mail Port Input */}
            <Input
              type="number"
              placeholder="Enter Mail Port"
              text="mail_port"
              label="Mail Port"
              register={register}
              errors={errors}
            />
            {/* From Name Input */}
            <Input
              placeholder="Enter From Name"
              text="from_name"
              label="From Name"
              register={register}
              errors={errors}
            />
            {/* Mail Encryption Radio Buttons */}
            <div>
              <label className="text-white">Mail Encryption:</label>
              <div className="flex space-x-4 mt-2">
                <label>
                  <input
                    type="radio"
                    value="true"
                    {...register("mail_encryption")}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    value="false"
                    {...register("mail_encryption")}
                  />
                  No
                </label>
              </div>
              {errors.mail_encryption && (
                <p role="alert" className="text-danger-base text-xs">
                  {errors.mail_encryption.message ||
                    "Mail encryption is required."}
                </p>
              )}
            </div>

            {/* Status Radio Buttons */}
            <div>
              <label className="text-white">Status:</label>
              <div className="flex space-x-4 mt-2">
                <label>
                  <input
                    type="radio"
                    value="true"
                    {...register("status")}
                    defaultChecked
                  />
                  Active
                </label>
                <label>
                  <input type="radio" value="false" {...register("status")} />
                  Inactive
                </label>
              </div>
              {errors.status && (
                <p role="alert" className="text-danger-base text-xs">
                  {errors.status.message || "Status is required."}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button disabled={isLoading} className="btn" type="submit">
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddSmtp;
