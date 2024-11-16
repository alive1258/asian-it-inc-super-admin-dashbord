"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";
import { useCreateFaqCategoryMutation } from "@/redux/api/faqsCategoryApi";
import { showSuccessAlert } from "@/Components/notification/Notification";
import Input from "@/Components/UI/Forms/Input";

const AddFaqsCategory = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const router = useRouter();
  const [createFaqCategory, { isLoading }] = useCreateFaqCategoryMutation();
  const onSubmit = async (data) => {
    try {
      const res = await createFaqCategory(data).unwrap();

      if (res?.success) {
        reset();
        router.back();
        showSuccessAlert("success", "Create faq category successfully!");
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
        <h1 className="font-semibold text-[22px] text-white">Add faq category</h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/industries">
            <span className="text-secondary-base font-medium">faq category</span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Add faq category</span>
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



export default AddFaqsCategory
