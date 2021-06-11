import React from "react";
import { Card, Media, Content, Heading, Button } from "react-bulma-components";

import "./CardMenu.css";

export default class CardMenu extends React.Component {
  render() {
    return (
      <Card>
        <Card.Image
          size={"4by3"}
          src="https://bulma.io/images/placeholders/1280x960.png"
          alt="Comida"
        />
        <Card.Content>
          <Media>
            <Media.Item>
              <Heading size={"4"}>Marmita</Heading>
              <Heading subtitle size={"6"} style={{ marginBottom: "7px" }}>
                Arroz, feijão, frango empanado.
              </Heading>
              <p style={{ color: "#48c774" }}>R$10,00</p>
            </Media.Item>
          </Media>
          <Content style={{ textAlign: "center" }}>
            <Button className="button is-danger is-rounded">
              <i className="fas fa-plus add-item-to-char-icon"></i> Adicionar
            </Button>
          </Content>
        </Card.Content>
      </Card>
    );
  }
}
