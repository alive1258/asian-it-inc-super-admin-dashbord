"use client";
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
import { useCreateWhTrustUsMutation } from "@/redux/api/whyTrustUsApi";

const AddWhyTrustUs = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const router = useRouter();
  const [createWhTrustUs, { isLoading }] = useCreateWhTrustUsMutation();
  const [photo, setPhoto] = useState("");

  const onSubmit = async (data) => {
    try {
      if (!photo) {
        showErrorAlert("error", "Please enter a photo");
        // toast.error("Please select a photo", { position: toast.TOP_RIGHT });
        return;
      }
      const formData = { ...data, photo };
      const res = await createWhTrustUs(formData).unwrap();

      if (res?.success) {
        reset();
        router.back();
        showSuccessAlert("success", "Create why trust us successfully!");
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
          Add why trust us
        </h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/">
            <span className="text-secondary-base font-medium">Home</span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Add Why trust us</span>
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

              <Textarea
                placeholder="Description here..."
                text="description"
                label="Description "
                register={register}
                errors={errors}
              />

              <div>
                <UploadImageComponent
                  label={"Service Photo"}
                  require={true}
                  width={"w-[400px]"}
                  height={"h-[400px]"}
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

export default AddWhyTrustUs;
