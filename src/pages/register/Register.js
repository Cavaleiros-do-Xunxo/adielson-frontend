import React from "react";
import CardRegister from "../../components/card-register/CardRegister";
import { motion } from "framer-motion";
import { Block, Container, Columns } from "react-bulma-components";

import "./Register.css";

const Register = (props) => {
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
              <CardRegister />
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
    </Block>
  );
};

export default Register;
