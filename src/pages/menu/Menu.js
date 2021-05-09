import React from "react";
import CardMenu from "../../components/card-menu/CardMenu";
import { motion } from "framer-motion";
import { Block, Container, Columns, Heading } from "react-bulma-components";

import "./Menu.css";

export default class Menu extends React.Component {
  render() {
    const mockCards = [];

    for (let i = 0; i < 6; i++) {
      mockCards.push(
        <Columns.Column key={i} size={"one-quarter"}>
          <Block className="card-item">
            <CardMenu />
          </Block>
        </Columns.Column>
      );
    }

    return (
      <Container
        renderAs={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="menu-container"
      >
        <Columns>
          <Columns.Column>
            <Heading
              className="menu-title"
              size={3}
              style={{ marginTop: "10px" }}
            >
              Cardápio do dia
            </Heading>
            <hr />
          </Columns.Column>
        </Columns>
        <Columns flexWrap={"wrap"}>{mockCards}</Columns>
      </Container>
    );
  }
}
