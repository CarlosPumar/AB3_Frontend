import React from "react";
import { useHistory } from "react-router";
import useAuth from "../auth/useAuth";

export function Logout({ url }) {
  const auth = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    auth.logout();
    history.push("/login/");
  };

  return (
    <>
      <div className="fixed-bottom my-5 mx-3">
        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}
