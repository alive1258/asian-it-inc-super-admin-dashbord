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
import { useCreateOurWorkMutation } from "@/redux/api/ourWorkApi";
import Textarea from "../UI/Forms/Textarea";

const CreateOurWork = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const router = useRouter();
  const [createOurWork, { isLoading }] = useCreateOurWorkMutation();
  const [photo, setPhoto] = useState("");

  const onSubmit = async (data) => {
    try {
      if (!photo) {
        showErrorAlert("error", "Please enter a photo");
        return;
      }
      const formData = { ...data, photo };
      const res = await createOurWork(formData).unwrap();
      console.log(res);

      if (res?.success) {
        reset();
        router.back();
        showSuccessAlert("success", "Create our works successfully!");
      } else {
        toast.error(res.message, { position: toast.TOP_RIGHT });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "An error occurred", {
        position: toast.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <section className="md:px-6 px-4 py-7 mt-6 bg-primary-base mx-6 rounded-lg">
        <h1 className="font-semibold text-[22px] text-white">Add Our Works</h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/our-works">
            <span className="text-secondary-base font-medium">Our Works</span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Add Our Works</span>
        </div>

        <div className="bg-primary-base rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="items-start  space-y-1">
              {/* Select Company  */}

              {/* name  */}
              <Input
                placeholder="Enter name"
                text="name"
                label="Name "
                register={register}
                errors={errors}
              />
              <Input
                placeholder="Enter name"
                text="category"
                label="Category "
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
                  width={"w-[650px]"}
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

export default CreateOurWork;
