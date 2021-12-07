import React, { useState, useEffect } from "react";
import useAuth from "../auth/useAuth";

export function CreateTeam() {
  const auth = useAuth();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = async () => {
    const url = auth.url_const + "api/teams/";
    const body = JSON.stringify(details);

    await auth.fetch_util(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + auth.token.access,
      },
      body: body,
    });
    const url_redirect = "http://ab3.es/team/";
    window.location.replace(url_redirect);
  };

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div>
      <h3 className="mt-3">Create new team</h3>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <br />
        <input
          placeholder="Enter name"
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
        />
        <br />
      </div>
      <button className="btn btn-primary" onClick={handleCreate}>
        Create
      </button>
    </div>
  );
}
