import React from "react";
import {
  Box,
  Button,
  Form,
  Image,
  Media,
  Content,
} from "react-bulma-components";

export default class ListItem extends React.Component {
  content = () => {
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
              this.props.imageUrl
                ? this.props.imageUrl
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
              <strong>{this.props.title ? this.props.title : "Marmita"}</strong>
              <br />
              {this.props.description
                ? this.props.description
                : "Arroz, feijão e frango empanado"}
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
            >
              <i className="fas fa-plus"></i>
            </Button>
            <Form.Input
              readOnly={true}
              type="text"
              size="small"
              rounded={true}
              style={{ width: "40px" }}
              value={0}
              textAlign="center"
            />
            <Button
              color="ghost"
              style={{ color: "black", marginLeft: "-8px" }}
            >
              <i className="fas fa-minus"></i>
            </Button>
          </Form.Control>
        </Media.Item>
      </Media>
    );
  };

  render() {
    if (!this.props.useBoxWrap) {
      return this.content();
    }

    return (
      <Box
        style={{
          margin: "7px",
          boxShadow:
            "0 .5em 1em -.125em rgba(10,10,10,.1),0 0 0 1px rgba(10,10,10,.1)",
        }}
      >
        {this.content()}
      </Box>
    );
  }
}
