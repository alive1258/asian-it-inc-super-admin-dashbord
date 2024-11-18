"use client";
import { useCreateServiceMutation } from "@/redux/api/servicesApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";
import Input from "../UI/Forms/Input";
import Textarea from "../UI/Forms/Textarea";
import UploadImageComponent from "../UI/Forms/UploadImageComponent";
import { showErrorAlert, showSuccessAlert } from "../notification/Notification";
import { useCreateTestimonialMutation } from "@/redux/api/testimonialApi";
import { useGetAllProductQuery } from "@/redux/api/productsApi";
import SelectForm from "../UI/Forms/SelectForm";

const AddTestimonial = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const router = useRouter();
  const [createTestimonial, { isLoading }] = useCreateTestimonialMutation();
  const { data: products } = useGetAllProductQuery({
    limit: 400,
    page: 1,
    search: "",
  });
  const [photo, setPhoto] = useState("");

  const onSubmit = async (data) => {
    try {
      if (!photo) {
        showErrorAlert("error", "Please enter a photo");
        return;
      }
      const formData = { ...data, photo };
      const res = await createTestimonial(formData).unwrap();

      if (res?.success) {
        reset();
        router.back();
        showSuccessAlert("success", "Create testimonial successfully!");
      } else {
        toast.error(res.message, { position: toast.TOP_RIGHT });
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.message || "An error occurred", {
        position: toast.TOP_RIGHT,
      });
    }
  };
  return (
    <>
      <section className="md:px-6 px-4 py-7 mt-6 bg-primary-base mx-6 rounded-lg">
        <h1 className="font-semibold text-[22px] text-white">
          Add testimonial
        </h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/">
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
              {/* mrp  */}
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
                <UploadImageComponent
                  width={"w-[250px]"}
                  height={"h-[250px]"}
                  label={"Client photo"}
                  require={true}
                  setPhotoURL={setPhoto}
                  photURL={photo}
                />
              </div>
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

export default AddTestimonial;
