import React from "react";
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

const mockOrders = [
  {
    customerName: "Tiago",
    orderStatus: "Pendente",
    statusColor: "danger",
    orderCreatedDate: "13:01",
  },
  {
    customerName: "Wagner",
    orderStatus: "Pendente",
    statusColor: "danger",
    orderCreatedDate: "13:02",
  },
  {
    customerName: "Fabricio",
    orderStatus: "Pendente",
    statusColor: "danger",
    orderCreatedDate: "13:03",
  },
];

export default class Dashboard extends React.Component {
  render() {
    const orders = [];

    for (const order of mockOrders) {
      orders.push(
        <CardOrder
          key={order.customerName}
          className="card-order-margin-bottom"
          customerName={order.customerName}
          orderStatus={order.orderStatus}
          statusColor={order.statusColor}
          orderCreatedDate={order.orderCreatedDate}
        />
      );
    }

    return (
      <Container
        style={{
          height: `calc(100vh - ${this.props.headerHeight}px)`,
          paddingLeft: "0px",
          paddingRight: "0px",
        }}
        breakpoint="fluid"
        renderAs={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Columns
          style={{ height: `calc(100vh - ${this.props.headerHeight}px)` }}
        >
          <Columns.Column
            size="one-third"
            style={{ height: `calc(100vh - ${this.props.headerHeight}px)` }}
          >
            <Box
              style={{ height: `calc(100vh - ${this.props.headerHeight}px)` }}
            >
              <Heading size={3}>Pedidos em aberto</Heading>
              {orders}
            </Box>
          </Columns.Column>
          <Columns.Column>
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
          </Columns.Column>
        </Columns>
      </Container>
    );
  }
}
