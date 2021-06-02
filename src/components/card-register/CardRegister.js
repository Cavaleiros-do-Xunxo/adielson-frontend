import React from "react";
import { Card, Content, Heading, Form, Button } from "react-bulma-components";

const CardRegister = (props) => {
  return (
    <Card>
      <Card.Content>
        <Heading size={5} textAlign="center">
          Cadastro
        </Heading>
        <Content>
          <Form.Field>
            <Form.Label>Nome</Form.Label>
            <Form.Control>
              <Form.Input
                type={"text"}
                placeholder={"Insira seu nome"}
              ></Form.Input>
            </Form.Control>
          </Form.Field>

          <Form.Field>
            <Form.Label>Telefone</Form.Label>
            <Form.Control>
              <Form.Input
                type={"text"}
                placeholder={"Insira seu número de telefone"}
              ></Form.Input>
            </Form.Control>
          </Form.Field>

          <Form.Field>
            <Form.Label>CPF</Form.Label>
            <Form.Control>
              <Form.Input
                type={"text"}
                placeholder={"Insira seu número de CPF"}
              ></Form.Input>
            </Form.Control>
          </Form.Field>

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
                placeholder={"Insira uma senha"}
              ></Form.Input>
            </Form.Control>
          </Form.Field>

          <Form.Field className="field has-addons has-addons-centered">
            <Form.Control className="control">
              <Button color="success">Cadastrar</Button>
            </Form.Control>
          </Form.Field>
        </Content>
      </Card.Content>
    </Card>
  );
};

export default CardRegister;
