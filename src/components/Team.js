import React from "react";
import useAuth from "../auth/useAuth";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Back } from "./Back";

export function Team({ id }) {
  const history = useHistory();
  const [team, setTeam] = useState({});
  const [loading, setLoading] = useState(true);

  const auth = useAuth();

  useEffect(() => {
    updateTeam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTeam = async () => {
    const newTeam = await getTeam();
    setTeam(newTeam);
    setLoading(false);
  };

  const getTeam = async () => {
    const url = auth.url_const + "api/teams/" + id;

    const response = await auth.fetch_util(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + auth.token.access,
      },
    });

    const team = await response.json();
    return team;
  };

  const handlePlayer = (e) => {
    const url = "/player/" + e.currentTarget.id;
    history.push(url);
  };

  const handleModify = () => {
    const url = "/team/modify/" + team.id;
    history.push(url);
  };

  if (loading) {
    return <>Loading...</>;
  }
  return (
    <>
      <h1 className="mb-5 d-inline">{team.name}</h1>
      <div className="d-flex justify-content-end">
        <button className="btn btn btn-warning" onClick={handleModify}>
          Modify
        </button>
      </div>
      <div className="list-group">
        <h3 className="mb-3">Players</h3>
        {team.players.map((player) => (
          <button
            id={player.id}
            key={player.id}
            onClick={handlePlayer}
            className="list-group-item list-group-item-action"
          >
            {player.name}
          </button>
        ))}
      </div>

      <Back url={"/team"} />
    </>
  );
}
