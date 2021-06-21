import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Block, Box, Container, Heading } from "react-bulma-components";
import ListOrderItem from "../../components/list-order-item/ListOrderItem";
import Spinner from "../../components/spinner/Spinner";
import moment from "moment";

import "./MyOrder.css";
import { Link } from "react-router-dom";
import api from "../../services/api";

const MyOrders = (props) => {
  const [orders, setOrders] = useState([]);

  const buildList = () => {
    const _orders = [];

    for (const order of orders) {
      console.log(order.id);
      _orders.push(
        <Link key={order.id} to={`/myorder/${order.id}`}>
          <ListOrderItem {...order} className="list-order-item" />
        </Link>
      );
    }

    return _orders;
  };

  const fetchOrders = async () => {
    try {
      const response = await api.getMyOrders();

      const _orders = response.data.map((order, _) => {
        return {
          id: order.id,
          date: moment(order.orderTime).format("DD/MM/YYYY"),
          status: order.status,
          total: order.total,
          items: order.orderItems,
        };
      });

      setOrders(_orders);
    } catch (e) {
      console.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      fetchOrders();
    }

    return () => {
      isMounted = false;
    };
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
      {orders.length > 0 ? (
        buildList()
      ) : (
        <Block style={{ display: "flex", justifyContent: "center" }}>
          <Spinner />
        </Block>
      )}
    </Container>
  );
};

export default MyOrders;
