import EditAssignTechnology from "@/Components/products/assign-technology/EditAssignTechnology";
import React from "react";

const page = ({ params }) => {
  return (
    <>
      <EditAssignTechnology id={params.id} />
    </>
  );
};

export default page;
