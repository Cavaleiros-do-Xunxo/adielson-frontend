import React, { useState, useEffect, useContext } from "react";
import CardRegister from "../../components/card-register/CardRegister";
import { motion } from "framer-motion";
import { Block, Container, Columns } from "react-bulma-components";

import api from "../../services/api";
import SessionManager from "../../services/sessionManager";
import { AuthContext } from "../../services/authProvider";

import "./Register.css";
import SuccessOverlay from "../../components/success-overlay/SuccessOverlay";

const Register = (props) => {
  const [user, setUser] = useState({
    name: "",
    phone: "",
    cpf: "",
    email: "",
    password: "",
  });
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [error, setError] = useState("");
  const { isAuthenticated, setIsAuthenticated, setIsAdmin } =
    useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/menu");
    }
  });

  const handleRegisterInputs = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const onSubmit = async () => {
    try {
      setIsSubmiting(true);
      setError("");

      const registerResponse = await api.registerUser(user);

      if (registerResponse.status === 200) {
        setShowSuccessOverlay(true);

        SessionManager.setAuthToken(registerResponse.data.token);

        const userResponse = await api.getUserFromCurrentSession();

        SessionManager.setCurrentUser(userResponse.data);

        setIsAuthenticated(true);

        if (userResponse.data.role === "ADMIN") {
          setIsAdmin(true);
        }

        setTimeout(() => {
          props.history.push("/menu");
        }, 3000);
      }
    } catch (e) {
      if (e.response && e.response.status === 400 && e.response.data) {
        setError(e.response.data.message);
      } else {
        console.error(
          "An unexpected error has occurred when registering user",
          e
        );
        setError(
          "Um erro aconteceu ao processar seu cadastro, tente novamente mais tarde ou entre em contato com o suporte."
        );
      }
    } finally {
      setIsSubmiting(false);
    }
  };

  const onSuccess = () => {
    if (showSuccessOverlay === true) {
      return <SuccessOverlay text="Usuário cadastrado com sucesso!" />;
    }
  };

  return (
    <Block
      renderAs={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="register"
    >
      <Container className="register-container" breakpoint={"fluid"}>
        <Columns>
          <Columns.Column style={{ display: "flex", width: 0 }}>
            <Block className="food">
              <img
                src={process.env.PUBLIC_URL + "/assets/register.svg"}
                alt="Comida de fast food"
                className="food-icon"
              />
            </Block>
          </Columns.Column>
          <Columns.Column size={"half"}>
            <Block className="register-card">
              <CardRegister
                handleRegisterInputs={handleRegisterInputs}
                onSubmit={onSubmit}
                isSubmiting={isSubmiting}
                error={error}
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

export default Register;
