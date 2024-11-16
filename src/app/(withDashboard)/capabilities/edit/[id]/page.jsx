import EditCapability from "@/Components/capabilities/EditCapability";
import React from "react";

const page = ({ params }) => {
  return (
    <>
      <EditCapability id={params?.id} />
    </>
  );
};

export default page;
