import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import {
  Block,
  Button,
  Container,
  Heading,
  Form,
  Notification,
  Content,
} from "react-bulma-components";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "../../utils";

import ListItem from "../../components/list-item/ListItem";
import AddressForm from "../../components/address-form/AddressForm";
import PaymentForm from "../../components/payment-form/PaymentForm";
import SuccessOverlay from "../../components/success-overlay/SuccessOverlay";

import { SessionContext } from "../../services/sessionProvider";
import CartManager from "../../services/cart";
import api from "../../services/api";

const config = {
  steps: {
    CONFIRM_ITEMS: {
      id: "CONFIRM_ITEMS",
      title: "Confirme os itens do pedido",
    },
    PAYMENT_AND_DELIVERY: {
      id: "PAYMENT_AND_DELIVERY",
      title: "Método de pagamento e forma de envio",
    },
  },
  deliveryMethods: {
    DELIVERY: "DELIVERY",
    WITHDRAW_IN_PLACE: "WITHDRAW_IN_PLACE",
  },
  paymentMethods: {
    IN_APP: "IN_APP",
    ON_DELIVERY: "ON_DELIVERY",
  },
  requiredLocationProps: [
    {
      propName: "address",
      fieldName: "Endereço",
    },
    {
      propName: "number",
      fieldName: "Número do endereço",
    },
  ],
  requiredPaymentProps: [
    {
      propName: "cvc",
      fieldName: "CVC",
    },
    {
      propName: "number",
      fieldName: "Número do cartão",
    },
    {
      propName: "expiry",
      fieldName: "Data de expiração do cartão",
    },
    {
      propName: "name",
      fieldName: "Nome no cartão",
    },
  ],
};

