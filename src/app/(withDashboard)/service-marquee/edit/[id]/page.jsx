import EditServiceMarquee from "@/Components/service-marquee/EditServiceMarquee";
import React from "react";

const page = ({ params }) => {
  return (
    <>
      <EditServiceMarquee id={params.id} />
    </>
  );
};

export default page;
