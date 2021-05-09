import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Content,
  Heading,
  Block,
  Form,
  Button,
} from "react-bulma-components";

export default class CardLogin extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Block display="flex" justifyContent="center" alignItems="center">
            <Block
              renderAs="img"
              src={process.env.PUBLIC_URL + "/assets/adielson.png"}
              alt="Adielson icone"
              style={{
                borderRadius: "50%",
                width: "auto",
                height: "180px",
              }}
            ></Block>
          </Block>
          <Heading size={5} textAlign="center">
            Restaurante e pastelaria do Adielson
          </Heading>
          <Content>
            <Form.Field>
              <Form.Label>E-mail</Form.Label>
              <Form.Control>
                <Form.Input
                  type={"text"}
                  placeholder={"Insira seu endereço de e-mail"}
                ></Form.Input>
              </Form.Control>
            </Form.Field>

            <Form.Field>
              <Form.Label>Senha</Form.Label>
              <Form.Control>
                <Form.Input
                  type={"password"}
                  placeholder={"Insira sua senha"}
                ></Form.Input>
              </Form.Control>
            </Form.Field>

            <Block renderAs="p" textAlign="center">
              Não possui uma conta ainda?{" "}
              <Link className="register-link" to="/register">
                Registre-se
              </Link>
            </Block>

            <Form.Field className="field has-addons has-addons-centered">
              <Form.Control className="control">
                <Button color="success">Login</Button>
              </Form.Control>
            </Form.Field>
          </Content>
        </Card.Content>
      </Card>
    );
  }
}
