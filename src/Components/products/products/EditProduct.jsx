"use client";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/redux/api/productsApi";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import UploadImageComponent from "@/Components/UI/Forms/UploadImageComponent";
import TextEditor from "@/Components/Shared/text-editer/TextEditor";
import SelectForm from "@/Components/UI/Forms/SelectForm";
import { toast } from "react-toastify";
import Input from "@/Components/UI/Forms/Input";
import UpdateImageComponent from "@/Components/UI/Forms/UpdateImageComponent";
import Textarea from "@/Components/UI/Forms/Textarea";
import { useGetAllProductTopCategoryQuery } from "@/redux/api/productTopCategoryApi";

const EditProduct = ({ id }) => {
  const { data, refetch } = useGetSingleProductQuery(id);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const { data: productTopCategory } = useGetAllProductTopCategoryQuery({
    limit: 200,
    page: 1,
    search: "",
  });
  const [photo, setPhoto] = useState("");
  const [photos, setPhotos] = useState([]);
  const [currentPhotos, setCurrentPhotos] = useState([]);
  const [problems, setProblems] = useState("");
  const [challenge, setChallenge] = useState("");
  const [solutions, setSolutions] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const newPhotosData = [...photos, ...currentPhotos].join(",");

      const data = {
        ...formData,
        photo, // Single photo
        photos: newPhotosData, // Array of photos
        problems, // Rich text field
        challenge, // Rich text field
        solutions, // Rich text field
      };

      const res = await updateProduct({ id, data }).unwrap();
      if (res?.success) {
        refetch();
        setCurrentPhotos([]);
        toast.success("Product updated successfully!");
      } else {
        toast.error(res.message || "Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("An error occurred while updating the product.");
    }
  };

  const addPhotoField = () => setCurrentPhotos((prev) => [...prev, ""]);

  const removePhotoField = (index) =>
    setCurrentPhotos((prev) => prev.filter((_, i) => i !== index));
  const removeStorePhotoField = (index) =>
    setPhotos((prev) => prev.filter((_, i) => i !== index));

  const updatePhotoField = (index, newPhotoURL) => {
    setCurrentPhotos((prev) =>
      prev.map((photo, i) => (i === index ? newPhotoURL : photo))
    );
  };

  useEffect(() => {
    if (data?.data) {
      setValue("name", data?.data?.name);
      setValue("big_title", data?.data?.big_title);
      setValue("overview", data?.data?.overview);
      setValue("title", data?.data?.title);
      setValue("category", data?.data?.category);
      setValue("web", data?.data?.web);
      setValue("app", data?.data?.app);
      setValue("product_category_id", data?.data?.product_category_id);
      setProblems(data?.data.problems || "");
      setChallenge(data?.data.challenge || "");
      setSolutions(data?.data.solutions || "");
      setPhoto(data?.data?.photo);
      if (data?.data?.photos) {
        try {
          // Remove `{}` and split by commas
          const rawPhotos = data.data.photos.replace(/[{}]/g, "");
          const photosArray = rawPhotos
            .split(",")
            .map((photo) => photo.replace(/"/g, "").trim()); // Remove extra quotes and whitespace
          // setPhotosCount(photosArray?.length); // Update photos count for displaying in the UI
          setPhotos(photosArray);
        } catch (error) {
          console.error("Error processing photos data:", error);
        }
      }
    }
  }, [data, setValue]);
  return (
    <div className="px-6 py-4 bg-primary-base rounded-md">
      <h2 className="text-lg font-semibold text-white mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Product Category */}
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
          placeholder="Enter category..."
          text="category"
          required={true}
          label="Category"
          register={register}
          errors={errors}
        />

        <Input
          placeholder="Enter category..."
          text="category"
          required={true}
          label="Category"
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

        {/* Single Photo Upload */}
        <div className="mb-4 w-full overflow-hidden">
          <UpdateImageComponent
            label={"Banner Photo"}
            width={"w-full"}
            require={true}
            setPhotoURL={setPhoto}
            photURL={photo}
          />
        </div>

        {/* Product Overview */}
        <Textarea
          placeholder="Enter product overview"
          text="overview"
          label="Product overview"
          required={true}
          register={register}
          errors={errors}
        />

        {/* Problems */}
        <div className="mb-4">
          <label className="block text-white mb-2">Problems (optional)</label>
          <TextEditor content={problems} setContent={setProblems} />
        </div>

        {/* Challenges */}
        <div className="mb-4">
          <label className="block text-white mb-2">Challenges (optional)</label>
          <TextEditor content={challenge} setContent={setChallenge} />
        </div>

        {/* Solutions */}
        <div className="mb-4">
          <label className="block text-white mb-2">Solutions (optional)</label>
          <TextEditor content={solutions} setContent={setSolutions} />
        </div>

        {/* Multiple Photo Uploads */}
        <div className="mb-4">
          {photos.map((item, index) => (
            <div key={index} className="space-y-2 mt-2">
              <UpdateImageComponent
                label={"Product  Photo"}
                require={true}
                setPhotoURL={setPhoto}
                photURL={item}
              />
              <button
                type="button"
                onClick={() => removeStorePhotoField(index)}
                className=" text-danger-base"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Multiple Photo Uploads */}
        <div>
          {/* <p className="text-sm text-white pb-2 ">Photos</p> */}
          {currentPhotos?.map((item, index) => (
            <div key={index} className="space-y-2 mb-2 relative">
              <UploadImageComponent
                label={`Photo ${index + 1}`}
                photURL={item}
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

        {/* Submit Button */}
        <div className="mt-3">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-base text-white rounded-md"
          >
            {isLoading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
