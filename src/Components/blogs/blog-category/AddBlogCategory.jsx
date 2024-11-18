"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";
import { showSuccessAlert } from "@/Components/notification/Notification";
import Input from "@/Components/UI/Forms/Input";
import { useCreateBlogCategoryMutation } from "@/redux/api/blogCategoryApi";

const AddBlogCategory = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const router = useRouter();
  const [createBlogCategory, { isLoading }] = useCreateBlogCategoryMutation();
  const onSubmit = async (data) => {
    try {
      const res = await createBlogCategory(data).unwrap();

      if (res?.success) {
        reset();
        router.back();
        showSuccessAlert("success", "Create blogs category successfully!");
      } else {
        toast.error(res.message, { position: toast.TOP_RIGHT });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "An error occurred", {
        position: toast.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <section className="md:px-6 px-4 py-7 mt-6 bg-primary-base mx-6 rounded-lg">
        <h1 className="font-semibold text-[22px] text-white">Add blogs category</h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/industries">
            <span className="text-secondary-base font-medium">blogs category</span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Add blogs category</span>
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




export default AddBlogCategory
