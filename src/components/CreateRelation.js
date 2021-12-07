import React, { useState, useEffect } from "react";
import useAuth from "../auth/useAuth";

export function CreateRelation({ player }) {
  const auth = useAuth();

  const [loading, setLoading] = useState(true);
  const [teamMates, setTeamMates] = useState({});
  const [details, setDetails] = useState({
    player: player.id,
    team_mate: null,
    points: 0,
    assists: 0,
    rebounds: 0,
  });

  useEffect(() => {
    updateTeamMates().then(() => setLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTeamMates = async () => {
    const newTeamMates = await getTeamMates();
    let newTeamMatesSameTeam = [];

    await newTeamMates.map((newTeamMate) =>
      newTeamMate.team === player.team.id && newTeamMate.id !== player.id
        ? newTeamMatesSameTeam.push(newTeamMate)
        : {}
    );

    await setTeamMates(newTeamMatesSameTeam);
    try {
      await setDetails({ ...details, team_mate: newTeamMatesSameTeam[0].id });
    } catch {}
  };

  const getTeamMates = async () => {
    const url = auth.url_const + "api/players/";

    const response = await auth.fetch_util(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + auth.token.access,
      },
    });

    const players_response = await response.json();
    return players_response;
  };

  const handleCreate = async (e) => {
    const url = auth.url_const + "api/relations/";
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

    const url_redirect = auth.url_const + "player/" + player.id;
    window.location.replace(url_redirect);
  };

  if (loading) {
    return <></>;
  }

  return (
    <>
      <h3>Create new relation</h3>
      <div className="form-group">
        <label htmlFor="team_mate">Team mate</label>
        <br />
        <select
          name="team_mate_select"
          className="form-select"
          onChange={(e) =>
            setDetails({ ...details, team_mate: e.target.value })
          }
          value={details.team_mate}
        >
          {teamMates.map((teamMate) => (
            <option key={teamMate.id} value={teamMate.id}>
              {teamMate.name}
            </option>
          ))}
        </select>
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
      <button className="btn btn-primary" onClick={handleCreate}>
        Create
      </button>
    </>
  );
}
