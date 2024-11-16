"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";
import Input from "../UI/Forms/Input";
import { showErrorAlert, showSuccessAlert } from "../notification/Notification";
import UpdateImageComponent from "../UI/Forms/UpdateImageComponent";
import {
  useGetSingleTechnologyQuery,
  useUpdateTechnologyMutation,
} from "@/redux/api/technologyApi";

const EditTechnology = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm();
  const [updateTechnology, { isLoading }] = useUpdateTechnologyMutation();
  const { data } = useGetSingleTechnologyQuery(id);
  const [photo, setPhoto] = useState("");

  const onSubmit = async (data) => {
    try {
      if (!photo) {
        showErrorAlert("error", "Please enter a photo");
        return;
      }
      data.photo = photo;
      const res = await updateTechnology({ id, data }).unwrap();
      if (res?.success) {
        reset();
        setPhoto("");
        showSuccessAlert("success", "technology update successfully!");
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
      if (!photo) {
        setPhoto(data?.data?.photo);
      }
    }
  }, [data, setPhoto, photo, setValue]);

  return (
    <>
      <section className="md:px-6 px-4 py-7 mt-6 bg-primary-base mx-6 rounded-lg">
        <h1 className="font-semibold text-[22px] text-white">
          Update technology
        </h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/brands">
            <span className="text-secondary-base font-medium">Technology</span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Edit technology</span>
        </div>

        <div className="bg-primary-base rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="items-start">
              {/* Select Company  */}

              {/* mrp  */}
              <Input
                placeholder="Enter name"
                text="name"
                label="Name "
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

export default EditTechnology;
