import React from "react";
import { Relation } from "../components/Relation";
import { useParams } from "react-router-dom";

export default function RelationPage() {
  const { id } = useParams();
  return (
    <>
      <Relation id={id} />
    </>
  );
}
