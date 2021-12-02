import React from "react";
import TeamList from "../components/TeamList";
import { CreateTeam } from "../components/CreateTeam";

function TeamsPage() {
  return (
    <>
      <h1 className="mb-5 ">Teams</h1>
      <TeamList />
      <CreateTeam />
    </>
  );
}

export default TeamsPage;
