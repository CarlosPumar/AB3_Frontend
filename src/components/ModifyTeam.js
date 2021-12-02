import React from "react";
import useAuth from "../auth/useAuth";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Back } from "./Back";

export function ModifyTeam({ id }) {
  const auth = useAuth();
  const history = useHistory();
  const [details, setDetails] = useState({});
  const [team, setTeam] = useState({ name: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updateTeam().then((newTeam) => setDetails({ name: newTeam.name }));

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTeam = async () => {
    const newTeam = await getTeam();
    setTeam(newTeam);
    return newTeam;
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

  const handleModify = async () => {
    const url = auth.url_const + "api/teams/" + team.id + "/";
    const body = JSON.stringify(details);

    await auth.fetch_util(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + auth.token.access,
      },
      body: body,
    });

    const redirect_url = "/team/" + team.id;

    history.push(redirect_url);
  };

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <>
      <h1>Modify Team</h1>
      <div className="form-group">
        <label>Name</label>
        <br />
        <input
          value={details.name}
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
        />
      </div>
      <button className="btn btn-primary" onClick={handleModify}>
        Modify
      </button>
      <Back url={"/team/" + id} />
    </>
  );
}
