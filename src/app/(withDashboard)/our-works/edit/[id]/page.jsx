import EditOurWork from "@/Components/our-works/EditOurWork";
import React from "react";

const page = ({ params }) => {
  return (
    <>
      <EditOurWork id={params?.id} />
    </>
  );
};

export default page;
