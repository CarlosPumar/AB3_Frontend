import React from "react";
import { useHistory } from "react-router-dom";
import { Back } from "./Back";

export function Player({ player }) {
  const history = useHistory();

  const handleRelation = (e) => {
    const url = "/relation/" + e.currentTarget.id;
    history.push(url);
  };

  const handleModify = () => {
    const url = "/player/modify/" + player.id;
    history.push(url);
  };

  return (
    <>
      <h1 className="mb-5 d-inline">{player.name} </h1>

      <div className="d-flex justify-content-end">
        <button className="btn btn btn-warning" onClick={handleModify}>
          Modify
        </button>
      </div>

      <div className="form-group">
        <h4>Team</h4>
        <input readOnly value={player.team.name} />
      </div>

      <div className="form-group">
        <h4>State</h4>
        <input readOnly value={player.state} />
      </div>

      <div className="form-group">
        <h4>Relations</h4>
        <div className="list-group">
          {player.relation.map((rel) => (
            <button
              href=""
              className="list-group-item list-group-item-action"
              key={rel.id}
              id={rel.id}
              onClick={handleRelation}
            >
              <ul className="list-group">
                <li className="list-group-item list-group-item-secondary">
                  Team mate
                  <div className="d-inline m-1 p-1 border border-secondary">
                    <label>{rel.team_mate.name}</label>
                  </div>
                </li>
                <li className="list-group-item list-group-item-secondary">
                  Points
                  <div className="d-inline m-1 p-1 border border-secondary">
                    <label>{rel.points}</label>
                  </div>
                </li>
                <li className="list-group-item list-group-item-secondary">
                  Assists{" "}
                  <div className="d-inline m-1 p-1 border border-secondary">
                    <label>{rel.assists}</label>
                  </div>
                </li>
                <li className="list-group-item list-group-item-secondary">
                  Rebounds
                  <div className="d-inline m-1 p-1 border border-secondary">
                    <label>{rel.rebounds}</label>
                  </div>
                </li>
              </ul>
            </button>
          ))}
        </div>
      </div>
      <Back url={"/team/" + player.team.id} />
    </>
  );
}
