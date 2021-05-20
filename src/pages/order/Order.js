import React from "react";
import { motion } from "framer-motion";
import {
  Block,
  Button,
  Container,
  Heading,
  Form,
} from "react-bulma-components";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "../../utils";
import ListItem from "../../components/list-item/ListItem";
import AddressForm from "../../components/address-form/AddressForm";
import PaymentForm from "../../components/payment-form/PaymentForm";

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
    initialOpacity: 0,
    endOpacity: 1,
    currentStep: config.steps.CONFIRM_ITEMS,
    deliveryMethod: deliveryMethods.DELIVERY,
    paymentMethod: paymentMethods.IN_APP,
    location: {
      address: "",
      number: "",
      complement: "",
    },
    focused: "",
    payment: {
      cvc: "",
      expiry: "",
      name: "",
      number: "",
    },
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

  handlePaymentInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({
      payment: { ...this.state.payment, [target.name]: target.value },
    });
  };

  handleAddressInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ location: { ...this.state.location, [name]: value } });
  };

  getDeliveryForm = () => {
    if (this.state.deliveryMethod === deliveryMethods.DELIVERY) {
      return (
        <Block>
          <AddressForm handleInputChange={this.handleAddressInputChange} />
          <hr />
        </Block>
      );
    }
  };

  getPaymentForm = () => {
    if (this.state.paymentMethod === paymentMethods.IN_APP) {
      return (
        <Block>
          <PaymentForm
            cvc={this.state.payment.cvc}
            expiry={this.state.payment.expiry}
            name={this.state.payment.name}
            number={this.state.payment.number}
            focused={this.state.focused}
            handlePaymentInputChange={this.handlePaymentInputChange}
            handleInputFocus={this.handleInputFocus}
          />
          <hr />
        </Block>
      );
    }
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
                name="deliveryMethod"
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
                name="deliveryMethod"
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
                name="paymentMethod"
                checked={this.state.paymentMethod === paymentMethods.IN_APP}
                onChange={(e) => {
                  this.setState({
                    paymentMethod: e.target.value,
                  });
                }}
              >
                Pagamento no site pelo cartão de crédito
              </Form.Radio>
              <Form.Radio
                value={paymentMethods.ON_DELIVERY}
                name="paymentMethod"
                checked={
                  this.state.paymentMethod === paymentMethods.ON_DELIVERY
                }
                onChange={(e) => {
                  return this.setState({
                    paymentMethod: e.target.value,
                  });
                }}
              >
                Pagamento na hora
              </Form.Radio>
            </Form.Control>
          </Form.Field>
          <hr />
          {this.getPaymentForm()}
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
                console.log("Form", this.state);
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
