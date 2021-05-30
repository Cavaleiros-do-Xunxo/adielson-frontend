import React from "react";
import { Button, Content, Heading, Media, Image } from "react-bulma-components";

const MenuRegisterItem = (props) => {
  return (
    <Media>
      <Media.Item align="left">
        <Image
          src={
            props.imageUrl != null && props.imageUrl !== ""
              ? props.imageUrl
              : "http://bulma.io/images/placeholders/128x128.png"
          }
          size={64}
        />
      </Media.Item>
      <Media.Item align="center">
        <Content>
          <Heading size={4}>{props.title}</Heading>
          <Heading subtitle size={6} weight="normal">
            <p>{props.description}</p>
            <p style={{ color: "#48c774" }}>R${props.price}</p>
          </Heading>
        </Content>
      </Media.Item>
      <Media.Item align="right">
        <Button
          color="danger"
          rounded={true}
          onClick={() => {
            props.onDelete(props.renderId);
          }}
          style={{ marginTop: "10px" }}
        >
          Remover do cardápio
        </Button>
      </Media.Item>
    </Media>
  );
};

export default MenuRegisterItem;
