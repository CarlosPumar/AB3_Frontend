import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import TeamListPage from "../pages/TeamListPage";
import PlayerListPage from "../pages/PlayerListPage";
import TeamPage from "../pages/TeamPage";
import PlayerPage from "../pages/PlayerPage";
import RelationPage from "../pages/RelationPage";
import ModifyTeamPage from "../pages/ModifyTeamPage";
import { ModifyPlayerPage } from "../pages/ModifyPlayerPage";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/team" component={TeamListPage} />
        <PrivateRoute exact path="/team/:id" component={TeamPage} />
        <PrivateRoute
          exact
          path="/team/modify/:id"
          component={ModifyTeamPage}
        />
        <PrivateRoute exact path="/player" component={PlayerListPage} />
        <PrivateRoute exact path="/player/:id" component={PlayerPage} />
        <PrivateRoute
          exact
          path="/player/modify/:id"
          component={ModifyPlayerPage}
        />
        <PrivateRoute exact path="/relation/:id" component={RelationPage} />
        <PrivateRoute exact path="/notFound" component={NotFoundPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
