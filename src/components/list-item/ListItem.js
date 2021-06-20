import React from "react";
import {
  Box,
  Button,
  Form,
  Image,
  Media,
  Content,
} from "react-bulma-components";

const ListItem = (props) => {
  const content = () => {
    return (
      <Media renderAs="div">
        <Media.Item
          align="left"
          className="hide-on-mobile"
          display="flex"
          style={{ alignSelf: "center" }}
        >
          <Image
            src={
              props.image
                ? props.image
                : "http://bulma.io/images/placeholders/128x128.png"
            }
            size={64}
          />
        </Media.Item>
        <Media.Item
          align="center"
          display="flex"
          style={{ alignSelf: "center" }}
        >
          <Content>
            <p>
              <strong>{props.name}</strong>
              <br />
              {props.description}
            </p>
          </Content>
        </Media.Item>
        <Media.Item
          display="flex"
          align="right"
          style={{ alignSelf: "center" }}
        >
          <Form.Control
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              color="ghost"
              style={{ color: "black", marginRight: "-8px" }}
              onClick={() => {
                props.addItem({
                  id: props.id,
                  name: props.name,
                  description: props.description,
                  image: props.image,
                });
              }}
            >
              <i className="fas fa-plus"></i>
            </Button>
            <Form.Input
              readOnly={true}
              type="text"
              size="small"
              rounded={true}
              style={{ width: "40px" }}
              value={props.count}
              textAlign="center"
            />
            <Button
              color="ghost"
              style={{ color: "black", marginLeft: "-8px" }}
              onClick={() => {
                props.removeItem(props.id);
              }}
            >
              <i className="fas fa-minus"></i>
            </Button>
          </Form.Control>
        </Media.Item>
      </Media>
    );
  };
  if (!props.useBoxWrap) {
    return content();
  }

  return (
    <Box
      style={{
        margin: "7px",
        boxShadow:
          "0 .5em 1em -.125em rgba(10,10,10,.1),0 0 0 1px rgba(10,10,10,.1)",
      }}
    >
      {content()}
    </Box>
  );
};

export default ListItem;
