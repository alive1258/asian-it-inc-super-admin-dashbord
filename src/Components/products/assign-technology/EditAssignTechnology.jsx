"use client";
import { showSuccessAlert } from "@/Components/notification/Notification";
import SelectForm from "@/Components/UI/Forms/SelectForm";
import {
  useGetSingleAssignTechnologyQuery,
  useUpdateAssignTechnologyMutation,
} from "@/redux/api/assignTechnologyApi";
import { useGetAllProductQuery } from "@/redux/api/productsApi";
import { useGetAllTechnologyQuery } from "@/redux/api/technologyApi";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";

const EditAssignTechnology = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm();
  const [updateAssignTechnology, { isLoading }] =
    useUpdateAssignTechnologyMutation();
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
  const { data, refetch } = useGetSingleAssignTechnologyQuery(id);
  const onSubmit = async (data) => {
    try {
      const res = await updateAssignTechnology({ id, data }).unwrap();
      if (res?.success) {
        refetch();
        showSuccessAlert("success", "assign technology update successfully!");
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
      setValue("technology_id", data?.data?.technology_id);
      setValue("product_id", data?.data?.product_id);
    }
  }, [data, setValue]);

  return (
    <>
      <section className="md:px-6 px-4 py-7 mt-6 bg-primary-base mx-6 rounded-lg">
        <h1 className="font-semibold text-[22px] text-white">Update assigned technology</h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/products/assigned-technology">
            <span className="text-secondary-base font-medium"> assigned technology</span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Edit  assigned technology</span>
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
                <option value="">Select a 
                    product</option>
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

export default EditAssignTechnology;
