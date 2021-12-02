import React from "react";
import useAuth from "../auth/useAuth";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Back } from "./Back";

export function ModifyPlayer({ id }) {
  const auth = useAuth();
  const history = useHistory();

  const [teams, setTeams] = useState([]);
  const [states, setStates] = useState([]);
  const [details, setDetails] = useState({ name: "", team: "", state: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updateDetails();
    updateTeams();
    updateStates();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateDetails = async () => {
    const newPlayer = await getPlayer();
    setDetails({
      id: newPlayer.id,
      name: newPlayer.name,
      state: newPlayer.state,
      team: newPlayer.team.id,
    });
  };

  const updateTeams = async () => {
    const newTeams = await getTeams();
    setTeams(newTeams);
  };

  const updateStates = async () => {
    const newStates = await getStates();
    setStates(newStates);
  };

  const getPlayer = async () => {
    const url = auth.url_const + "api/players/" + id + "/";

    const response = await auth.fetch_util(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + auth.token.access,
      },
    });

    const playerResponse = await response.json();
    return playerResponse;
  };

  const getTeams = async () => {
    const url = auth.url_const + "api/teams/";

    const response = await auth.fetch_util(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + auth.token.access,
      },
    });

    const teamsResponse = await response.json();
    return teamsResponse;
  };

  const getStates = async () => {
    const url = auth.url_const + "api/states/";

    const response = await auth.fetch_util(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + auth.token.access,
      },
    });

    const statesResponse = await response.json();
    return statesResponse;
  };

  const handleModify = async () => {
    const url = auth.url_const + "api/players/" + id + "/";
    const body = JSON.stringify(details);
    console.log(body);

    await auth.fetch_util(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + auth.token.access,
      },
      body: body,
    });

    const redirect_url = "/player/" + id;

    history.push(redirect_url);
  };

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <>
      <h1>Modify Player</h1>
      <div className="form-group">
        <label>Name</label>
        <br />
        <input
          value={details.name}
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Team</label>
        <br />
        <select
          name="team"
          className="form-select"
          onChange={(e) =>
            setDetails({ ...details, team: parseInt(e.target.value) })
          }
          value={details.team}
        >
          {teams.map((team) => (
            <option key={team.id} value={parseInt(team.id)}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>State</label>
        <br />
        <select
          name="state_select"
          className="form-select"
          onChange={(e) => setDetails({ ...details, state: e.target.value })}
          value={details.state}
        >
          {Object.entries(states).map(([name, value]) => (
            <option key={value.code} value={value.code}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleModify}>
        Modify
      </button>
      <Back url={"/player/" + id} />
    </>
  );
}
