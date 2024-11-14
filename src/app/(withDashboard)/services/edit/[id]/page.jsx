import EditService from "@/Components/services/EditService";
import React from "react";

const page = ({ params }) => {
  return (
    <>
      <EditService id={params.id} />
    </>
  );
};

export default page;
