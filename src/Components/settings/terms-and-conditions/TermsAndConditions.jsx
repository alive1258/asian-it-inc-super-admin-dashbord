"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";
import Input from "@/Components/UI/Forms/Input";
import { showSuccessAlert } from "@/Components/notification/Notification";
import TextEditor from "@/Components/Shared/text-editer/TextEditor";
import {
  useCreateOrUpdateTermsAndConditionMutation,
  useGetTermsAndConditionsQuery,
} from "@/redux/api/termsAndConditionApi";

const TermsAndConditions = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const [description, setDescription] = useState("");
  const [createOrUpdateTermsAndCondition, { isLoading }] =
    useCreateOrUpdateTermsAndConditionMutation();
  const { data } = useGetTermsAndConditionsQuery();
  const onSubmit = async (formData) => {
    try {
      if (!description) {
        toast.error("Please enter descriptions", { position: toast.TOP_RIGHT });
        return;
      }
      const data = { ...formData, description: description };
      const res = await createOrUpdateTermsAndCondition(data).unwrap();
      if (res?.success) {
        showSuccessAlert(
          "success",
          "term and condition update  or create successfully!"
        );
      } else {
        toast.error(res.message, { position: toast.TOP_RIGHT });
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred", {
        position: toast.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    if (data?.data) {
      setDescription(data?.data?.description);
      setValue("name", data?.data?.name);
    }
  }, [data]);
  return (
    <>
      <section className="md:px-6 px-4 py-7 mt-6 bg-primary-base mx-6 rounded-lg">
        <h1 className="font-semibold text-[22px] text-white">
          Terms And condition
        </h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/terms-and-conditions">
            <span className="text-secondary-base font-medium">
              Terms And condition
            </span>
          </Link>
          <MdKeyboardArrowRight />
          <span> Terms And condition</span>
        </div>

        <div className="bg-primary-base rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="items-start  space-y-1">
              {/* name  */}
              <Input
                placeholder="Enter name"
                text="name"
                label="Name "
                register={register}
                errors={errors}
              />
              <div>
                <p className="text-[16px] text-white">
                  Description{" "}
                  <abbr className={`pl-1  text-lg text-[#FF4234]`}>*</abbr>{" "}
                </p>
              </div>
              <TextEditor content={description} setContent={setDescription} />
            </div>

            {/* bottom  */}
            <div className="pt-4">
              <button disabled={isLoading} className="btn" type="submit">
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default TermsAndConditions;
