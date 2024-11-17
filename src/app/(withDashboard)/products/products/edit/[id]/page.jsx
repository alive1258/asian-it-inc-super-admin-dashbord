import EditProduct from "@/Components/products/products/EditProduct";
import React from "react";

const page = ({ params }) => {
  return (
    <>
      <EditProduct id={params?.id} />
    </>
  );
};

export default page;
