import React from "react";
import { Switch, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Menu from "./pages/menu/Menu";
import Register from "./pages/register/Register";
import Order from "./pages/order/Order";
import NotFound from "./pages/notfound/NotFound";
import MyOrders from "./pages/my-orders/MyOrders";
import MyOrder from "./pages/my-order/MyOrder";
import Dashboard from "./pages/dashboard/Dashboard";
import MenuRegister from "./pages/menu-register/MenuRegister";

export default function Routes(properties) {
  return (
    <AnimatePresence>
      <Switch>
        <Route
          path="/"
          exact={true}
          render={(props) => {
            return <Home {...props} headerHeight={properties.headerHeight} />;
          }}
        />
        <Route
          path="/menu"
          exact={true}
          render={(props) => {
            return <Menu {...props} headerHeight={properties.headerHeight} />;
          }}
        />
        <Route
          path="/login"
          exact={true}
          render={(props) => {
            return <Login {...props} headerHeight={properties.headerHeight} />;
          }}
        />
        <Route
          path="/register"
          exact={true}
          render={(props) => {
            return (
              <Register {...props} headerHeight={properties.headerHeight} />
            );
          }}
        />
        <Route
          path="/order"
          exact={true}
          render={(props) => {
            return <Order {...props} headerHeight={properties.headerHeight} />;
          }}
        />
        <Route
          path="/myorders"
          exact={true}
          render={(props) => {
            return (
              <MyOrders {...props} headerHeight={properties.headerHeight} />
            );
          }}
        />
        <Route
          path="/myorder/:id"
          exact={true}
          render={(props) => {
            return (
              <MyOrder {...props} headerHeight={properties.headerHeight} />
            );
          }}
        />
        <Route
          path="/dashboard"
          exact={true}
          render={(props) => {
            return (
              <Dashboard {...props} headerHeight={properties.headerHeight} />
            );
          }}
        />
        <Route
          path="/menuregister"
          exact={true}
          render={(props) => {
            return (
              <MenuRegister {...props} headerHeight={properties.headerHeight} />
            );
          }}
        />
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </AnimatePresence>
  );
}
