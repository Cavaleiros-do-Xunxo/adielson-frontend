import React from "react";
import Cards from "react-credit-cards";
import { motion } from "framer-motion";
import {
  Block,
  Button,
  Container,
  Columns,
  Heading,
  Form,
  Icon,
} from "react-bulma-components";

import "react-credit-cards/es/styles-compiled.css";
import ListItem from "../../components/list-item/ListItem";

const config = {
  steps: {
    CONFIRM_ITEMS: {
      id: "CONFIRM_ITEMS",
      title: "Confirme os itens do pedido",
    },
    PAYMENT_AND_DELIVERY: {
      id: "PAYMENT_AND_DELIVERY",
      title: "Método pagamento e forma de envio",
    },
  },
};

const deliveryMethods = {
  DELIVERY: "DELIVERY",
  WITHDRAW_IN_PLACE: "WITHDRAW_IN_PLACE",
};

const paymentMethods = {
  IN_APP: "IN_APP",
  ON_DELIVERY: "ON_DELIVERY",
};

export default class Order extends React.Component {
  state = {
    currentStep: config.steps.CONFIRM_ITEMS,
    initialOpacity: 0,
    endOpacity: 1,
    deliveryMethod: deliveryMethods.DELIVERY,
    address: "",
    addressNumber: null,
    complement: "",
    method: paymentMethods.IN_APP,
    cvc: "",
    expiry: "",
    focused: "",
    name: "",
    number: "",
  };

  updateCurrentStep = (step) => {
    this.setState({ initialOpacity: 1, endOpacity: 0 });

    setTimeout(() => {
      this.setState({ initialOpacity: 0, endOpacity: 1, currentStep: step });
    }, 200);
  };

