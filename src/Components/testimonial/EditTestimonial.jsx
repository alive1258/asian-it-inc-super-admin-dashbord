"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";
import Input from "../UI/Forms/Input";
import Textarea from "../UI/Forms/Textarea";
import { showErrorAlert, showSuccessAlert } from "../notification/Notification";
import UpdateImageComponent from "../UI/Forms/UpdateImageComponent";
import {
  useGetSingleTestimonialQuery,
  useUpdateTestimonialMutation,
} from "@/redux/api/testimonialApi";
import SelectForm from "../UI/Forms/SelectForm";
import { useGetAllProductQuery } from "@/redux/api/productsApi";

const EditTestimonial = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue, 
    reset,
  } = useForm();
  const router = useRouter();
  const [updateTestimonial, { isLoading }] = useUpdateTestimonialMutation();
  const { data } = useGetSingleTestimonialQuery(id);
  const [photo, setPhoto] = useState("");
  const { data: products } = useGetAllProductQuery({
    limit: 400,
    page: 1,
    search: "",
  });
 
  const onSubmit = async (data) => {
    try {
      if (!photo) {
        showErrorAlert("error", "Please enter a photo");
        // toast.error("Please select a photo", { position: toast.TOP_RIGHT });
        return;
      }
      data.photo = photo;
      const res = await updateTestimonial({ id, data }).unwrap();

      if (res?.success) {
        reset();
        router.back();
        setPhoto("");
        showSuccessAlert("success", "Update testimonial successfully!");
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
      setValue("title", data?.data?.title);
      setValue("comment", data?.data?.comment);
      setValue("product_id", data?.data?.product_id);
      if (!photo) {
        setPhoto(data?.data?.photo);
      }
    }
  }, [data, setPhoto, photo, setValue]);

  return (
    <>
      <section className="md:px-6 px-4 py-7 mt-6 bg-primary-base mx-6 rounded-lg">
        <h1 className="font-semibold text-[22px] text-white">
          Update testimonial
        </h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/testimonial">
            <span className="text-secondary-base font-medium">Home</span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Add testimonial</span>
        </div>

        <div className="bg-primary-base rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="items-start">
        
            <div className="py-1">
                <SelectForm
                  label="Product"
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
              <Input
                placeholder="Enter name"
                text="name"
                label="Name "
                require={true}
                register={register}
                errors={errors}
              />

              <Input
                placeholder="Enter title"
                text="title"
                label="Title "
                require={true}
                register={register}
                errors={errors}
              />

              <Textarea
                placeholder="Comment here..."
                text="comment"
                label="Comment  "
                register={register}
                errors={errors}
              />

              <div>
                <UpdateImageComponent
                  label={"Client photo"}
                  require={true}
                  width={"w-[250px]"}
                  height={"h-[250px]"}
                  setPhotoURL={setPhoto}
                  photURL={photo}
                />
              </div>
              {/* selling_discount  */}
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

export default EditTestimonial;
