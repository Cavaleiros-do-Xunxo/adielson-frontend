import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { AuthContext } from "../../services/authProvider";

const PurgeSession = () => {
  const { isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin } =
    useContext(AuthContext);

  if (isAuthenticated) {
    setIsAuthenticated(false);
  }

  if (isAdmin) {
    setIsAdmin(false);
  }

  return <Redirect to="/login" />;
};

export default PurgeSession;
