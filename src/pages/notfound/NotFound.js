import React from "react";
import { motion } from "framer-motion";
import { Container, Heading } from "react-bulma-components";

export default class NotFound extends React.Component {
  render() {
    return (
      <Container
        renderAs={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        textAlign="center"
        style={{ marginTop: "100px" }}
      >
        <Heading size={1}>
          Opa! A página que você tentou acessar não existe. 😔
        </Heading>
      </Container>
    );
  }
}
