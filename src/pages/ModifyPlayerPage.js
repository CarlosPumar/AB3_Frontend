import React from "react";
import { useParams } from "react-router-dom";
import { ModifyPlayer } from "../components/ModifyPlayer";

export function ModifyPlayerPage() {
  const { id } = useParams();

  return (
    <>
      <ModifyPlayer id={id} />
    </>
  );
}
