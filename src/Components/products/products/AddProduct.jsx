"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";
import { showSuccessAlert } from "@/Components/notification/Notification";
import Input from "@/Components/UI/Forms/Input";
import { useCreateFaqsMutation } from "@/redux/api/faqsApi";
import Textarea from "@/Components/UI/Forms/Textarea";
import SelectForm from "@/Components/UI/Forms/SelectForm";
import { useGetAllProductTopCategoryQuery } from "@/redux/api/productTopCategoryApi";
import UploadImageComponent from "@/Components/UI/Forms/UploadImageComponent";
import TextEditor from "@/Components/Shared/text-editer/TextEditor";

const AddProduct = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const router = useRouter();
  const [photo, setPhoto] = useState("");
  const [problems, setProblems] = useState("");
  const [challenge, setChallenge] = useState("");
  const [solutions, setSolutions] = useState("");
  const [createFaqs, { isLoading }] = useCreateFaqsMutation();
  const { data: productTopCategory, error } = useGetAllProductTopCategoryQuery({
    limit: 200,
    page: 1,
    search: "",
  });

  const onSubmit = async (data) => {
    try {
      const res = await createFaqs(data).unwrap();

      if (res?.success) {
        reset();
        router.back();
        showSuccessAlert("success", "Create faqs  successfully!");
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
        <h1 className="font-semibold text-[22px] text-white">Add faq</h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/faqs/faqs">
            <span className="text-secondary-base font-medium">faq</span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Add faqs</span>
        </div>

        <div className="bg-primary-base rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="items-start  space-y-1">
              <SelectForm
                label="Product category"
                text="product_category_id"
                register={register}
                errors={errors}
                required={true}
              >
                <option value="">Select a category</option>
                {productTopCategory?.data?.data?.map((item) => (
                  <option key={item?.id} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </SelectForm>

              <Input
                placeholder="Enter your product name"
                text="name"
                required={true}
                label="Product name "
                register={register}
                errors={errors}
              />

              <Input
                placeholder="Enter title..."
                text="name"
                required={true}
                label="title"
                register={register}
                errors={errors}
              />

              <Input
                placeholder="Enter web..."
                text="web"
                label="web version"
                register={register}
                errors={errors}
              />

              <Input
                placeholder="Enter mobile..."
                text="mobile"
                label="mobile version"
                register={register}
                errors={errors}
              />

              <Input
                placeholder="Enter mobile..."
                text="mobile"
                label="mobile version"
                register={register}
                errors={errors}
              />

              <div>
                <UploadImageComponent
                  label={"Banner  photo"}
                  require={true}
                  setPhotoURL={setPhoto}
                  photURL={photo}
                />
              </div>
              <Textarea
                placeholder="Enter product overview"
                text="overview"
                label=" Product overview "
                required={true}
                register={register}
                errors={errors}
              />
              <div>
                <TextEditor content={problems} setContent={setProblems} />
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

export default AddProduct;
