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
import { useCreateProductMutation } from "@/redux/api/productsApi";

const AddProduct = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const router = useRouter();
  const [photo, setPhoto] = useState("");
  const [photos, setPhotos] = useState([]);
  const [problems, setProblems] = useState("");
  const [challenge, setChallenge] = useState("");
  const [solutions, setSolutions] = useState("");
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { data: productTopCategory } = useGetAllProductTopCategoryQuery({
    limit: 200,
    page: 1,
    search: "",
  });

  const addPhotoField = () => setPhotos((prev) => [...prev, ""]);
  const removePhotoField = (index) =>
    setPhotos((prev) => prev.filter((_, i) => i !== index));

  const updatePhotoField = (index, newPhotoURL) => {
    setPhotos((prev) =>
      prev.map((photo, i) => (i === index ? newPhotoURL : photo))
    );
  };

  const onSubmit = async (data) => {
    try {
      if (!photo) {
        showErrorAlert("error", "Please enter a photo");
        return;
      }
      const payload = {
        ...data,
        photo,
        photos, // Include photos array
        problems,
        challenge,
        solutions,
      };

      const res = await createProduct(payload).unwrap();
      if (res?.success) {
        reset();
        setPhotos([]); // Clear photos array after submission
        router.back();
        showSuccessAlert("success", "Create products successfully!");
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
        <h1 className="font-semibold text-[22px] text-white">Add Product</h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/products/products">
            <span className="text-secondary-base font-medium">Product</span>
          </Link>
          <MdKeyboardArrowRight />
          <span>Add Product</span>
        </div>

        <div className="bg-primary-base rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="items-start space-y-1">
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
                label="Product name"
                register={register}
                errors={errors}
              />

              <Input
                placeholder="Enter title..."
                text="title"
                required={true}
                label="Title"
                register={register}
                errors={errors}
              />

              <Input
                placeholder="Enter Bit title..."
                text="big_title"
                required={true}
                label="Big title"
                register={register}
                errors={errors}
              />
              <Input
                placeholder="Enter web..."
                text="web"
                label="Web version"
                register={register}
                errors={errors}
              />

              <Input
                placeholder="Enter mobile..."
                text="app"
                label="App version"
                register={register}
                errors={errors}
              />

              <UploadImageComponent
                label="Banner photo"
                require={true}
                setPhotoURL={setPhoto}
                photURL={photo}
              />

              <Textarea
                placeholder="Enter product overview"
                text="overview"
                label="Product overview"
                required={true}
                register={register}
                errors={errors}
              />

              <div>
                <p className="text-sm text-white pb-2">Problem (optional)</p>
                <TextEditor content={problems} setContent={setProblems} />
              </div>

              <div>
                <p className="text-sm text-white pb-2">Challenge (optional)</p>
                <TextEditor content={challenge} setContent={setChallenge} />
              </div>

              <div>
                <p className="text-sm text-white pb-2">Solutions (optional)</p>
                <TextEditor content={solutions} setContent={setSolutions} />
              </div>

              {/* Multiple Photo Uploads */}
              <div>
                {/* <p className="text-sm text-white pb-2 ">Photos</p> */}
                {photos.map((photo, index) => (
                  <div key={index} className="space-y-2 mb-2 relative">
                    <UploadImageComponent
                      label={`Photo ${index + 1}`}
                      photURL={photo}
                      width={"w-[90%]"}
                      setPhotoURL={(url) => updatePhotoField(index, url)}
                    />
                    <button
                      type="button"
                      onClick={() => removePhotoField(index)}
                      className=" text-danger-base"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addPhotoField}
                  className="text-sm px-2 rounded py-1 mt-2 bg-blue-base"
                >
                  Add Photo
                </button>
              </div>
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

export default AddProduct;
