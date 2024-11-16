"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";
import Input from "@/Components/UI/Forms/Input";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/Components/notification/Notification";
import Textarea from "@/Components/UI/Forms/Textarea";
import {
  useGetSingleOurProductPriceQuery,
  useUpdateOurProductPriceMutation,
} from "@/redux/api/ourProductPriceApi";
import UpdateImageComponent from "@/Components/UI/Forms/UpdateImageComponent";

const EditOurProductPrice = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm();
  const [updateOurProductPrice, { isLoading }] =
    useUpdateOurProductPriceMutation();
  const { data } = useGetSingleOurProductPriceQuery(id);
  const [photo, setPhoto] = useState("");

  const onSubmit = async (data) => {
    try {
      if (!photo) {
        showErrorAlert("error", "Please enter a photo");
        return;
      }
      data.photo = photo;
      const res = await updateOurProductPrice({ id, data }).unwrap();
      if (res?.success) {
        reset();
        setPhoto("");
        showSuccessAlert("success", "Our product Price update successfully!");
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
      setValue("description", data?.data.description);
      setValue("price", data?.data.price);
      if (!photo) {
        setPhoto(data?.data?.photo);
      }
    }
  }, [data, setPhoto, photo, setValue]);

  return (
    <>
      <section className="md:px-6 px-4 py-7 mt-6 bg-primary-base mx-6 rounded-lg">
        <h1 className="font-semibold text-[22px] text-white">
          Update our product price
        </h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/capabilities">
            <span className="text-secondary-base font-medium">
              {" "}
              Our product price
            </span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Edit our product price</span>
        </div>

        <div className="bg-primary-base rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="items-start">
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
                <UpdateImageComponent
                  width={"w-[200px]"}
                  height={"h-[200px]"}
                  label={"technology Photo"}
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

export default EditOurProductPrice;
