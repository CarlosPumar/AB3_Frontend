import React from "react";
import useAuth from "../auth/useAuth";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { DeleteRelation } from "../components/DeleteRelation";
import { Back } from "./Back";

export function Relation({ id }) {
  const auth = useAuth();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    updateDetails().then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateDetails = async () => {
    const newRelation = await getRelation();
    setDetails(newRelation);
  };

  const getRelation = async () => {
    const url = auth.url_const + "api/relations/" + id;

    const response = await auth.fetch_util(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + auth.token.access,
      },
    });

    const relation = await response.json();
    return relation;
  };

  const handleRelation = async (e) => {
    const url = auth.url_const;
    let bodyRequest = {
      id: parseInt(details.id),
      points: parseFloat(details.points),
      assists: parseFloat(details.assists),
      rebounds: parseFloat(details.rebounds),
      player: details.player.id,
      team_mate: details.team_mate.id,
    };

    const body = JSON.stringify(bodyRequest);

    await auth.fetch_util(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + auth.token.access,
      },
      body: body,
    });

    const redirect_url = "/player/" + details.player.id;
    console.log(bodyRequest);
    history.push(redirect_url);
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }
  return (
    <>
      <h1>{details.player.name}</h1>

      <div className="form-group">
        <label htmlFor="team_mate">Team mate</label>
        <br />
        <input readOnly value={details.team_mate.name} />
      </div>

      <div className="form-group">
        <label htmlFor="oints">Points</label>
        <br />
        <input
          value={details.points}
          onChange={(e) => setDetails({ ...details, points: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="assists">Assists</label>
        <br />
        <input
          value={details.assists}
          onChange={(e) => setDetails({ ...details, assists: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="rebounds">Rebounds</label>
        <br />
        <input
          value={details.rebounds}
          onChange={(e) => setDetails({ ...details, rebounds: e.target.value })}
        />
      </div>
      <button className="btn btn-primary" onClick={handleRelation}>
        Modify
      </button>
      <DeleteRelation id={id} id_player={details.player.id} />
      <Back url={"/player/" + details.player.id} />
    </>
  );
}
