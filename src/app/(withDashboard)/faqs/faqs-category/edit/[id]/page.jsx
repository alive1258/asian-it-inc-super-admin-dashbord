import EditFaqsCategory from "@/Components/faqs/faqs-category/EditFaqsCategory";
import React from "react";

const page = ({ params }) => {
  return (
    <>
      <EditFaqsCategory id={params.id} />
    </>
  );
};

export default page;
