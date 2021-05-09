import React from "react";
import { Switch, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Menu from "./pages/menu/Menu";
import Register from "./pages/register/Register";
import Order from "./pages/order/Order";

export default function Routes() {
  return (
    <AnimatePresence>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/menu" exact={true} component={Menu} />
        <Route path="/login" exact={true} component={Login} />
        <Route path="/register" exact={true} component={Register} />
        <Route path="/order" exact={true} component={Order} />
      </Switch>
    </AnimatePresence>
  );
}
