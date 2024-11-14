"use client";
import Image from "next/image";
import { useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { updateImage } from "@/helpers/uploadImage/uploadImage";
import { showErrorAlert } from "@/Components/notification/Notification";

export default function UpdateImageComponent({
  setPhotoURL,
  photURL,
  require,
  width,
  label,
}) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageSize, setImageSize] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSize = (file.size / 1024 / 1024).toFixed(2); // Convert size to MB
      setImageSize(
        fileSize > 1 ? `${fileSize} MB` : `${(file.size / 1024).toFixed(2)} KB`
      );

      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      // Create a new Image element to load the uploaded image and get its dimensions
      const img = new window.Image(); // Use window.Image to create a new image element
      img.src = imageUrl;
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
      };
    }
  };
  // handleSavePhoto

  const handleSavePhoto = async () => {
    try {
      setLoading(true);
      // Save the uploaded image to the server
      const photoName = await updateImage({
        currentImage: image,
        oldImage: photURL,
      });
      if (!photoName) {
        showErrorAlert("error", "Banner upload photo failed");
        setLoading(false);
      } else {
        setLoading(false);
        setPhotoURL(photoName);
      }
    } catch (error) {
      showErrorAlert("error", error?.message);
      setLoading(false);
    }
  };
  // handleDeletePhoto
  const handleDeletePhoto = async () => {
    setImage(null);
    setImageSize(null);
    setImageDimensions({ width: 0, height: 0 });
    setPhotoURL("");
  };

  return (
    <div className={`${width ? width : "w-full"}`}>
      <label className="text-[16px] text-white">
        {label}
        <abbr
          className={`${require ? " " : "hidden"} pl-1  text-lg text-[#FF4234]`}
        >
          *
        </abbr>
      </label>
      <div className="border-[2px] mt-2 border-dashed border-info-base bg-[#131517] w-full max-w-full flex items-center justify-center h-96">
        {image ? (
          <Image // Use standard HTML img to display the uploaded image
            width={1000}
            height={100}
            src={URL.createObjectURL(image)}
            alt="Uploaded"
            className="object-cover h-full w-full"
          />
        ) : (
          <Image // Use standard HTML img to display the uploaded image
            width={1000}
            height={100}
            src={process.env.NEXT_PUBLIC_IMAGE_URL + photURL}
            alt="Uploaded"
            className="object-cover h-full w-full"
          />
        )}
      </div>
      <label className="cursor-pointer bg-info-base py-1 text-center mt-2 px-2 rounded-full  block max-w-[150px]">
        <p>Change Photo</p>
        <input type="file" className="hidden" onChange={handleImageUpload} />
      </label>
      {image && (
        <div className="mt-3 flex flex-wrap justify-between">
          <div>
            <p className="text-white">Image size: {imageSize}</p>
            <p className="text-white">
              Dimensions: {imageDimensions.width}px x {imageDimensions.height}px
            </p>
          </div>
          <div className={" flex items-center gap-5 mt-2"}>
            <div
              onClick={handleSavePhoto}
              className={`${
                photURL
                  ? "bg-info-base dark:text-white  cursor-none "
                  : " bg-[#131517]"
              } text-black cursor-pointer p-2 rounded`}
            >
              {loading ? (
                <AiOutlineLoading3Quarters
                  className={`${
                    photURL ? "text-white-base" : " "
                  } text-base   animate-spin`}
                />
              ) : (
                <GiCheckMark className={"text-base"} />
              )}
            </div>
            <div
              onClick={handleDeletePhoto}
              className={
                " bg-[#131517] text-red cursor-pointer p-[10px] rounded"
              }
            >
              <MdDelete className=" text-danger-base"></MdDelete>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
