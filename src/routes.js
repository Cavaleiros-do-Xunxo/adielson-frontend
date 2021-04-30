import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Register from "./pages/Register";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route path="/menu" exact={true} component={Menu} />
      <Route path="/login" exact={true} component={Login} />
      <Route path="/register" exact={true} component={Register} />
    </Switch>
  );
}
