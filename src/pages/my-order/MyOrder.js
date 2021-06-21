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

const config = {
  status: {
    WAITING: "Aguardando confirmação do pedido",
    PREPARING: "Em preparo",
    SENT: "Pedido enviado",
    FINISHED: "Pedido finalizado",
  },
};

// Mock for status
// setTimeout(() => {
//   setOrder({
//     allStatus: [
//       {
//         value: "Pedido confirmado",
//         date: moment("2021-06-01 21:00:00"),
//       },
//       {
//         value: "Pedido sendo feito",
//         date: moment("2021-06-01 21:05:00"),
//       },
//       {
//         value: "Pedido saiu para entrega",
//         date: moment("2021-06-01 21:10:00"),
//       },
//     ],
//     items: [
//       {
//         title: "Marmita",
//         description: "Arroz, feijão e frango assado",
//         price: 10.0,
//         quantity: 1,
//       },
//     ],
//     total: 10.0,
//   });
// }, 1000);

const MyOrder = (props) => {
  const [order, setOrder] = useState({ allStatus: [], items: [], total: 0.0 });
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      (async () => {
        try {
          const response = await api.getOrder(id);
          setOrder(response.data);
        } catch (e) {
          console.error("Failed to fetch order");
        }
      })();

      const interval = setInterval(async () => {
        try {
          const response = await api.getOrder(id);
          setOrder(response.data);
        } catch (e) {
          console.error("Failed to fetch order");
        }
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  // const getStatus = () => {
  //   const statusBlock = [];

  //   for (const status of order.allStatus) {
  //     statusBlock.push(
  //       <Block
  //         key={status.value}
  //         style={{ display: "flex", alignItems: "center" }}
  //       >
  //         <i
  //           className="fas fa-check-circle fa-2x"
  //           style={{ marginRight: "10px", color: "#48c774" }}
  //         />
  //         {status.date.format("HH:mm")} -
  //         <strong style={{ marginLeft: "5px" }}>{status.value}</strong>
  //       </Block>
  //     );
  //   }

  //   return statusBlock;
  // };

  const getItems = () => {
    const items = [];

    for (const item of order.orderItems) {
      items.push(
        <ul key={uuid()}>
          <li>
            <strong>
              {item.count} {item.menuItem.name}
            </strong>{" "}
            - {item.menuItem.description}
          </li>
        </ul>
      );
    }

    return <Content>{items}</Content>;
  };

  return (
    <Container
      renderAs={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box>
        <Heading>Pedido do dia 01/06/2021</Heading>
      </Box>
      <Box>
        <Heading subtitle size={4}>
          Status do pedido: <strong>{config.status[order.status]}</strong>
        </Heading>
        <hr />
        <Heading subtitle size={4}>
          Items do pedido
        </Heading>
        {order && order.orderItems ? (
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
    </Container>
  );
};

export default MyOrder;
