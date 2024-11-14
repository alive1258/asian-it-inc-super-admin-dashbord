"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import Input from "@/Components/UI/Forms/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCreateTagsMutation } from "@/redux/api/tagsApi";
import Textarea from "../UI/Forms/Textarea";
import { toast } from "react-toastify";

const AddTag = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();

  const [createTag, { isLoading }] = useCreateTagsMutation();
  const [slug, setSlug] = useState("");
  const router = useRouter();

  const watchProductName = watch("name");

  useEffect(() => {
    if (watchProductName) {
      setSlug(watchProductName.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
    }
  }, [watchProductName]);

  // Form submission handler
  const onSubmit = async (data) => {
    data.slug = slug; // Correctly assign slug here
    try {
      const res = await createTag({
        ...data,
      }).unwrap();
      if (res?.success) {
        reset();
        router.back();
        toast.success("Tag added successfully!", {
          position: toast.TOP_RIGHT,
        });
      } else {
        toast.error(res.message, { position: toast.TOP_RIGHT });
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred", {
        position: toast.TOP_RIGHT,
      });
    }
  };

  const handleSlugChange = (e) => {
    const value = e.target.value;
    setSlug(value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
  };

  return (
    <>
      <section className="md:px-6 px-4 py-7 mt-6 bg-primary-base mx-6 rounded-lg">
        {/* Header Section */}
        <div className="">
          <h1 className="font-semibold text-[22px] text-white">Add Tag</h1>
          <div className="flex items-center text-[16px] py-1">
            <Link href="/">
              <span className="text-secondary-base font-medium">Home</span>
            </Link>
            <MdKeyboardArrowRight />
            <span>Add Tag</span>
          </div>
        </div>

        {/* Form section */}
        <div className="bg-primary-base rounded-lg mt-4 p-5">
          <h3 className="text-white font-semibold">Add New Tag</h3>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="grid sm:grid-cols-1 items-start gap-2">
              <Input
                placeholder="Enter Name"
                text="name"
                label="Name"
                register={register}
                errors={errors}
              />
              {/* Slug */}
              <div className="mt-2">
                <span className="text-[16px] py-2">Slug *</span>
                <input
                  value={slug}
                  onChange={handleSlugChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary-base active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input text-black dark:focus:border-primary mt-1"
                  type="text"
                  placeholder="Slug"
                  required
                />
              </div>
              <Textarea
                placeholder="Enter description"
                text="description"
                label="Description"
                register={register}
                errors={errors}
              />
            </div>
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

export default AddTag;
