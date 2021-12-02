import useAuth from "../auth/useAuth";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function LoginPage() {
  const auth = useAuth();
  const history = useHistory();
  const [details, setDetails] = useState({ username: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginSuccesfull = await auth.login(details);
    if (loginSuccesfull) {
      history.push("/team");
    } else {
      let divError = document.getElementById("errors");
      divError.innerHTML = "Failed to login";
    }
  };

  return (
    <>
      <h1 className="mb-3">Login</h1>
      <div id="errors" className="mb-3 text-danger"></div>
      <form onSubmit={handleLogin}>
        <div className="form-group ">
          <label htmlFor="username">Username</label>
          <br />
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            id="username"
            onChange={(e) =>
              setDetails({ ...details, username: e.target.value })
            }
            value={details.username}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </>
  );
}

export default LoginPage;
