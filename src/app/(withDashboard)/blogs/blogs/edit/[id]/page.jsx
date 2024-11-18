import EditBlog from "@/Components/blogs/blogs/EditBlog";
import React from "react";

const page = ({ params }) => {
  return (
    <>
      <EditBlog id={params.id} />
    </>
  );
};

export default page;
