"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";
import {
  useCreateOrUpdateBannersMutation,
  useGetBannersQuery,
} from "@/redux/api/bannersApi";
import UpdateImageComponent from "@/Components/UI/Forms/UpdateImageComponent";
import Input from "@/Components/UI/Forms/Input";
import { showSuccessAlert } from "@/Components/notification/Notification";
import Textarea from "@/Components/UI/Forms/Textarea";

const HeroBanner = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const [photo, setPhoto] = useState("");

  const [createOrUpdateBanners, { isLoading }] =
    useCreateOrUpdateBannersMutation();
  const { data } = useGetBannersQuery();
  const onSubmit = async (formData) => {
    try {
      if (!photo) {
        toast.error("Please enter descriptions", { position: toast.TOP_RIGHT });
        return;
      }
      const data = { ...formData, bg_photo: photo };
      const res = await createOrUpdateBanners(data).unwrap();
      if (res?.success) {
        showSuccessAlert("success", "Hero update  or create successfully!");
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
      setValue("description", data?.data?.description);
      setValue("title", data?.data?.title);
      if (!photo && data?.data?.bg_photo) {
        setPhoto(data?.data?.bg_photo);
      }
    }
  }, [data, setValue, photo]);
  return (
    <>
      <section className="md:px-6 px-4 py-7 mt-6 bg-primary-base mx-6 rounded-lg">
        <h1 className="font-semibold text-[22px] text-white">Hero banner</h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/terms-and-conditions">
            <span className="text-secondary-base font-medium">Hero banner</span>
          </Link>
          <MdKeyboardArrowRight />
          <span> Hero banner</span>
        </div>

        <div className="bg-primary-base rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="items-start  space-y-1">
              {/* name  */}
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
                placeholder="Enter description"
                text="description"
                label="Description "
                require={true}
                register={register}
                errors={errors}
              />
              <div>
                <UpdateImageComponent
                  label={"Hero banner Photo"}
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

export default HeroBanner;
