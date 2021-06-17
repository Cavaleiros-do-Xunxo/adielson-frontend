import React from "react";
import { Button, Content, Heading, Media, Image } from "react-bulma-components";

const MenuRegisterItem = (props) => {
  const showInMenuButton = () => {
    if (props.showInMenuButton) {
      return (
        <Media.Item align="right">
          <Button
            color={props.inMenu ? "warning" : "success"}
            rounded={true}
            disabled={props.disableButtons}
            onClick={() => {
              props.showOnMenu(props.id, !props.inMenu);
            }}
            style={{ marginTop: "10px" }}
          >
            {props.inMenu ? "Remover do cardápio" : "Adicionar ao cardápio"}
          </Button>
        </Media.Item>
      );
    }
  };

  const showDeleteButton = () => {
    if (props.showDeleteButton) {
      return (
        <Media.Item align="right">
          <Button
            color="danger"
            rounded={true}
            disabled={props.disableButtons}
            onClick={() => {
              props.onDelete(props.id);
            }}
            style={{ marginTop: "10px" }}
          >
            Excluir
          </Button>
        </Media.Item>
      );
    }
  };

  return (
    <Media>
      <Media.Item align="left">
        <Image
          src={
            props.image != null && props.image !== ""
              ? props.image
              : "http://bulma.io/images/placeholders/128x128.png"
          }
          size={64}
        />
      </Media.Item>
      <Media.Item align="center">
        <Content>
          <Heading size={4}>{props.name}</Heading>
          <Heading subtitle size={6} weight="normal">
            <p>{props.description}</p>
            <p style={{ color: "#48c774" }}>R${props.price}</p>
          </Heading>
        </Content>
      </Media.Item>
      {showInMenuButton()}
      {showDeleteButton()}
    </Media>
  );
};

export default MenuRegisterItem;
