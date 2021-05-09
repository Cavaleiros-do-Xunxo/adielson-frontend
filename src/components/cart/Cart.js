import React from "react";
import { motion } from "framer-motion";
import {
  Modal,
  Media,
  Image,
  Content,
  Button,
  Form,
} from "react-bulma-components";

export default class Cart extends React.Component {
  render = () => {
    return (
      <Modal
        onClose={() => {
          this.props.showCb(false);
        }}
        show={this.props.show}
      >
        <Modal.Card
          renderAs={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Modal.Card.Header>
            <Modal.Card.Title>Carrinho</Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body>
            <Media>
              <Media.Item align="left" renderAs="figure">
                <Image
                  alt="64x64"
                  size={64}
                  src="http://bulma.io/images/placeholders/128x128.png"
                />
              </Media.Item>
              <Media.Item>
                <Content>
                  <p>
                    <strong>Marmita</strong>
                    <br />
                    Arroz, feijão, frango empanado.
                  </p>
                </Content>
              </Media.Item>
              <Media.Item align="right">
                <Form.Control
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    color="ghost"
                    style={{ color: "black", marginRight: "-10px" }}
                  >
                    <i className="fas fa-minus"></i>
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
                    style={{ color: "black", marginLeft: "-10px" }}
                  >
                    <i className="fas fa-plus"></i>
                  </Button>
                </Form.Control>
              </Media.Item>
            </Media>
          </Modal.Card.Body>
          <Modal.Card.Footer justifyContent="center">
            <Button color="success">Finalizar pedido</Button>
          </Modal.Card.Footer>
        </Modal.Card>
      </Modal>
    );
  };
}
