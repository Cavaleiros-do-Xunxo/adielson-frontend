import React, { useState } from "react";
import uuid from "react-uuid";
import { motion } from "framer-motion";
import {
  Box,
  Block,
  Button,
  Container,
  Form,
  Heading,
} from "react-bulma-components";
import MenuRegisterItem from "../../components/menu-register-item/MenuRegisterItem";

const config = {
  defaultNewProduct: {
    renderId: "",
    title: "",
    description: "",
    price: "",
    imageUrl: "",
  },
};

const MenuRegister = (props) => {
  const [isEditMode, setEditMode] = useState(false);
  const [canShowAddMenuItem, setCanShowAddMenuItem] = useState(false);
  const [newProduct, setNewProduct] = useState(config.defaultNewProduct);
  const [menuItems, setMenuItems] = useState([]);

  const handleNewProductInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const addNewMenuItem = () => {
    const _menuItems = menuItems;

    newProduct.renderId = uuid();
    _menuItems.push(newProduct);

    setMenuItems(_menuItems);
    setNewProduct(config.defaultNewProduct);
    setCanShowAddMenuItem(false);
  };

  const showAddMenuItem = () => {
    if (!canShowAddMenuItem) {
      return;
    }

    return (
      <Box>
        <Heading size={4}>Adicionar novo item</Heading>
        <Form.Field>
          <Form.Label>Título</Form.Label>
          <Form.Control>
            <Form.Input
              type="text"
              name="title"
              placeholder="Título do item do cardápio"
              onChange={(e) => handleNewProductInputChange(e)}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label>Descrição</Form.Label>
          <Form.Control>
            <Form.Input
              type="text"
              name="description"
              placeholder="Descrição do item do cardápio"
              onChange={(e) => handleNewProductInputChange(e)}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label>Preço</Form.Label>
          <Form.Control>
            <Form.Input
              type="text"
              name="price"
              placeholder="15.00"
              onChange={(e) => handleNewProductInputChange(e)}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label>Url da imagem</Form.Label>
          <Form.Control>
            <Form.Input
              type="text"
              name="imageUrl"
              placeholder="Url da imagem do item"
              onChange={(e) => handleNewProductInputChange(e)}
            />
          </Form.Control>
        </Form.Field>
        <hr />
        <Button.Group justifyContent="center">
          <Button
            color="danger"
            onClick={() => {
              setNewProduct(config.defaultNewProduct);
              setCanShowAddMenuItem(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            color="success"
            onClick={() => {
              addNewMenuItem();
            }}
          >
            Adicionar ao cardápio
          </Button>
        </Button.Group>
      </Box>
    );
  };

  const showAddMenuItemButton = () => {
    if (!isEditMode || canShowAddMenuItem) {
      return;
    }

    return (
      <Button
        color="success"
        onClick={() => {
          setCanShowAddMenuItem(true);
        }}
        rounded={true}
      >
        <i className="fas fa-plus" style={{ marginRight: "5px" }}></i>Novo item
      </Button>
    );
  };

  const deleteMenuItem = (id) => {
    setMenuItems(
      menuItems.filter((item) => {
        return item.renderId !== id;
      })
    );
  };

  const showMenuItems = () => {
    const products = [];

    for (const product of menuItems) {
      products.push(
        <MenuRegisterItem
          key={product.renderId}
          renderId={product.renderId}
          imageUrl={product.imageUrl}
          title={product.title}
          description={product.description}
          price={product.price}
          onDelete={deleteMenuItem}
          showDeleteButton={isEditMode}
        />
      );
    }

    return products;
  };

  const submitForm = () => {
    if (isEditMode) {
      // submit form
      console.log("Submit form", menuItems);
    }
  };

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
          <Button.Group>
            {showAddMenuItemButton()}
            <Button
              color="danger"
              rounded={true}
              onClick={() => {
                setEditMode(!isEditMode);
                submitForm();
              }}
            >
              {isEditMode ? "Finalizar edição" : "Editar"}
            </Button>
          </Button.Group>
        </Block>
        <hr />
        {showAddMenuItem()}
        {showMenuItems()}
      </Box>
    </Container>
  );
};

export default MenuRegister;
