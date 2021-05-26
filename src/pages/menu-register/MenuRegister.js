import React from "react";
import { motion } from "framer-motion";
import { Box, Block, Container, Heading, Button } from "react-bulma-components";
import MenuRegisterItem from "../../components/menu-register-item/MenuRegisterItem";

const MenuRegister = (props) => {
  return (
    <Container
      renderAs={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box style={{ marginTop: "10px" }}>
        <Block style={{ display: "flex", justifyContent: "space-between" }}>
          <Heading>Cardápio do dia</Heading>
          <Button
            color="danger"
            rounded={true}
            onClick={() => {
              props.history.push("/menuregister");
            }}
          >
            Editar
          </Button>
        </Block>
        <MenuRegisterItem
          imageUrl={"http://bulma.io/images/placeholders/128x128.png"}
          title={"Marmita"}
          description={"Arroz, feijão e frango grelhado."}
        />
        <MenuRegisterItem
          imageUrl={"http://bulma.io/images/placeholders/128x128.png"}
          title={"Marmita"}
          description={"Arroz, feijão e frango grelhado."}
        />
        <MenuRegisterItem
          imageUrl={"http://bulma.io/images/placeholders/128x128.png"}
          title={"Marmita"}
          description={"Arroz, feijão e frango grelhado."}
        />
      </Box>
    </Container>
  );
};

export default MenuRegister;
