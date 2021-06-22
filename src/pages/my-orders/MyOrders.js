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
  const [isLoading, setIsLoading] = useState(false);

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

  const fetchOrders = async (isMounted = true) => {
    try {
      if (isMounted) {
        setIsLoading(true);
      }

      const response = await api.getMyOrders();

      if (isMounted) {
        setIsLoading(false);
      }

      const _orders = response.data.map((order, _) => {
        return {
          id: order.id,
          date: moment(order.orderTime).format("DD/MM/YYYY"),
          status: order.status,
          total: order.total,
        };
      });

      if (isMounted) {
        setOrders(_orders);
      }
    } catch (e) {
      if (isMounted) {
        setIsLoading(false);
      }
      console.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    let isMounted = true;

    fetchOrders(isMounted);

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
      {!isLoading ? (
        buildList()
      ) : (
        <Block style={{ display: "flex", justifyContent: "center" }}>
          <Spinner />
        </Block>
      )}
      {!isLoading && orders.length === 0 ? (
        <Block style={{ display: "flex", justifyContent: "center" }}>
          <Heading>Não há nenhum pedido para ser mostrado</Heading>
        </Block>
      ) : (
        ""
      )}
    </Container>
  );
};

export default MyOrders;