  handleInputFocus = (e) => {
    this.setState({ focused: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  getDeliveryForm = () => {
    if (!this.state.deliveryMethod === deliveryMethods.DELIVERY) {
      return;
    }

    return (
      <Block>
        <Columns>
          <Columns.Column>
            <Form.Field>
              <Form.Label>Endereço de entrega</Form.Label>
              <Form.Control>
                <Form.Input
                  placeholder="Insira o endereço de entrega"
                  onChange={(e) => this.setState({ address: e.target.value })}
                />
                <Icon align="left" size="small">
                  <i className="fas fa-map-marker-alt"></i>
                </Icon>
              </Form.Control>
            </Form.Field>
          </Columns.Column>
          <Columns.Column size="one-quarter">
            <Form.Field>
              <Form.Label>Número</Form.Label>
              <Form.Control>
                <Form.Input
                  placeholder="Insira o número da casa ou apto"
                  onChange={(e) =>
                    this.setState({ addressNumber: e.target.value })
                  }
                />
              </Form.Control>
            </Form.Field>
          </Columns.Column>
        </Columns>
        <Form.Field>
          <Form.Label>Complemento</Form.Label>
          <Form.Control>
            <Form.Input
              placeholder="Ex.: casa, apto, próximo à ..."
              onChange={(e) => this.setState({ complement: e.target.value })}
            />
            <Icon align="left" size="small">
              <i className="fas fa-info"></i>
            </Icon>
          </Form.Control>
        </Form.Field>
      </Block>
    );
  };

  render() {
    let content = null;

    if (this.state.currentStep.id === config.steps.CONFIRM_ITEMS.id) {
      content = (
        <Block>
          <ListItem useBoxWrap={true} />
          <ListItem useBoxWrap={true} />
          <ListItem useBoxWrap={true} />
          <hr />
          <Block display="flex" justifyContent="center">
            <Button
              color="success"
              onClick={() => {
                this.updateCurrentStep(config.steps.PAYMENT_AND_DELIVERY);
              }}
            >
              <i className="fas fa-check"></i>
              <span style={{ marginLeft: "5px" }}>Confirmar</span>
            </Button>
          </Block>
        </Block>
      );
    }

    if (this.state.currentStep.id === config.steps.PAYMENT_AND_DELIVERY.id) {
      content = (
        <Block>
          <Form.Field>
            <Form.Label>Forma de entrega</Form.Label>
            <Form.Control>
              <Form.Radio
                value={deliveryMethods.DELIVERY}
                name="delivery-method"
                checked={this.state.deliveryMethod === deliveryMethods.DELIVERY}
                onChange={(e) => {
                  return this.setState({
                    deliveryMethod: e.target.value,
                  });
                }}
              >
                Entrega
              </Form.Radio>
              <Form.Radio
                value={deliveryMethods.WITHDRAW_IN_PLACE}
                name="delivery-method"
                checked={
                  this.state.deliveryMethod ===
                  deliveryMethods.WITHDRAW_IN_PLACE
                }
                onChange={(e) => {
                  this.setState({
                    deliveryMethod: e.target.value,
                  });
                }}
              >
                Retirada no balcão
              </Form.Radio>
            </Form.Control>
          </Form.Field>
          <hr />
          {this.getDeliveryForm()}
          <Form.Field>
            <Form.Label>Forma de pagamento</Form.Label>
            <Form.Control>
              <Form.Radio
                value={paymentMethods.IN_APP}
                name="payment-method"
                checked={this.state.method === paymentMethods.IN_APP}
                onChange={(e) => {
                  this.setState({
                    method: e.target.value,
                  });
                }}
              >
                Pagamento no site pelo cartão de crédito
              </Form.Radio>
              <Form.Radio
                value={paymentMethods.ON_DELIVERY}
                name="payment-method"
                checked={this.state.method === paymentMethods.ON_DELIVERY}
                onChange={(e) => {
                  return this.setState({
                    method: e.target.value,
                  });
                }}
              >
                Pagamento na hora
              </Form.Radio>
            </Form.Control>
          </Form.Field>
          <hr />
          <Columns>
            <Columns.Column>
              <Form.Field>
                <Form.Label>Dados do cartão</Form.Label>
                <Form.Field>
                  <Form.Control>
                    <Form.Input
                      type="tel"
                      name="number"
                      placeholder="Número do cartão"
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Field>
                  <Form.Control>
                    <Form.Input
                      placeholder="Nome"
                      type="text"
                      name="name"
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                    />
                  </Form.Control>
                </Form.Field>
              </Form.Field>
              <Columns>
                <Columns.Column>
                  <Form.Field>
                    <Form.Control>
                      <Form.Input
                        placeholder="Data de expiração"
                        type="tel"
                        name="expiry"
                        pattern="\d\d/\d\d"
                        required
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                      />
                    </Form.Control>
                  </Form.Field>
                </Columns.Column>
                <Columns.Column>
                  <Form.Field>
                    <Form.Control>
                      <Form.Input
                        placeholder="CVC"
                        type="tel"
                        name="cvc"
                        pattern="\d{3,4}"
                        required
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                      />
                    </Form.Control>
                  </Form.Field>
                </Columns.Column>
              </Columns>
            </Columns.Column>
            <Columns.Column>
              <Cards
                cvc={this.state.cvc}
                expiry={this.state.expiry}
                focused={this.state.focused}
                name={this.state.name}
                number={this.state.number}
              />
            </Columns.Column>
          </Columns>
          <hr />
          <Block display="flex" justifyContent="center">
            <Button
              color="danger"
              onClick={() => {
                this.updateCurrentStep(config.steps.CONFIRM_ITEMS);
              }}
            >
              <i className="fas fa-chevron-left"></i>
              <span style={{ marginLeft: "5px" }}>Rever itens do pedido</span>
            </Button>
            <Button
              color="success"
              style={{ marginLeft: "5px" }}
              onClick={() => {
                console.log("successo");
              }}
            >
              <i className="fas fa-check"></i>
              <span style={{ marginLeft: "5px" }}>Realizar pedido</span>
            </Button>
          </Block>
        </Block>
      );
    }

    return (
      <Container
        renderAs={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Block
          renderAs={motion.div}
          initial={{ opacity: this.state.initialOpacity }}
          animate={{
            opacity: this.state.endOpacity,
          }}
        >
          <Heading size={3} style={{ marginTop: "10px" }}>
            {config.steps[this.state.currentStep.id].title}
          </Heading>
          <hr />
          {content}
        </Block>
      </Container>
    );
  }
}
