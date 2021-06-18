import React from "react";
import { Card, Media, Content, Heading, Button } from "react-bulma-components";

import "./CardMenu.css";

const CardMenu = (props) => {
  const formatPrice = (price) => {
    return price.toPrecision(price.toString().length + 2).replace(".", ",");
  };

  return (
    <Card style={{ width: "500px" }}>
      <Card.Image
        size={"4by3"}
        src={
          (props.menuItem && props.menuItem.image) ||
          "https://bulma.io/images/placeholders/1280x960.png"
        }
        alt="Comida"
      />
      <Card.Content>
        <Media>
          <Media.Item>
            <Heading size={"4"}>
              {props.menuItem && props.menuItem.name}
            </Heading>
            <Heading subtitle size={"6"} style={{ marginBottom: "7px" }}>
              {props.menuItem && props.menuItem.description}
            </Heading>
            <p style={{ color: "#48c774" }}>
              R${props.menuItem && formatPrice(props.menuItem.price)}
            </p>
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
};

export default CardMenu;
