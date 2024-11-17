import EditFaqs from "@/Components/faqs/faqs/EditFaqs";
import React from "react";

const page = ({ params }) => {
  return (
    <>
      <EditFaqs id={params.id} />
    </>
  );
};

export default page;
