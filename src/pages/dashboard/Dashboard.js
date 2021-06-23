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
  statusButton: {
    WAITING: "Confirmar pedido em preparo",
    PREPARING: "Confirmar envio do pedido",
    SENT: "Concluir pedido",
  }
};

const Dashboard = (props) => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isLoadingOrderItems, setIsLoadingOrderItems] = useState(false);
  const [isUpdateStatusBlocked, setIsUpdateStatusBlocked] = useState(false);

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
          ...order,
          date: moment(order.orderTime).format("DD/MM/YYYY HH:MM"),
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

  const getPaymentMethodText = () => {
    if (order && order.payMethod === "IN_APP") {
      return "Pagamento realizado pelo site";
    }

    if (order && order.payMethod === "ON_DELIVERY") {
      if (order.address.address === null) {
        return "Pagamento a ser realizado no balcão";
      } else {
        return "Pagamento a ser realizado pro entregador";
      }
    }
  };

  const getDeliveryAddress = () => {
    if (order && order.delivery === "LOCAL") {
      return <Box><Heading size={5}>Pedido será retirado no balcão</Heading></Box>
    }

    if (order && order.delivery === "DELIVERY") {
      return (
        <Box>
          <Heading size={5}>Endereço de entrega</Heading>
          <p>
            <strong>Endereço: </strong>{order.address.address}
          </p>
          <p>
            <strong>Complemento: </strong> {order.address.complement}
          </p>
        </Box>
      );
    }
  };

  const getOrderItems = () => {
    if (isLoadingOrderItems) {
      return (
        <Box style={{display: "flex", justifyContent: "center"}}>
          <Spinner />
        </Box>
      )
    }

    const _items = [];

    for (const item of orderItems) {
      _items.push(
        <li key={item.id}><strong>{item.count} {item.item.name}</strong> - {item.item.description}</li>
      )
    }

    return (
      <Box>
        <Heading size={5}>Itens do pedido</Heading>
        <Content>
          <ul>
            {_items}
          </ul>
        </Content>
      </Box>
    )
  };

  const handleNextStatus = async () => {
    try {
      let nextStatus = null;

      if (order.status === "WAITING") {
        nextStatus = "PREPARING";
      } else if (order.status === "PREPARING") {
        nextStatus = "SENT";
      } else if (order.status === "SENT") {
        nextStatus = "FINISHED";
      }

      if (nextStatus) {
        try {
          setIsUpdateStatusBlocked(true);
          await api.updateOrder(order.id, {status: nextStatus});
          setIsUpdateStatusBlocked(false);
        } catch (e) {
          setIsUpdateStatusBlocked(false);
          console.error("Failed to update order");
        }
        setOrder({...order, status: nextStatus});

        const _orders = orders.map((item, _) => {
          if (order.id === item.id) {
            item.status = nextStatus;
          }
          
          return item;
        });

        setOrders(_orders);
      }

    } catch (e) {
      console.error("Failed to update order status");
    }
  };

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
            Pedido realizado em {order.date}
          </Heading>
          <Tag color={config.colors[order.status]} size="large">
            {config.status[order.status]}
          </Tag>
        </Box>
        <Box>
          <Heading size={5}>Dados do cliente</Heading>
          <p>
            <strong>Nome:</strong> {order.user.name}
          </p>
          <p>
            <strong>Telefone: </strong>{order.user.phone}
          </p>
        </Box>
        <Box>
          <Heading size={5}>Dados do pagamento</Heading>
          <p>{getPaymentMethodText()}</p>
          <p>
            <strong>Total: </strong> R${order.total}
          </p>
        </Box>
        {getDeliveryAddress()}
        {getOrderItems()}
        <Block style={{ display: "flex", justifyContent: "center" }}>
          {/* <Button color="danger" style={{ marginRight: "5px" }}>
            Recusar pedido
          </Button> */}
          <Button 
            color="success" 
            disabled={isUpdateStatusBlocked} 
            style={{visibility: order.status !== "FINISHED" ? "visible" : "hidden"}} 
            onClick={() => handleNextStatus()}>{config.statusButton[order.status]}
          </Button>
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
            minHeight: `calc(100vh - ${props.headerHeight}px)`,
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
