import React from "react";
import { motion } from "framer-motion";
import { Block } from "react-bulma-components";

export default class Order extends React.Component {
  render() {
    return (
      <Block
        renderAs={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        This is Order component!
      </Block>
    );
  }
}
