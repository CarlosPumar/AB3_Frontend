import React from "react";
import { useParams } from "react-router-dom";
import { CreatePlayer } from "../components/CreatePlayer";
import { Team } from "../components/Team";
import { DeleteTeam } from "../components/DeleteTeam";

function TeamPage() {
  const { id } = useParams();
  return (
    <>
      <Team id={id} />
      <br />
      <CreatePlayer id_team={id} />
      <DeleteTeam id={id} />
    </>
  );
}

export default TeamPage;
