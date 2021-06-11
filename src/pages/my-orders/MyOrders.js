import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Box, Container, Heading } from "react-bulma-components";
import ListOrderItem from "../../components/list-order-item/ListOrderItem";

import "./MyOrder.css";
import { Link } from "react-router-dom";

const MyOrders = (props) => {
  const [orders, setOrders] = useState([]);

  const buildList = () => {
    const _orders = [];

    for (const order in orders) {
      _orders.push(
        <Link key={order.id} to={`/myorder/${order.id}`}>
          <ListOrderItem className="list-order-item" />
        </Link>
      );
    }

    return _orders;
  };

  useEffect(() => {
    setOrders([
      {
        id: 1,
        date: "2021-06-01",
        status: "",
        items: [{ title: "Marmita", description: "ARROZ, FEIJÃO E BATATA" }],
        total: 100.0,
      },
    ]);
  }, []);

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
      {buildList()}
    </Container>
  );
};

export default MyOrders;
