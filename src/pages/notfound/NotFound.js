import React from "react";

import { Container, Heading } from "react-bulma-components";

export default class NotFound extends React.Component {
  render() {
    return (
      <Container textAlign="center" style={{ marginTop: "100px" }}>
        <Heading size={1}>
          Opa! A página que você tentou acessar não existe. 😔
        </Heading>
      </Container>
    );
  }
}
