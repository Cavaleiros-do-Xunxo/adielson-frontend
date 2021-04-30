import React from "react";
import { BrowserRouter } from "react-router-dom";

import Header from "./Header";
import Routes from "../routes";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
  );
}
