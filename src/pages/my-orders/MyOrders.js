import React from "react";
import { motion } from "framer-motion";
import { Box, Container, Heading } from "react-bulma-components";
import ListOrderItem from "../../components/list-order-item/ListOrderItem";

import "./MyOrder.css";

const MyOrders = (props) => {
  return (
    <Container
      renderAs={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box>
        <Heading>Meus pedidos</Heading>
      </Box>
      <ListOrderItem className="list-order-item" />
      <ListOrderItem className="list-order-item" />
      <ListOrderItem className="list-order-item" />
      <ListOrderItem className="list-order-item" />
    </Container>
  );
};

export default MyOrders;
