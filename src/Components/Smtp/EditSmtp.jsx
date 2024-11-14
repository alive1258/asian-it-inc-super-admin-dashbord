"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import Input from "@/Components/UI/Forms/Input";
import Select from "@/Components/UI/Forms/Select";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import {
  useGetSingleSmtpQuery,
  useUpdateSmtpMutation,
} from "@/redux/api/smtpApi";
import { useGetAllCompaniesQuery } from "@/redux/api/companiesApi";

const EditSmtp = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const {
    data: smtpData,
    isLoading: fetchLoading,
    error,
  } = useGetSingleSmtpQuery(id);

  const [updateSmtp, { isLoading }] = useUpdateSmtpMutation();
  const { data: companiesData } = useGetAllCompaniesQuery({});
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  const [status, setStatus] = useState("true");
  const [mailEncryptionStatus, setMailEncryptionStatus] = useState("true");
  // Map company data for Select options
  const companyOptions = companiesData?.data?.data?.map((company) => ({
    value: company?.id,
    label: company?.name,
  }));

  // Populate form with existing SMTP data
  useEffect(() => {
    if (smtpData) {
      setValue("mail_username", smtpData?.data?.mail_username || "");
      setValue("mail_driver", smtpData?.data?.mail_driver || "");
      setValue("mail_password", smtpData?.data?.mail_password || "");
      setValue("mail_host", smtpData?.data?.mail_host || "");
      setValue("mail_port", smtpData?.data?.mail_port || "");
      setValue("from_name", smtpData?.data?.from_name || "");

      if (smtpData?.data?.company_id && !selectedOption) {
        setSelectedOption(smtpData?.data?.company_id);
      }
      setStatus(smtpData?.data?.status ? "true" : "false");
      setMailEncryptionStatus(
        smtpData?.data?.mail_encryption ? "true" : "false"
      );
    }
  }, [smtpData, setValue, selectedOption]);

  // Submit handler
  const onSubmit = async (data) => {
    data.company_id = selectedOption.value;
    data.status = data.status === "true";
    data.mail_encryption = data.mail_encryption === "true";
    try {
      const res = await updateSmtp({ id: id, data }).unwrap();
      if (res?.success) {
        router.back();
        toast.success("SMTP updated successfully!", {
          position: toast.TOP_RIGHT,
        });
      } else {
        toast.error(res.message, { position: toast.TOP_RIGHT });
      }
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred", {
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
      {/* Header Section */}
      <div>
        <h1 className="font-semibold text-[22px] text-white">
          Update SMTP Configuration
        </h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/">
            <span className="text-secondary-base font-medium">Home</span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Update SMTP Configuration</span>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-primary-base rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Company Selection */}
            <Select
              label="Select Company"
              text="company_id"
              placeholder="Select a company"
              options={companyOptions}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              register={register}
              errors={errors}
            />
            {/* SMTP Details */}
            <Input
              placeholder="Enter Mail Username"
              text="mail_username"
              label="Mail Username"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Mail Driver"
              text="mail_driver"
              label="Mail Driver"
              register={register}
              errors={errors}
            />
            <Input
              type="password"
              placeholder="Enter Mail Password"
              text="mail_password"
              label="Mail Password"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Mail Host"
              text="mail_host"
              label="Mail Host"
              register={register}
              errors={errors}
            />
            <Input
              type="number"
              placeholder="Enter Mail Port"
              text="mail_port"
              label="Mail Port"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter From Name"
              text="from_name"
              label="From Name"
              register={register}
              errors={errors}
            />

            {/* Mail Encryption Radio */}

            <div className="flex items-center gap-4">
              <label className="text-white font-medium">mail_encryption</label>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="active"
                  value="true"
                  {...register("mail_encryption")}
                  onChange={() => setMailEncryptionStatus("true")}
                  checked={mailEncryptionStatus === "true"}
                  className="mr-1"
                />
                <label htmlFor="active" className="text-white">
                  Active
                </label>

                <input
                  type="radio"
                  id="inactive"
                  value="false"
                  {...register("mail_encryption")}
                  onChange={() => setMailEncryptionStatus("false")}
                  checked={mailEncryptionStatus === "false"}
                  className="ml-4 mr-1"
                />
                <label htmlFor="inactive" className="text-white">
                  Inactive
                </label>
              </div>
              {errors.mail_encryption && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mail_encryption.message}
                </p>
              )}
            </div>
            {/* Display dynamic status message */}

            <div className="flex items-center gap-4">
              <label className="text-white font-medium"> Status</label>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="active"
                  value="true"
                  {...register("status")}
                  onChange={() => setStatus("true")}
                  checked={status === "true"}
                  className="mr-1"
                />
                <label htmlFor="active" className="text-white">
                  Active
                </label>

                <input
                  type="radio"
                  id="inactive"
                  value="false"
                  {...register("status")}
                  onChange={() => setStatus("false")}
                  checked={status === "false"}
                  className="ml-4 mr-1"
                />
                <label htmlFor="inactive" className="text-white">
                  Inactive
                </label>
              </div>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button disabled={isLoading} className="btn" type="submit">
              {isLoading ? "Loading..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditSmtp;
