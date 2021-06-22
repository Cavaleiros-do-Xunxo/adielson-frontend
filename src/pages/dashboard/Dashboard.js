import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Block,
  Columns,
  Container,
  Content,
  Heading,
  Box,
  Tag,
  Button,
} from "react-bulma-components";

import "./Dashboard.css";
import CardOrder from "../../components/card-order/CardOrder";
import api from "../../services/api";
import moment from "moment";
import Spinner from "../../components/spinner/Spinner";
import uuid from "react-uuid";

const config = {
  colors: {
    WAITING: "danger",
    PREPARING: "warning",
    SENT: "warning",
    FINISHED: "success",
  },
  status: {
    WAITING: "Pendente",
    PREPARING: "Em preparo",
    SENT: "Enviado",
    FINISHED: "Concluido",
  },
};

const Dashboard = (props) => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isLoadingOrderItems, setIsLoadingOrderItems] = useState(false);

  const fetchOrders = async (isMounted = true) => {
    try {
      if (isMounted) {
        setIsLoadingOrders(true);
      }

      const response = await api.getMyOrders();

      if (isMounted) {
        setIsLoadingOrders(false);
      }

      const _orders = response.data.map((order, _) => {
        return {
          id: order.id,
          user: order.user,
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
        setIsLoadingOrders(false);
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

  const renderOrders = () => {
    const _orders = [];

    for (const order of orders) {
      _orders.push(
        <Block
          key={uuid()}
          onClick={() => {
            setOrder(order);
            fetchOrderItemsOfId(order.id);
          }}
        >
          <CardOrder
            className="card-order-margin-bottom"
            customerName={order.user.name}
            orderStatus={config.status[order.status]}
            statusColor={config.colors[order.status]}
            orderCreatedDate={order.date}
          />
        </Block>
      );
    }

    return _orders;
  };

  const fetchOrderItemsOfId = async (id) => {
    try {
      setIsLoadingOrderItems(true);

      const response = await api.getOrderItems(id);

      setIsLoadingOrderItems(false);

      setOrderItems(response.data);
    } catch (e) {
      setIsLoadingOrderItems(false);
    }
  };

  const showOrderItemsDetails = () => {};

  const showOrderDetails = () => {
    if (!order) {
      return (
        <Block
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "15px",
          }}
        >
          <Heading size={4}>Nenhum pedido foi selecionado</Heading>
        </Block>
      );
    }

    return (
      <Block>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Heading size={3} style={{ marginBottom: "0px" }}>
            Pedido realizado às 13:01
          </Heading>
          <Tag color="danger" size="large">
            Pendente
          </Tag>
        </Box>
        <Box>
          <Heading size={5}>Dados do cliente</Heading>
          <p>
            <strong>Nome:</strong> Tiago José Valdrich
          </p>
          <p>
            <strong>Telefone: </strong>47 999998888
          </p>
        </Box>
        <Box>
          <Heading size={5}>Dados do pagamento</Heading>
          <p>Pagamento realizado pelo site</p>
          <p>
            <strong>Total: </strong> R$100,00
          </p>
        </Box>
        <Box>
          <Heading size={5}>Endereço de entrega</Heading>
          <p>
            <strong>Rua: </strong>Avenida das batatas
          </p>
          <p>
            <strong>Número: </strong> 666
          </p>
          <p>
            <strong>Complemento: </strong> Residência aos fundos
          </p>
        </Box>
        <Box>
          <Heading size={5}>Itens do pedido</Heading>
          <Content>
            <ul>
              <li>1 Pastél de carne</li>
              <li>5 Pastéis de calabresa</li>
              <li>1 Coca 1,5L</li>
              <li>1 Porção de batata frita</li>
            </ul>
          </Content>
          <p>
            <strong>Valor total: </strong> R$100,00
          </p>
        </Box>
        <Block style={{ display: "flex", justifyContent: "center" }}>
          <Button color="danger" style={{ marginRight: "5px" }}>
            Recusar pedido
          </Button>
          <Button color="success">Confirmar pedido</Button>
        </Block>
      </Block>
    );
  };

  return (
    <Container
      style={{
        height: `calc(100vh - ${props.headerHeight}px)`,
        paddingLeft: "0px",
        paddingRight: "0px",
      }}
      breakpoint="fluid"
      renderAs={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Columns style={{ maxHeight: `calc(100vh - ${props.headerHeight}px)` }}>
        <Columns.Column
          size="one-third"
          style={{
            maxHeight: `calc(100vh - ${props.headerHeight}px)`,
          }}
        >
          <Box
            style={{
              minHeight: `calc(100vh - ${props.headerHeight}px)`,
              maxHeight: `calc(100vh - ${props.headerHeight}px)`,
              overflowY: orders.length > 0 ? "scroll" : "hidden",
              overflowX: "hidden",
            }}
          >
            <Heading size={3}>Pedidos em aberto</Heading>
            {!isLoadingOrders ? (
              renderOrders()
            ) : (
              <Block style={{ display: "flex", justifyContent: "center" }}>
                <Spinner />
              </Block>
            )}
            {!isLoadingOrders && orders.length === 0 ? (
              <Heading size={4}>Nenhum pedido foi encontrado!</Heading>
            ) : (
              ""
            )}
          </Box>
        </Columns.Column>
        <Columns.Column>{showOrderDetails()}</Columns.Column>
      </Columns>
    </Container>
  );
};

export default Dashboard;
