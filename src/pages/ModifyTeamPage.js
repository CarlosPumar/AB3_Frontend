import React from "react";
import { useParams } from "react-router-dom";
import { ModifyTeam } from "../components/ModifyTeam";

function ModifyTeamPage() {
  const { id } = useParams();

  return (
    <>
      <ModifyTeam id={id} />
    </>
  );
}

export default ModifyTeamPage;
