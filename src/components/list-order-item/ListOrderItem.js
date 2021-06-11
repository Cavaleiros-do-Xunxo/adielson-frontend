import React from "react";
import { Block, Box, Content, Heading, Media } from "react-bulma-components";

const ListOrderItem = (props) => {
  return (
    <Box className={props.className}>
      <Media>
        <Media.Item>
          <Content>
            <Block>
              <Heading size={5}>Pedido do dia 01/06/2021</Heading>
              <Heading
                subtitle
                size={6}
                weight="normal"
                style={{ color: "#48c774" }}
              >
                Pedido entregue
              </Heading>
              <p>
                <strong>1 Marmita: </strong> Arroz, feijão, macarrão e frango
                assado.
              </p>
              <p style={{ color: "#48c774" }}>R$ 100,00</p>
            </Block>
          </Content>
        </Media.Item>
      </Media>
    </Box>
  );
};

export default ListOrderItem;
