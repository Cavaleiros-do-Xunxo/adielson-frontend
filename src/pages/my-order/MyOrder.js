import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import {
  Block,
  Box,
  Container,
  Content,
  Heading,
} from "react-bulma-components";
// import moment from "moment";
import uuid from "react-uuid";
import api from "../../services/api";
import Spinner from "../../components/spinner/Spinner";
import moment from "moment";

const config = {
  status: {
    WAITING: "Aguardando confirmação do pedido",
    PREPARING: "Em preparo",
    SENT: "Pedido enviado",
    FINISHED: "Pedido finalizado",
  },
};

const MyOrder = (props) => {
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const [orderResp, orderItemsResp] = await Promise.all([
          api.getOrder(id),
          api.getOrderItems(id),
        ]);

        if (isMounted) {
          setOrder(orderResp.data);
          setOrderItems(orderItemsResp.data);
        }
      } catch (e) {
        console.error("Failed to fetch order");
      }
    })();

    const interval = setInterval(async () => {
      try {
        const response = await api.getOrder(id);

        if (isMounted) {
          setOrder(response.data);
        }
      } catch (e) {
        console.error("Failed to fetch order");
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      isMounted = false;
    };
  }, [id, setOrder, setOrderItems]);

  const formatDate = (timestamp) => {
    return moment(timestamp).format("DD/MM/YYYY");
  };

  const getItems = () => {
    const items = [];

    for (const item of orderItems) {
      items.push(
        <ul key={uuid()}>
          <li>
            <strong>
              {item.count} {item.item.name}
            </strong>{" "}
            - {item.item.description}
          </li>
        </ul>
      );
    }

    return <Content>{items}</Content>;
  };

  const renderOrder = () => {
    if (order) {
      return (
        <Block>
          <Box>
            <Heading>Pedido do dia {formatDate(order.orderTime)}</Heading>
          </Box>
          <Box>
            <Heading subtitle size={4}>
              Status do pedido: <strong>{config.status[order.status]}</strong>
            </Heading>
            <hr />
            <Heading subtitle size={4}>
              Items do pedido
            </Heading>
            {orderItems.length > 0 ? (
              getItems()
            ) : (
              <Block style={{ display: "flex", justifyContent: "center" }}>
                <Spinner />
              </Block>
            )}
            <hr />
            <Heading subtitle size={4}>
              Valor total do pedido:{" "}
              <span style={{ color: "#48c774" }}>
                R${order.total.toPrecision(order.total.toString().length + 2)}
              </span>
            </Heading>
          </Box>
        </Block>
      );
    }

    return (
      <Block
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <Spinner />
      </Block>
    );
  };

  return (
    <Container
      renderAs={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {renderOrder()}
    </Container>
  );
};

export default MyOrder;
