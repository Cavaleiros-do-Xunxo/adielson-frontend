import React from "react";
import { motion } from "framer-motion";
import { Modal, Button } from "react-bulma-components";
import ListItem from "../list-item/ListItem";

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
            <ListItem useBoxWrap={false} />
          </Modal.Card.Body>
          <Modal.Card.Footer justifyContent="center">
            <Button color="success">Finalizar pedido</Button>
          </Modal.Card.Footer>
        </Modal.Card>
      </Modal>
    );
  };
}
