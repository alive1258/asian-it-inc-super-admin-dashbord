"use client";
import Image from "next/image";
import { useState } from "react";

export default function UpdateImage({ setPhoto, photo }) {
  const [image, setImage] = useState(null);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Update image state with the selected file
      setPhoto(file); // Optionally pass the file to the parent via setPhoto if needed
    }
  };

  return (
    <div className="">
      <div
        id="file"
        htmlFor={"file"}
        className="border-[3px] border-dashed border-primary-base bg-gray-800 w-full max-w-full flex items-center justify-center h-96 overflow-hidden"
      >
        {image ? (
          <Image
            width={1000}
            height={400}
            src={URL.createObjectURL(image)} // Display the uploaded image
            alt="Uploaded"
            layout="responsive"
            className="object-cover h-full w-full"
          />
        ) : (
          <div>
            <Image
              width={250}
              height={250}
              className="w-full h-full object-cover"
              src={photo}
              alt="image"
            />
          </div>
        )}
      </div>
      <div className="mt-4">
        <label id="file">
          <input
            type="file"
            className="hidden"
            onChange={handleImageUpload} // Trigger image upload
          />
          <span className=" bg-blue-500 text-white px-4 cursor-pointer py-2 rounded-full ">
            Change Image
          </span>
        </label>
      </div>
    </div>
  );
}