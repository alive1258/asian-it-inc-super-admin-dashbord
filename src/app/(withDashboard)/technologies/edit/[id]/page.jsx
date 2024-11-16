import EditTechnology from "@/Components/technologies/EditTechnology";
import React from "react";

const page = ({ params }) => {
  return (
    <>
      <EditTechnology id={params?.id} />
    </>
  );
};

export default page;
