import React from "react";
import {
  Block,
  Card,
  Content,
  Heading,
  Form,
  Button,
} from "react-bulma-components";

const config = {
  translateMessages: {
    "CPF is taken": "CPF já está cadastrado!",
    "Missing required fields": "Os campos obrigatórios não foram preenchidos!",
    "Email is taken": "O endereço de e-mail informado já foi cadastrado!",
  },
};

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
                name="name"
                type={"text"}
                placeholder={"Insira seu nome"}
                onChange={(e) => {
                  props.handleRegisterInputs(e);
                }}
              ></Form.Input>
            </Form.Control>
          </Form.Field>

          <Form.Field>
            <Form.Label>Telefone</Form.Label>
            <Form.Control>
              <Form.Input
                name="phone"
                type={"text"}
                placeholder={"Insira seu número de telefone"}
                onChange={(e) => {
                  props.handleRegisterInputs(e);
                }}
              ></Form.Input>
            </Form.Control>
          </Form.Field>

          <Form.Field>
            <Form.Label>CPF</Form.Label>
            <Form.Control>
              <Form.Input
                name="cpf"
                type={"text"}
                placeholder={"Insira seu número de CPF"}
                onChange={(e) => {
                  props.handleRegisterInputs(e);
                }}
              ></Form.Input>
            </Form.Control>
          </Form.Field>

          <Form.Field>
            <Form.Label>E-mail</Form.Label>
            <Form.Control>
              <Form.Input
                name="email"
                type={"text"}
                placeholder={"Insira seu endereço de e-mail"}
                onChange={(e) => {
                  props.handleRegisterInputs(e);
                }}
              ></Form.Input>
            </Form.Control>
          </Form.Field>

          <Form.Field>
            <Form.Label>Senha</Form.Label>
            <Form.Control>
              <Form.Input
                name="password"
                type={"password"}
                placeholder={"Insira uma senha"}
                onChange={(e) => {
                  props.handleRegisterInputs(e);
                }}
              ></Form.Input>
            </Form.Control>
          </Form.Field>

          <Block
            renderAs="p"
            textAlign="center"
            style={
              props.error !== ""
                ? { color: "#EA1D2C" }
                : { display: "none", color: "#EA1D2C" }
            }
          >
            {config.translateMessages[props.error]}
          </Block>

          <Form.Field className="field has-addons has-addons-centered">
            <Form.Control className="control">
              <Button
                color="success"
                disabled={props.isSubmiting}
                onClick={() => {
                  props.onSubmit();
                }}
              >
                Cadastrar
              </Button>
            </Form.Control>
          </Form.Field>
        </Content>
      </Card.Content>
    </Card>
  );
};

export default CardRegister;
