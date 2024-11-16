import EditTeams from "@/Components/teams/EditTeams";
import React from "react";

const page = ({ params }) => {
  return (
    <>
      <EditTeams id={params?.id} />
    </>
  );
};

export default page;
