import React from "react";
import { Content, Heading, Media, Image } from "react-bulma-components";

const MenuRegisterItem = (props) => {
  return (
    <Media>
      <Media.Item align="left">
        <Image src={props.imageUrl} size={64} />
      </Media.Item>
      <Media.Item align="center">
        <Content>
          <Heading size={4}>{props.title}</Heading>
          <Heading subtitle size={6} weight="normal">
            {props.description}
          </Heading>
        </Content>
      </Media.Item>
    </Media>
  );
};

export default MenuRegisterItem;
