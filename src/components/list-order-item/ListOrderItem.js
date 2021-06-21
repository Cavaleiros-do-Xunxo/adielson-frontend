import React from "react";
import { Block, Box, Content, Heading, Media } from "react-bulma-components";

const config = {
  status: {
    WAITING: "Aguardando confirmação do pedido",
    PREPARING: "Em preparo",
    SENT: "Pedido enviado",
    FINISHED: "Pedido finalizado",
  },
};

const ListOrderItem = (props) => {
  const renderItemsList = () => {
    const items = [];

    for (const item of props.items) {
      items.push(
        <Block key={item.menuItem.id}>
          <p>
            <strong>
              {item.count} {item.menuItem.name}:{" "}
            </strong>{" "}
            {item.menuItem.description}
          </p>
        </Block>
      );
    }

    return items;
  };

  return (
    <Box className={props.className}>
      <Media>
        <Media.Item>
          <Content>
            <Block>
              <Heading size={5}>Pedido do dia {props.date}</Heading>
              <Heading
                subtitle
                size={6}
                weight="normal"
                style={{ color: "#48c774" }}
              >
                {config.status[props.status]}
              </Heading>
              {renderItemsList()}
              <p style={{ color: "#48c774" }}>
                <strong>Total: </strong>R$ {props.total}
              </p>
            </Block>
          </Content>
        </Media.Item>
      </Media>
    </Box>
  );
};

export default ListOrderItem;
