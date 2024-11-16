"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";
import { useCreateOurProductPriceMutation } from "@/redux/api/ourProductPriceApi";
import Textarea from "@/Components/UI/Forms/Textarea";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/Components/notification/Notification";
import UploadImageComponent from "@/Components/UI/Forms/UploadImageComponent";
import Input from "@/Components/UI/Forms/Input";

const AddOurProductPrice = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const router = useRouter();
  const [createOurProductPrice, { isLoading }] =
    useCreateOurProductPriceMutation();
  const [photo, setPhoto] = useState("");

  const onSubmit = async (data) => {
    try {
      if (!photo) {
        showErrorAlert("error", "Please enter a photo");
        return;
      }
      const formData = { ...data, photo };
      const res = await createOurProductPrice(formData).unwrap();
      if (res?.success) {
        reset();
        router.back();
        showSuccessAlert("success", "Create Our Product Price successfully!");
      } else {
        toast.error(res.message, { position: toast.TOP_RIGHT });
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred", {
        position: toast.TOP_RIGHT,
      });
    }
  };
  return (
    <>
      <section className="md:px-6 px-4 py-7 mt-6 bg-primary-base mx-6 rounded-lg">
        <h1 className="font-semibold text-[22px] text-white">
          Add Our Product Price
        </h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/">
            <span className="text-secondary-base font-medium">Home</span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Add Our Product Price</span>
        </div>

        <div className="bg-primary-base rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="items-start">
              {/* Select Company  */}

              {/* name */}
              <Input
                placeholder="Enter name"
                text="name"
                label="Name "
                register={register}
                errors={errors}
              />

              <Input
                placeholder="Enter product price"
                text="price"
                type="number"
                label="Product price "
                register={register}
                errors={errors}
              />

              <Textarea
                placeholder="Description here..."
                text="description"
                label="Description"
                register={register}
                errors={errors}
              />

              <div>
                <UploadImageComponent
                  width={"w-[250px]"}
                  height={"h-[250px]"}
                  label={"Our Product Price Photo"}
                  require={true}
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

export default AddOurProductPrice;
