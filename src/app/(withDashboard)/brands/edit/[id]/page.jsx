import EditBrand from "@/Components/brands/EditBrand";
import React from "react";

const page = ({ params }) => {
  return (
    <>
      <EditBrand id={params?.id} />
    </>
  );
};

export default page;
