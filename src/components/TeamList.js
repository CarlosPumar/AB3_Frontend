import React from "react";
import useAuth from "../auth/useAuth";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Logout } from "./Logout";

export default function TeamList() {
  const history = useHistory();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = useAuth();

  useEffect(() => {
    updateTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTeams = async () => {
    const newTeams = await getTeams();
    setTeams(newTeams);
    setLoading(false);
  };

  const getTeams = async () => {
    console.log(auth.url_const);
    const response = await auth.fetch_util(auth.url_const + "api/teams", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + auth.token.access,
      },
    });

    const teams = await response.json();
    return teams;
  };

  const handleTeam = (e) => {
    const url = "/team/" + e.currentTarget.id;
    history.push(url);
  };

  if (loading) {
    return <>Loading...</>;
  }
  return (
    <div className="list-group">
      {teams.map((team) => (
        <button
          key={team.id}
          id={team.id}
          onClick={handleTeam}
          href=""
          className="list-group-item list-group-item-action"
        >
          {team.name}
        </button>
      ))}
      <Logout />
    </div>
  );
}
