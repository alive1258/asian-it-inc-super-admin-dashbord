"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";
import { showSuccessAlert } from "@/Components/notification/Notification";
import Input from "@/Components/UI/Forms/Input";
import Textarea from "@/Components/UI/Forms/Textarea";
import SelectForm from "@/Components/UI/Forms/SelectForm";
import { useCreateBlogsMutation } from "@/redux/api/blogsApi";
import { useGetAllBlogCategoryQuery } from "@/redux/api/blogCategoryApi";
import UploadImageComponent from "@/Components/UI/Forms/UploadImageComponent";
import TextEditor from "@/Components/Shared/text-editer/TextEditor";

const AddBlog = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const [createBlogs, { isLoading }] = useCreateBlogsMutation();
  const [searchValue, setSearchValue] = useState({
    limit: 200,
    page: 1,
    search: "",
  });
  const { data: blogsCategory, error } =
    useGetAllBlogCategoryQuery(searchValue);
  const onSubmit = async (fromData) => {
    try {
      if (!photo) {
        if (!photo) {
          showErrorAlert("error", "Please enter a photo");
          return;
        }
      }
      const newData = {
        ...fromData,
        description,
        photo,
      };
      const res = await createBlogs(newData).unwrap();

      if (res?.success) {
        reset();
        router.back();
        showSuccessAlert("success", "Create blogs  successfully!");
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
        <h1 className="font-semibold text-[22px] text-white">Add Blog</h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/blogs/blogs">
            <span className="text-secondary-base font-medium">Blog</span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Add Blog</span>
        </div>

        <div className="bg-primary-base rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="items-start  space-y-1">
              <SelectForm
                label="Category"
                text="blog_category_id"
                register={register}
                errors={errors}
                required={true}
              >
                <option value="">Select a category</option>
                {blogsCategory?.data?.data?.map((item) => (
                  <option
                    className="capitalize"
                    key={item?.id}
                    value={item?.id}
                  >
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
                <UploadImageComponent
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

export default AddBlog;
