import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Block, Modal } from "react-bulma-components";
import ListItem from "../list-item/ListItem";
import { Link } from "react-router-dom";

import CartManager from "../../services/cart";
import { SessionContext } from "../../services/sessionProvider";

const Cart = (props) => {
  const { cartItems, setCartItems } = useContext(SessionContext);

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

  const buildCartList = () => {
    const items = [];

    for (const item of cartItems) {
      items.push(
        <ListItem
          key={item.id}
          {...item}
          addItem={addItemToCart}
          removeItem={removeItemFromCart}
          useBoxWrap={false}
        />
      );
    }

    if (items.length === 0) {
      return (
        <Block textAlign="center">
          Nenhum item foi adicionado ao carrinho ainda 😢
        </Block>
      );
    }

    return items;
  };

  return (
    <Modal
      onClose={() => {
        props.showCb(false);
      }}
      show={props.show}
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
        <Modal.Card.Body>{buildCartList()}</Modal.Card.Body>
        <Modal.Card.Footer justifyContent="center">
          <Link
            className="button is-success"
            to="/order"
            onClick={() => {
              props.showCb(false);
            }}
          >
            Finalizar pedido
          </Link>
        </Modal.Card.Footer>
      </Modal.Card>
    </Modal>
  );
};

export default Cart;