const Order = (props) => {
  const [opacity, setOpacity] = useState({ initial: 0, end: 1 });
  const [currentStep, setCurrentStep] = useState(config.steps.CONFIRM_ITEMS);
  const [deliveryMethod, setDeliveryMethod] = useState(
    config.deliveryMethods.DELIVERY
  );
  const [paymentMethod, setPaymentMethod] = useState(
    config.paymentMethods.IN_APP
  );
  const [location, setLocation] = useState({
    address: "",
    number: "",
    complement: "",
  });
  const [focused, setFocused] = useState("");
  const [payment, setPayment] = useState({
    cvc: "",
    expiry: "",
    name: "",
    number: "",
  });
  const [formIssues, setFormIssues] = useState([]);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const { cartItems, setCartItems } = useContext(SessionContext);

  const updateCurrentStep = (step) => {
    setOpacity({ initial: 1, end: 0 });

    setTimeout(() => {
      setOpacity({ initial: 0, end: 1 });
      setCurrentStep(step);
    }, 200);
  };

  const handleInputFocus = (e) => {
    setFocused(e.target.name);
  };

  const handlePaymentInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    setPayment({ ...payment, [target.name]: target.value });
  };

  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;

    setLocation({ ...location, [name]: value });
  };

  const getDeliveryForm = () => {
    if (deliveryMethod === config.deliveryMethods.DELIVERY) {
      return (
        <Block>
          <AddressForm handleInputChange={handleAddressInputChange} />
          <hr />
        </Block>
      );
    }
  };

  const validateForm = () => {
    const _formIssues = [];

    if (deliveryMethod === config.deliveryMethods.DELIVERY) {
      for (const field of config.requiredLocationProps) {
        if (!location[field.propName]) {
          _formIssues.push(field);
        }
      }
    }

    if (paymentMethod === config.paymentMethods.IN_APP) {
      for (const field of config.requiredPaymentProps) {
        if (!payment[field.propName]) {
          _formIssues.push(field);
        }
      }
    }

    return _formIssues;
  };

  const submitForm = async () => {
    const issues = validateForm();

    if (issues.length > 0) {
      setFormIssues(issues);
      return;
    }

    const items = cartItems.map((_item, _) => {
      return {
        item: _item.id,
        count: _item.count,
      };
    });

    await api.createOrder({
      delivery: deliveryMethod,
      paymentMethod: paymentMethod,
      items: items,
      address: {
        address: location.address + ", " + location.number,
        complement: location.complement,
      },
    });
    setShowSuccessOverlay(true);
    CartManager.clear();
    setCartItems([]);

    setTimeout(() => {
      props.history.push("/myorders");
    }, 2000);
  };

  const buildFormIssuesList = () => {
    const fieldsToRender = [];
    let i = 0;

    for (const field of formIssues) {
      fieldsToRender.push(<li key={i}>{field.fieldName}</li>);
      i++;
    }

    return fieldsToRender;
  };

  const getRequiredFieldsAlert = () => {
    if (formIssues.length <= 0) {
      return;
    }

    let message =
      "Atenção os seguintes campos são requeridos e ainda não foram preenchidos: ";

    return (
      <Notification color="danger">
        <p>{message}</p>
        <Content>
          <ul>{buildFormIssuesList()}</ul>
        </Content>
      </Notification>
    );
  };

  const getPaymentForm = () => {
    if (paymentMethod === config.paymentMethods.IN_APP) {
      return (
        <Block>
          <PaymentForm
            cvc={payment.cvc}
            expiry={payment.expiry}
            name={payment.name}
            number={payment.number}
            focused={focused}
            handlePaymentInputChange={handlePaymentInputChange}
            handleInputFocus={handleInputFocus}
          />
          <hr />
        </Block>
      );
    }
  };

  const getSuccessOverlay = () => {
    if (showSuccessOverlay) {
      return <SuccessOverlay text="Pedido realizado com sucesso!" />;
    }
  };

  const buildCartList = () => {
    const items = [];

    for (const item of cartItems) {
      items.push(
        <ListItem
          key={item.id}
          {...item}
          addItem={addItemToCart}
          removeItem={removeItemFromCart}
          useBoxWrap={true}
        />
      );
    }

    return items;
  };

  const addItemToCart = (menuItem) => {
    CartManager.addItem(menuItem, (items) => {
      setCartItems(items);
    });
  };

  const removeItemFromCart = (id) => {
    CartManager.removeItem(id, (items) => {
      setCartItems(items);
    });
  };

  let content = null;

  if (currentStep.id === config.steps.CONFIRM_ITEMS.id) {
    content = (
      <Block>
        {buildCartList()}
        <hr />
        <Block display="flex" justifyContent="center">
          <Button
            color="success"
            onClick={() => {
              updateCurrentStep(config.steps.PAYMENT_AND_DELIVERY);
            }}
          >
            <i className="fas fa-check"></i>
            <span style={{ marginLeft: "5px" }}>Confirmar</span>
          </Button>
        </Block>
      </Block>
    );
  }

  if (currentStep.id === config.steps.PAYMENT_AND_DELIVERY.id) {
    content = (
      <Block>
        <Form.Field>
          <Form.Label>Forma de entrega</Form.Label>
          <Form.Control>
            <Form.Radio
              value={config.deliveryMethods.DELIVERY}
              name="deliveryMethod"
              checked={deliveryMethod === config.deliveryMethods.DELIVERY}
              onChange={(e) => {
                setDeliveryMethod(e.target.value);
              }}
            >
              Entrega
            </Form.Radio>
            <Form.Radio
              value={config.deliveryMethods.WITHDRAW_IN_PLACE}
              name="deliveryMethod"
              checked={
                deliveryMethod === config.deliveryMethods.WITHDRAW_IN_PLACE
              }
              onChange={(e) => {
                setDeliveryMethod(e.target.value);
              }}
            >
              Retirada no balcão
            </Form.Radio>
          </Form.Control>
        </Form.Field>
        <hr />
        {getDeliveryForm()}
        <Form.Field>
          <Form.Label>Forma de pagamento</Form.Label>
          <Form.Control>
            <Form.Radio
              value={config.paymentMethods.IN_APP}
              name="paymentMethod"
              checked={paymentMethod === config.paymentMethods.IN_APP}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
            >
              Pagamento no site pelo cartão de crédito
            </Form.Radio>
            <Form.Radio
              value={config.paymentMethods.ON_DELIVERY}
              name="paymentMethod"
              checked={paymentMethod === config.paymentMethods.ON_DELIVERY}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
            >
              Pagamento na hora
            </Form.Radio>
          </Form.Control>
        </Form.Field>
        <hr />
        {getPaymentForm()}
        <Block display="flex" justifyContent="center">
          {getRequiredFieldsAlert()}
        </Block>
        <Block
          display="flex"
          justifyContent="center"
          style={{ marginBottom: "10px" }}
        >
          <Button
            color="danger"
            onClick={() => {
              updateCurrentStep(config.steps.CONFIRM_ITEMS);
            }}
          >
            <i className="fas fa-chevron-left"></i>
            <span style={{ marginLeft: "5px" }}>Rever itens do pedido</span>
          </Button>
          <Button
            color="success"
            style={{ marginLeft: "5px" }}
            onClick={() => {
              submitForm();
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
        initial={{ opacity: opacity.initial }}
        animate={{
          opacity: opacity.end,
        }}
        style={{ margin: "5px" }}
      >
        <Heading size={3} style={{ marginTop: "10px" }}>
          {config.steps[currentStep.id].title}
        </Heading>
        <hr />
        {content}
      </Block>
      {getSuccessOverlay()}
    </Container>
  );
};

export default Order;
