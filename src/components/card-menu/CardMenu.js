import React, { useContext, useState } from "react";
import { Card, Media, Content, Heading, Button } from "react-bulma-components";

import Cart from "../../services/cart";
import { SessionContext } from "../../services/sessionProvider";

import "./CardMenu.css";

const CardMenu = (props) => {
  const [isItemAdded, setIsItemAdded] = useState(false);
  const { setCartItems } = useContext(SessionContext);

  const addItemToCart = (menuItem) => {
    if (menuItem) {
      Cart.addItem(props.menuItem, (items) => {
        setCartItems(items);
      });
      setIsItemAdded(true);

      setTimeout(() => {
        setIsItemAdded(false);
      }, 1000);
    }
  };

  const formatPrice = (price) => {
    return price.toPrecision(price.toString().length + 2).replace(".", ",");
  };

  return (
    <Card style={{ width: "500px", display: "flex", flexDirection: "column" }}>
      <Card.Image
        size={"4by3"}
        src={
          (props.menuItem && props.menuItem.image) ||
          "https://bulma.io/images/placeholders/1280x960.png"
        }
        alt="Comida"
      />
      <Card.Content
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
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
        <Content
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
          }}
        >
          <Button
            className="button is-danger is-rounded"
            disabled={isItemAdded}
            onClick={() => {
              if (props.menuItem) {
                addItemToCart(props.menuItem);
              }
            }}
          >
            <i className="fas fa-plus add-item-to-char-icon"></i>{" "}
            {isItemAdded ? "Adicionado" : "Adicionar"}
          </Button>
        </Content>
      </Card.Content>
    </Card>
  );
};

export default CardMenu;
