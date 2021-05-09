import React from "react";
import { motion } from "framer-motion";
import { Container, Heading } from "react-bulma-components";

export default class Order extends React.Component {
  render() {
    return (
      <Container
        renderAs={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Heading size={3} style={{ marginTop: "10px" }}>
          Confirme seu pedido
        </Heading>
        <hr />
      </Container>
    );
  }
}
