import axios from "axios";
export const updateImage = async ({ currentImage, oldImage }) => {
  // Initialize with the current image filename
  let randomFileName = oldImage;

  // Check if a new image is provided
  if (currentImage?.name) {
    try {
      // Prepare form data with the new and old image files
      const formData = new FormData();
      formData.append("newFile", currentImage);
      formData.append("oldFile", oldImage);

      // Make a POST request to update the image
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_URL}/public/api/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Validate that the response contains the expected data
      const photo = res?.data?.name;
      if (!photo) {
        throw new Error("The response did not contain a valid photo name.");
      }

      // Update the filename with the new photo name
      randomFileName = photo;
    } catch (error) {
      // Enhance error handling with more context
      throw new Error(`Image update failed: ${error.message}`);
    }
  }
  // Return the updated or original image filename
  return randomFileName;
};

export const uploadImage = async ({ file }) => {
  // Validate that the file is provided
  if (!file) {
    throw new Error("File is required for upload.");
  }

  // Validate that the environment variable is defined
  if (!process.env.NEXT_PUBLIC_IMAGE_UPLOAD_URL) {
    throw new Error(
      "Environment variable NEXT_PUBLIC_IMAGE_UPLOAD_URL is not defined."
    );
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_URL}/public/api/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Validate that the response contains the expected data
    const photo = res?.data?.name;
    if (!photo) {
      throw new Error("The response did not contain a valid photo name.");
    }

    return photo;
  } catch (error) {
    // Enhance error handling with more context
    throw new Error("Image upload failed. Please try again later.");
  }
};

export const deleteImage = async ({ currentImage }) => {
  try {
    const formData = { currentImage };
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_URL}/public/api/delete`,
      formData
    );
    // Validate that the response contains the expected data
    const photo = res?.data?.name;
    if (!photo) {
      throw new Error("The response did not contain a valid photo name.");
    }

    return photo;
  } catch (error) {
    // Enhance error handling with more context
    throw new Error("Image upload failed. Please try again later.");
  }
};
