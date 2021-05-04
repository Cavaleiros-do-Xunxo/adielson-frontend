import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Menu from "./pages/menu/Menu";
import Register from "./pages/register/Register";

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
