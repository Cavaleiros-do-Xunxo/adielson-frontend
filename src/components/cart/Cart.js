import React from "react";
import { motion } from "framer-motion";
import { Modal } from "react-bulma-components";
import ListItem from "../list-item/ListItem";
import { Link } from "react-router-dom";

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
            <Link
              className="button is-success"
              to="/order"
              onClick={() => {
                this.props.showCb(false);
              }}
            >
              Finalizar pedido
            </Link>
          </Modal.Card.Footer>
        </Modal.Card>
      </Modal>
    );
  };
}
