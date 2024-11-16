import EditIndustry from "@/Components/industries/EditIndustry";
import React from "react";

const page = ({ params }) => {
  return (
    <>
      <EditIndustry id={params?.id} />
    </>
  );
};

export default page;
