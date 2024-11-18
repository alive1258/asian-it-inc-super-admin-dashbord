"use client";
import { showSuccessAlert } from "@/Components/notification/Notification";
import Input from "@/Components/UI/Forms/Input";
import { useGetSingleBlogCategoryQuery, useUpdateBlogCategoryMutation } from "@/redux/api/blogCategoryApi";
import { useGetSingleFaqCategoryQuery, useUpdateFaqCategoryMutation } from "@/redux/api/faqsCategoryApi";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";
const EditBlogCategory = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm();
  const [updateBlogCategory, { isLoading }] = useUpdateBlogCategoryMutation();
  const { data } = useGetSingleBlogCategoryQuery(id);
  const onSubmit = async (data) => {
    try {
      const res = await updateBlogCategory({ id, data }).unwrap();
      if (res?.success) {
        reset();
        showSuccessAlert("success", "blogs category update successfully!");
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
      setValue("name", data?.data.name);
    }
  }, [data, setValue]);

  return (
    <>
      <section className="md:px-6 px-4 py-7 mt-6 bg-primary-base mx-6 rounded-lg">
        <h1 className="font-semibold text-[22px] text-white">
          Update Blogs Category
        </h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/capabilities">
            <span className="text-secondary-base font-medium">Blogs Category</span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Edit Blogs Category</span>
        </div>

        <div className="bg-primary-base rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="items-start">
              {/* name  */}
              <Input
                placeholder="Name here..."
                text="name"
                label="Name "
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



export default EditBlogCategory
