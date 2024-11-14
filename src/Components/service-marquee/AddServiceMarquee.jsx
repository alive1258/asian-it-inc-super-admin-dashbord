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
import { useCreateServiceMarqueeMutation } from "@/redux/api/serviceMarqueeApi";

const AddServiceMarquee = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const router = useRouter();
  const [createServiceMarquee, { isLoading }] = useCreateServiceMarqueeMutation()
  const [photo, setPhoto] = useState("");

  const onSubmit = async (data) => {
    try {
      if (!photo) {
        showErrorAlert("error", "Please enter a photo");
        // toast.error("Please select a photo", { position: toast.TOP_RIGHT });
        return;
      }
      const formData = { ...data, photo };
      const res = await createServiceMarquee(formData).unwrap();

      if (res?.success) {
        reset();
        router.back();
        showSuccessAlert("success", "Create Service successfully!");
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
        <h1 className="font-semibold text-[22px] text-white">Add Service marquee</h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/">
            <span className="text-secondary-base font-medium">Home</span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Add Service marquee</span>
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
                <UploadImageComponent
                  label={"Service Photo"}
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

export default AddServiceMarquee;
