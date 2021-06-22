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
              <p>
                <strong>Total: </strong>
                <span style={{ color: "#48c774" }}>R$ {props.total}</span>
              </p>
            </Block>
          </Content>
        </Media.Item>
      </Media>
    </Box>
  );
};

export default ListOrderItem;
