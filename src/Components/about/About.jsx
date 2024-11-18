"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";

import UpdateImageComponent from "@/Components/UI/Forms/UpdateImageComponent";
import Input from "../UI/Forms/Input";
import Textarea from "../UI/Forms/Textarea";
import {
  useCreateOrUpdateAboutMutation,
  useGetAboutQuery,
} from "@/redux/api/aboutApi";
import { showSuccessAlert } from "../notification/Notification";
import UploadImageComponent from "../UI/Forms/UploadImageComponent";

const About = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const [photo, setPhoto] = useState("");
  const [photos, setPhotos] = useState([]);
  const [worldWidePhoto, setWorldWidePhoto] = useState("");
  const [currentPhotos, setCurrentPhotos] = useState([]);
  const [supportPhoto, setSupportPhoto] = useState("");
  const [easyToReachPhoto, setEasyToReachPhoto] = useState("");
  const [firstOnFieldPhoto, setFirstOnFieldPhoto] = useState("");

  const [createOrUpdateAbout, { isLoading }] = useCreateOrUpdateAboutMutation();
  const { data } = useGetAboutQuery();
  const onSubmit = async (formData) => {
    try {
      if (!photo) {
        toast.error("Please enter service photo", {
          position: toast.TOP_RIGHT,
        });
        return;
      }
      const newPhotosData = [...photos, ...currentPhotos].join(",");
      const data = {
        ...formData,
        service_photo: photo,
        photos: newPhotosData,
        worldwide_services_photo: worldWidePhoto,
        support_photo: supportPhoto,
        easy_to_reach_photo: easyToReachPhoto,
        first_on_field_photo: firstOnFieldPhoto,
      };
      const res = await createOrUpdateAbout(data).unwrap();
      if (res?.success) {
        showSuccessAlert("success", "About update  or create successfully!");
      } else {
        toast.error(res.message, { position: toast.TOP_RIGHT });
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred", {
        position: toast.TOP_RIGHT,
      });
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
      setValue("description", data?.data?.description);
      setValue("title", data?.data?.title);
      setValue("details", data?.data?.details);
      setValue("worldwide_services", data?.data?.worldwide_services);
      setValue("support", data?.data?.support);
      setValue("easy_to_reach", data?.data?.easy_to_reach);
      setValue("first_on_field", data?.data?.first_on_field);
      setValue("project", data?.data?.project);
      setValue("experience", data?.data?.title);
      setValue("client_satisfaction", data?.data?.client_satisfaction);
      setValue("team_member", data?.data?.team_member);
      setValue("video_url", data?.data?.video_url);
      setValue("team_member", data?.data?.team_member);

      if (!photos.length && data?.data?.photos) {
        // Split the string into an array and remove duplicates
        const photoArray = data?.data?.photos.split(",");
        setPhotos(photoArray);
      }

      if (!photo && data?.data?.service_photo) {
        setPhoto(data?.data?.service_photo);
      }

      if (!worldWidePhoto && data?.data?.worldwide_services_photo) {
        setWorldWidePhoto(data?.data?.worldwide_services_photo);
      }
      if (!supportPhoto && data?.data?.support_photo) {
        setSupportPhoto(data?.data?.support_photo);
      }

      if (!easyToReachPhoto && data?.data?.easy_to_reach_photo) {
        setEasyToReachPhoto(data?.data?.easy_to_reach_photo);
      }
      if (!firstOnFieldPhoto && data?.data?.first_on_field_photo) {
        setFirstOnFieldPhoto(data?.data?.first_on_field_photo);
      }
    }
  }, [data, setValue, photo]);

  return (
    <>
      <section className="md:px-6 px-4 py-7 mt-6 bg-primary-base mx-6 rounded-lg">
        <h1 className="font-semibold text-[22px] text-white">About info</h1>
        <div className="flex items-center text-[16px] py-1">
          <Link href="/terms-and-conditions">
            <span className="text-secondary-base font-medium">About inf</span>
          </Link>
          <MdKeyboardArrowRight />
          <span> About inf</span>
        </div>

        <div className="bg-primary-base rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="items-start  space-y-1">
              {/* name  */}
              <Input
                placeholder="Enter name"
                text="name"
                label="Name "
                require={true}
                register={register}
                errors={errors}
              />
              <Input
                placeholder="Enter project"
                text="project"
                label="Project "
                require={true}
                register={register}
                errors={errors}
              />

              <Input
                placeholder="Enter experience"
                text="experience"
                label="Experience "
                require={true}
                register={register}
                errors={errors}
              />

              <Input
                placeholder="Enter client satisfaction"
                text="client_satisfaction"
                label="Client satisfaction "
                require={true}
                register={register}
                errors={errors}
              />
              <Input
                placeholder="Enter team member"
                text="team_member"
                label="Team member "
                require={true}
                register={register}
                errors={errors}
              />

              <Input
                placeholder="Enter  only allowed video url "
                text="video_url"
                label="video video "
                require={true}
                register={register}
                errors={errors}
              />

              <Textarea
                placeholder="Enter description"
                text="description"
                label="Description "
                required={true}
                register={register}
                errors={errors}
              />

              <h1> Service details </h1>
              <Input
                placeholder="Enter title"
                text="title"
                label="Title "
                require={true}
                register={register}
                errors={errors}
              />
              <Textarea
                placeholder="Enter  details "
                text="details"
                label="Service details "
                require={true}
                register={register}
                errors={errors}
              />
              {/* photo info  */}
              <Input
                placeholder="Enter worldwide services"
                text="worldwide_services"
                label="Worldwide services "
                require={true}
                register={register}
                errors={errors}
              />

              <div>
                <UpdateImageComponent
                  label={"worldwide services Photo"}
                  require={true}
                  width={"w-[250px]"}
                  height={"h-[250px]"}
                  setPhotoURL={setWorldWidePhoto}
                  photURL={worldWidePhoto}
                />
              </div>

              <Input
                placeholder="Enter support"
                text="support"
                label="Support "
                require={true}
                register={register}
                errors={errors}
              />

              <div>
                <UpdateImageComponent
                  label={"Support photo"}
                  require={true}
                  width={"w-[250px]"}
                  height={"h-[250px]"}
                  setPhotoURL={setSupportPhoto}
                  photURL={supportPhoto}
                />
              </div>
              {/* Easy to reach  */}
              <Input
                placeholder="Enter Easy to reach"
                text="easy_to_reach"
                label="Easy to reach "
                require={true}
                register={register}
                errors={errors}
              />

              <div>
                <UpdateImageComponent
                  label={"Easy to reach photo"}
                  require={true}
                  width={"w-[250px]"}
                  height={"h-[250px]"}
                  setPhotoURL={setEasyToReachPhoto}
                  photURL={easyToReachPhoto}
                />
              </div>
              {/* first_on_field  */}
              <Input
                placeholder="Enter first on field"
                text="first_on_field"
                label="First on field "
                require={true}
                register={register}
                errors={errors}
              />

              <div>
                <UpdateImageComponent
                  label={"first on field photo"}
                  require={true}
                  width={"w-[250px]"}
                  height={"h-[250px]"}
                  setPhotoURL={setFirstOnFieldPhoto}
                  photURL={firstOnFieldPhoto}
                />
              </div>

              <div>
                <UpdateImageComponent
                  label={"service photo photo"}
                  require={true}
                  width={"w-[600px]"}
                  height={"h-[450px]"}
                  setPhotoURL={setPhoto}
                  photURL={photo}
                />
              </div>

              <p>About slider photo</p>

              {/* Multiple Photo Uploads */}
              <div className="mb-4">
                {photos.map((item, index) => (
                  <div key={index} className="space-y-2 mt-2">
                    <UpdateImageComponent
                      width={"w-[450px]"}
                      label={`Photos  ${index + 1} `}
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
                      width={"w-[450px]"}
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

export default About;
