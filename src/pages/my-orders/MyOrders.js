import React from "react";
import { motion } from "framer-motion";
import { Block } from "react-bulma-components";

export default class MyOrders extends React.Component {
  render() {
    return (
      <Block
        renderAs={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        My Orders Page
      </Block>
    );
  }
}
