import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Block, Container, Columns } from "react-bulma-components";

import CardLogin from "../../components/card-login/CardLogin";
import SuccessOverlay from "../../components/success-overlay/SuccessOverlay";

import api from "../../services/api";
import SessionManager from "../../services/sessionManager";
import { SessionContext } from "../../services/sessionProvider";

import "./Login.css";

const Login = (props) => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const { isAuthenticated, setIsAuthenticated, setIsAdmin } =
    useContext(SessionContext);

  useEffect(() => {
    let isMounted = true;

    if (isAuthenticated && isMounted) {
      props.history.push("/menu");
    }

    return () => {
      isMounted = false;
    };
  });

  const onSubmit = async () => {
    try {
      setIsSubmiting(true);
      setErrorOccurred(false);

      const loginResponse = await api.authenticate(loginForm);

      if (loginResponse.status === 200) {
        setShowSuccessOverlay(true);

        SessionManager.setAuthToken(loginResponse.data.token);

        const userResponse = await api.getUserFromCurrentSession();

        SessionManager.setCurrentUser(userResponse.data);

        setIsAuthenticated(true);

        if (userResponse.data.role === "ADMIN") {
          setIsAdmin(true);
        }

        setTimeout(() => {
          props.history.push("/menu");
        }, 1000);
      }
    } catch (e) {
      console.error(
        "An unexpected error has occurred when authenticating user",
        e
      );
      setErrorOccurred(true);
    } finally {
      setIsSubmiting(false);
    }
  };

  const handleLoginInputs = (event) => {
    const { name, value } = event.target;

    setLoginForm({ ...loginForm, [name]: value });
  };

  const onSuccess = () => {
    if (showSuccessOverlay === true) {
      return <SuccessOverlay text="Login realizado com sucesso!" />;
    }
  };

  return (
    <Block
      renderAs={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="login"
    >
      <Container className="login-container" breakpoint={"fluid"}>
        <Columns>
          <Columns.Column style={{ display: "flex", width: 0 }}>
            <Block className="food">
              <img
                src={process.env.PUBLIC_URL + "/assets/delivery-food.svg"}
                alt="Comida de fast food"
                className="food-icon"
              />
            </Block>
          </Columns.Column>
          <Columns.Column size={"half"}>
            <Block className="login-card">
              <CardLogin
                handleLoginInputs={handleLoginInputs}
                onSubmit={onSubmit}
                isSubmiting={isSubmiting}
                errorOccurred={errorOccurred}
              />
            </Block>
          </Columns.Column>
        </Columns>
      </Container>
      <Block>
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use href="#gentle-wave" x="48" y="0" fill="#EA1D2C" />
          </g>
        </svg>
      </Block>
      {onSuccess()}
    </Block>
  );
};

export default Login;
