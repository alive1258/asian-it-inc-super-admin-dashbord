"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";
import Input from "../UI/Forms/Input";
import UploadImageComponent from "../UI/Forms/UploadImageComponent";
import { showErrorAlert, showSuccessAlert } from "../notification/Notification";
import { useCreateCapabilitiesMutation } from "@/redux/api/capabilitiesApi";
import Textarea from "../UI/Forms/Textarea";
const AddCapability = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const router = useRouter();
  const [createCapabilities, { isLoading }] = useCreateCapabilitiesMutation();
  const [photo, setPhoto] = useState("");

  const onSubmit = async (data) => {
    try {
      if (!photo) {
        showErrorAlert("error", "Please enter a photo");
        return;
      }
      const formData = { ...data, photo };
      const res = await createCapabilities(formData).unwrap();
      if (res?.success) {
        reset();
        router.back();
        showSuccessAlert("success", "Create Capability successfully!");
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
        <h1 className="font-semibold text-[22px] text-white">Add Capability</h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/">
            <span className="text-secondary-base font-medium">Home</span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Add capability</span>
        </div>

        <div className="bg-primary-base rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="items-start">
              {/* name  */}
              <Textarea
                placeholder="Description here..."
                text="name"
                label="Description"
                register={register}
                errors={errors}
              />

              <div>
                <UploadImageComponent
                  width={"w-[200px]"}
                  height={"h-[200px]"}
                  label={"Capability Photo"}
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

export default AddCapability;
