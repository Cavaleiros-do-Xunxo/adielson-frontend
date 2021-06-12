import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import Header from "./header/Header";
import Routes from "../routes";

import { AuthProvider } from "../services/authProvider";

import "./App.css";

export default function App() {
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Header updateHeaderHeight={setHeaderHeight} />
        <Routes headerHeight={headerHeight} />
      </AuthProvider>
    </BrowserRouter>
  );
}
