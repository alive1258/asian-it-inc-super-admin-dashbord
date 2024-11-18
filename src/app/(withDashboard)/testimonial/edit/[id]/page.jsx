import EditTestimonial from "@/Components/testimonial/EditTestimonial";
import React from "react";

const page = ({ params }) => {
  return (
    <>
      <EditTestimonial id={params.id} />
    </>
  );
};

export default page;
