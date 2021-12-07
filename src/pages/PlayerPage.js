import React, { useState, useEffect } from "react";
import { Player } from "../components/Player";
import { DeletePlayerButton } from "../components/DeletePlayerButton";
import { CreateRelation } from "../components/CreateRelation";
import { useParams } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function PlayerPage() {
  const { id } = useParams();
  const auth = useAuth();
  const [player, setPlayer] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updatePlayer().then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePlayer = async () => {
    const newPlayer = await getPlayer();
    setPlayer(newPlayer);
  };

  const getPlayer = async () => {
    const url = auth.url_const + "api/players/" + id;

    const response = await auth.fetch_util(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + auth.token.access,
      },
    });

    const player = await response.json();

    return player;
  };

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Player player={player} />
      <CreateRelation player={player} />
      <DeletePlayerButton id_player={player.id} id_team={player.team.id} />
    </>
  );
}
