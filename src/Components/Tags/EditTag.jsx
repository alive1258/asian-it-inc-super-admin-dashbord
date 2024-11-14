"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import Input from "@/Components/UI/Forms/Input";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import {
  useGetSingleTagQuery,
  useUpdateTagMutation,
} from "@/redux/api/tagsApi";
import Textarea from "../UI/Forms/Textarea";

const EditTag = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm();

  const {
    data: tagData,
    isLoading: fetchLoading,
    error,
  } = useGetSingleTagQuery(id);

  const [updateTag, { isLoading }] = useUpdateTagMutation();
  const [slug, setSlug] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (tagData) {
      setValue("name", tagData?.data?.name || "");
      setValue("description", tagData?.data?.description || "");
      setSlug(tagData?.data?.slug || "");
    }
  }, [tagData, setValue]);

  const watchProductName = watch("name");

  useEffect(() => {
    if (watchProductName) {
      setSlug(watchProductName.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
    }
  }, [watchProductName]);

  const onSubmit = async (data) => {
    data.slug = slug;
    try {
      const res = await updateTag({ id: id, data }).unwrap();
      if (res?.success === true) {
        router.back();
        toast.success("Tag updated successfully!", {
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

  if (fetchLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="md:px-6 px-4 py-7 mt-6 bg-primary-base mx-6 rounded-lg">
      <div>
        <h1 className="font-semibold text-[22px] text-white">Update Tag</h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/">
            <span className="text-secondary-base font-medium">Home</span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Update Tag</span>
        </div>
      </div>

      <div className="bg-primary-base rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="grid sm:grid-cols-1 gap-5">
            <Input
              placeholder="Enter Tag Name"
              text="name"
              label="Tag Name"
              register={register}
              errors={errors}
            />
            <div className="mt-2">
              <span className="text-[16px] py-2">Slug *</span>
              <input
                value={slug}
                onChange={(e) => handleSlugChange(e)}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary-base active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input text-black dark:focus:border-primary mt-1"
                type="text"
                placeholder="Slug"
                required={true}
              />
            </div>
            <Textarea
              placeholder="Enter description "
              text="description"
              label="Description"
              register={register}
              errors={errors}
            />
          </div>

          <div className="pt-3">
            <button disabled={isLoading} className="btn" type="submit">
              {isLoading ? "Loading..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditTag;
