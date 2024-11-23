"use client";
import { showSuccessAlert } from "@/Components/notification/Notification";
import TextEditor from "@/Components/Shared/text-editer/TextEditor";
import Input from "@/Components/UI/Forms/Input";
import SelectForm from "@/Components/UI/Forms/SelectForm";
import Textarea from "@/Components/UI/Forms/Textarea";
import UpdateImageComponent from "@/Components/UI/Forms/UpdateImageComponent";
import { useGetAllBlogCategoryQuery } from "@/redux/api/blogCategoryApi";
import {
  useGetSingleBlogsQuery,
  useUpdateBlogsMutation,
} from "@/redux/api/blogsApi";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";

const EditBlog = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm();
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [updateFaqs, { isLoading }] = useUpdateBlogsMutation();
  const { data: blogCategory, error } = useGetAllBlogCategoryQuery({
    limit: 200,
    page: 1,
    search: "",
  });
  const { data, refetch } = useGetSingleBlogsQuery(id);
  const onSubmit = async (data) => {
    try {
      const res = await updateFaqs({ id, data }).unwrap();
      console.log(res,"resres")
      if (res?.success) {
        refetch();
        showSuccessAlert("success", "blog update successfully!");
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
      setValue("sort_description", data?.data?.sort_description);
      setValue("blog_category_id", data?.data?.blog_category_id);
      setValue("meta_data", data?.data?.meta_data);
      setValue("meta_key", data?.data?.meta_key);
      if (!description && data?.data?.description) {
        setDescription(data?.data?.description);
      }

      if (!photo && data?.data?.photo) {
        setPhoto(data?.data?.photo);
      }
    }
  }, [data, setValue,description,photo]);

  return (
    <>
      <section className="md:px-6 px-4 py-7 mt-6 bg-primary-base mx-6 rounded-lg">
        <h1 className="font-semibold text-[22px] text-white">Update blog</h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/faqs/faqs">
            <span className="text-secondary-base font-medium">blog</span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Edit blog</span>
        </div>

        <div className="bg-primary-base rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="items-start">
              <SelectForm
                label="Blog category"
                text="blog_category_id"
                register={register}
                errors={errors}
                required={true}
              >
                <option value="">Select a category</option>
                {blogCategory?.data?.data?.map((item) => (
                  <option className="capitalize" key={item?.id} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </SelectForm>

              <Input
                placeholder="Enter name..."
                text="name"
                required={true}
                label="Name "
                register={register}
                errors={errors}
              />
              <Input
                placeholder="Enter meta  data..."
                text="meta_data"
                required={true}
                label="Meta data "
                register={register}
                errors={errors}
              />

              <Input
                placeholder="Enter meta key..."
                text="meta_key"
                required={true}
                label="Meta key "
                register={register}
                errors={errors}
              />
              <Textarea
                placeholder="Enter Sort description ..."
                text="sort_description"
                label="Sort description "
                required={true}
                register={register}
                errors={errors}
              />

              <div>
                <p className="text-sm text-white pb-2">Description</p>
                <TextEditor content={description} setContent={setDescription} />
              </div>
              <div className="mt-2">
                <UpdateImageComponent
                  label={"Blog Photo"}
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

export default EditBlog;
