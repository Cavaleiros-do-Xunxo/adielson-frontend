import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { SessionContext } from "../../services/sessionProvider";

const PurgeSession = () => {
  const { isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin } =
    useContext(SessionContext);

  if (isAuthenticated) {
    setIsAuthenticated(false);
  }

  if (isAdmin) {
    setIsAdmin(false);
  }

  return <Redirect to="/login" />;
};

export default PurgeSession;
