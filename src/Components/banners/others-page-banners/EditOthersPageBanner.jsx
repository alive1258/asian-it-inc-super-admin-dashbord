"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";
import { showSuccessAlert } from "@/Components/notification/Notification";
import Input from "@/Components/UI/Forms/Input";
import UpdateImageComponent from "@/Components/UI/Forms/UpdateImageComponent";
import {
  useGetSingleHeroBannerQuery,
  useUpdateHeroBannerMutation,
} from "@/redux/api/othersPageBannersApi";

const EditOthersPageBanner = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm();
  const [updateHeroBanner, { isLoading }] = useUpdateHeroBannerMutation();
  const { data } = useGetSingleHeroBannerQuery(id);
  const [photo, setPhoto] = useState("");

  const onSubmit = async (data) => {
    try {
      if (!photo) {
        showErrorAlert("error", "Please enter a photo");
        return;
      }
      data.photo = photo;
      const res = await updateHeroBanner({ id, data }).unwrap();
      if (res?.success) {
        reset();
        setPhoto("");
        showSuccessAlert("success", " other banner update successfully!");
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
      setValue("link", data?.data?.link);
      if (!photo) {
        setPhoto(data?.data?.photo);
      }
    }
  }, [data, setPhoto, photo, setValue]);

  return (
    <>
      <section className="md:px-6 px-4 py-7 mt-6 bg-primary-base mx-6 rounded-lg">
        <h1 className="font-semibold text-[22px] text-white">
          Update other page banner
        </h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/banners/others-page-banner">
            <span className="text-secondary-base font-medium">
              other page banner{" "}
            </span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Edit other page banner </span>
        </div>

        <div className="bg-primary-base rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="items-start">
              {/* Select Company  */}

              <Input
                placeholder="Enter name"
                text="name"
                label="Name "
                require={true}
                register={register}
                errors={errors}
              />

              <Input
                placeholder="Enter link... "
                text="link"
                require={true}
                label="Page  link end point "
                register={register}
                errors={errors}
              />

              <div>
                <UpdateImageComponent
                  label={"Other page banner"}
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

export default EditOthersPageBanner;
