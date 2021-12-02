import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || null
  );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  useEffect(() => {
    try {
      localStorage.setItem("token", JSON.stringify(token));
    } catch (error) {
      localStorage.removeItem("token");
      console.log(error);
    }

    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      localStorage.removeItem("user");
      console.log(error);
    }
  }, [token, user]);

  const url_const = "http://ab3.es/";

  const contextValue = {
    user,
    token,
    url_const,
    async login(details) {
      try {
        let response = await fetch(url_const + "api/token/", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(details),
        });

        if (response.ok === false) {
          return false;
        }

        const token_setted = await response.json();
        setToken(token_setted);
        localStorage.setItem("token_setted", token_setted);

        const auth_token = "JWT " + token_setted.access;

        response = await fetch(url_const + "api/user/", {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth_token,
          },
        });

        const user_setted = await response.json();
        setUser(user_setted);

        return true;
      } catch (error) {
        setToken(null);
        setUser(null);
      }
    },
    logout() {
      setToken(null);
      setUser(null);
    },
    isLogged() {
      return !!user;
    },
    async fetch_util(url, data) {
      let response = {};
      try {
        response = await fetch(url, data);

        if (response.status === 401) {
          throw new Unauthorized();
        } else if (response.status === 404) {
          window.location.replace("http://localhost:3000/notFound");
        } else {
          return response;
        }
      } catch (error) {
        console.log(error);
        try {
          const body = {
            refresh: token.refresh,
          };

          console.log(token);

          response = await fetch(url_const + "api/token/refresh/", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });

          const token_setted = await response.json();
          setToken(token_setted);

          data.headers.Authorization = "JWT " + token_setted.access;

          response = await fetch(url, data);

          if (response.status === 401) {
            throw new Unauthorized();
          } else {
            return response;
          }
        } catch (error) {
          console.log(error);
          window.location.replace("http://localhost:3000/login");
        }
      }
    },
  };

  function Unauthorized() {
    this.nombre = "Unauthorized";
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
