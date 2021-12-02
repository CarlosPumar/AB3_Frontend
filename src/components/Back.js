import React from "react";
import { useHistory } from "react-router";

export function Back({ url }) {
  const history = useHistory();

  const handleBack = () => {
    history.push(url);
  };

  return (
    <>
      <div className="fixed-bottom my-5 mx-3">
        <button className="btn btn-secondary" onClick={handleBack}>
          Back
        </button>
      </div>
    </>
  );
}
