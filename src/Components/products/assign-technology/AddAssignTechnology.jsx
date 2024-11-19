"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";
import { showSuccessAlert } from "@/Components/notification/Notification";
import SelectForm from "@/Components/UI/Forms/SelectForm";
import { useGetAllTechnologyQuery } from "@/redux/api/technologyApi";
import { useGetAllProductQuery } from "@/redux/api/productsApi";
import { useCreateAssignTechnologyMutation } from "@/redux/api/assignTechnologyApi";

const AddAssignTechnology = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const router = useRouter();
  const [createAssignTechnology, { isLoading }] =
    useCreateAssignTechnologyMutation();
  const { data: technologies, error } = useGetAllTechnologyQuery({
    limit: 200,
    page: 1,
    search: "",
  });
  const { data: products } = useGetAllProductQuery({
    limit: 200,
    page: 1,
    search: "",
  });
  const onSubmit = async (data) => {
    try {
      const res = await createAssignTechnology(data).unwrap();
      if (res?.success) {
        reset();
        router.back();
        showSuccessAlert(
          "success",
          "Create assigned technology  successfully!"
        );
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
        <h1 className="font-semibold text-[22px] text-white">
          Add assigned technology
        </h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/products/assigned-technology">
            <span className="text-secondary-base font-medium">
              assigned technology
            </span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Add assigned technology</span>
        </div>

        <div className="bg-primary-base rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="items-start  space-y-1">
              <SelectForm
                label="Technology name"
                text="technology_id"
                register={register}
                errors={errors}
                required={true}
              >
                <option value="">Select a technology</option>
                {technologies?.data?.data?.map((item) => (
                  <option key={item?.id} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </SelectForm>

              <SelectForm
                label="Product name"
                text="product_id"
                register={register}
                errors={errors}
                required={true}
              >
                <option value="">Select a product</option>
                {products?.data?.data?.map((item) => (
                  <option key={item?.id} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </SelectForm>
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

export default AddAssignTechnology;
