import React from "react";
import { useHistory } from "react-router";
import useAuth from "../auth/useAuth";

export function DeletePlayerButton({ id_player, id_team }) {
  const auth = useAuth();
  const history = useHistory();

  const handleDelete = async () => {
    const url = auth.url_const + "api/players/" + id_player;

    await auth.fetch_util(url, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + auth.token.access,
      },
    });

    const redirect_url = "/team/" + id_team;

    history.push(redirect_url);
  };

  return (
    <div className="d-flex justify-content-end">
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
