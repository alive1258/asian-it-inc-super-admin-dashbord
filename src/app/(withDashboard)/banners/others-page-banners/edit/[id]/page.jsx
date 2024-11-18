import EditOthersPageBanner from "@/Components/banners/others-page-banners/EditOthersPageBanner";
import React from "react";

const page = ({ params }) => {
  return (
    <>
      <EditOthersPageBanner id={params.id} />
    </>
  );
};

export default page;
