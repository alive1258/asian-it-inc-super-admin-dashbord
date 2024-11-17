"use client";
import { showSuccessAlert } from "@/Components/notification/Notification";
import Input from "@/Components/UI/Forms/Input";
import SelectForm from "@/Components/UI/Forms/SelectForm";
import Textarea from "@/Components/UI/Forms/Textarea";
import {
  useGetSingleFaqsQuery,
  useUpdateFaqsMutation,
} from "@/redux/api/faqsApi";
import { useGetAllFaqCategoryQuery } from "@/redux/api/faqsCategoryApi";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";

const EditFaqs = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm();
  const [updateFaqs, { isLoading }] = useUpdateFaqsMutation();
  const { data: faqsCategory, error } = useGetAllFaqCategoryQuery({
    limit: 200,
    page: 1,
    search: "",
  });
  const { data , refetch} = useGetSingleFaqsQuery(id);
  const onSubmit = async (data) => {
    try {
      const res = await updateFaqs({ id, data }).unwrap();
      if (res?.success) {
        reset();
        refetch()
        showSuccessAlert("success", "faqs update successfully!");
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
      setValue("name", data?.data?.name);
      setValue("description", data?.data?.name);
      setValue("faq_category_id", data?.data?.faq_category_id);
    }
  }, [data, setValue]);

  return (
    <>
      <section className="md:px-6 px-4 py-7 mt-6 bg-primary-base mx-6 rounded-lg">
        <h1 className="font-semibold text-[22px] text-white">Update Faq</h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/faqs/faqs">
            <span className="text-secondary-base font-medium">Faq</span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Edit Faq</span>
        </div>

        <div className="bg-primary-base rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="items-start">
              <SelectForm
                label="Category"
                text="faq_category_id"
                register={register}
                errors={errors}
                required={true}
              >
                <option value="">Select a category</option>
                {faqsCategory?.data?.data?.map((item) => (
                  <option key={item?.id} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </SelectForm>

              <Input
                placeholder="Enter question here..."
                text="name"
                required={true}
                label="Question "
                register={register}
                errors={errors}
              />
              <Textarea
                placeholder="Enter answer here..."
                text="description"
                label="Answer "
                required={true}
                register={register}
                errors={errors}
              />
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

export default EditFaqs;
