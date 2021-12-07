import React, { useState, useEffect } from "react";
import useAuth from "../auth/useAuth";

export function CreatePlayer({ id_team }) {
  const auth = useAuth();

  const [states, setStates] = useState({});
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [details, setDetails] = useState({
    name: "",
    state: "AV",
    team: id_team,
  });

  useEffect(() => {
    updateStates();
    updateTeams();
    setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStates = async () => {
    const newStates = await getStatesPlayers();
    setStates(newStates);
  };

  const updateTeams = async () => {
    const newTeams = await getTeams();
    setTeams(newTeams);
  };

  const getStatesPlayers = async () => {
    const url = auth.url_const + "api/states/";

    const response = await auth.fetch_util(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const states_response = response.json();

    return states_response;
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

    const teams_response = await response.json();

    return teams_response;
  };

  const handleCreate = async (e) => {
    const url = auth.url_const + "api/players/";
    const body = JSON.stringify(details);

    console.log(body);

    await auth.fetch_util(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + auth.token.access,
      },
      body: body,
    });

    const url_redirect = "http://localhost:3000/team/" + id_team;
    window.location.replace(url_redirect);
  };

  if (loading) {
    return <></>;
  }

  return (
    <div>
      <h3>Create new player</h3>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <br />
        <input
          placeholder="Enter name"
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
        />
        <br />
      </div>
      <div className="form-group">
        <label htmlFor="team">Team</label>
        <br />
        <select
          name="team_select"
          className="form-select"
          value={details.team}
          onChange={(e) => setDetails({ ...details, team: e.target.value })}
        >
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="state">State</label>
        <br />
        <select
          name="state_select"
          className="form-select"
          onChange={(e) => setDetails({ ...details, state: e.target.value })}
        >
          {Object.entries(states).map(([name, value]) => (
            <option key={value.code} value={value.code}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleCreate}>
        Create
      </button>
    </div>
  );
}
