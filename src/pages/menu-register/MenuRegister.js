import React, { useState, useEffect } from "react";
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
import Spinner from "../../components/spinner/Spinner";
import api from "../../services/api";

const config = {
  defaultNewProduct: {
    id: "",
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    inMenu: false,
  },
};

const MenuRegister = (props) => {
  const [isEditMode, setEditMode] = useState(false);
  const [canShowAddMenuItem, setCanShowAddMenuItem] = useState(false);
  const [newProduct, setNewProduct] = useState(config.defaultNewProduct);
  const [menuItems, setMenuItems] = useState([]);
  const [itemCategories, setItemCategories] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async (isMounted = true) => {
    const categories = [];

    try {
      const response = await api.getCategories();

      if (response && response.data && Array.isArray(response.data)) {
        for (const category of response.data) {
          categories.push(category);
        }
      }

      if (isMounted) {
        setItemCategories(categories);
      }
    } catch (e) {
      console.log("Failed to fetch categories");
    }
  };

  const fetchMenuItems = async (isMounted = true) => {
    try {
      if (isMounted) {
        setIsLoading(true);
      }

      const response = await api.listMenuItems();

      if (isMounted) {
        setIsLoading(false);
      }

      if (isMounted) {
        setMenuItems(response.data);
      }
    } catch (e) {
      if (isMounted) {
        setIsLoading(false);
      }
      console.error("Failed to list menu items");
    }
  };

  useEffect(() => {
    let isMounted = true;

    fetchCategories(isMounted);
    fetchMenuItems(isMounted);

    return () => {
      isMounted = false;
    };
  }, []);

  const buildCategoriesSelect = () => {
    const categoriesOptions = [];

    categoriesOptions.push(<option key="default" value=""></option>);

    for (const category of itemCategories) {
      categoriesOptions.push(
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      );
    }

    return (
      <Form.Field>
        <Form.Label>Categoria</Form.Label>
        <Form.Control>
          <Form.Select
            name="category"
            value={newProduct.category}
            onChange={(e) => handleNewProductInputChange(e)}
          >
            {categoriesOptions}
          </Form.Select>
        </Form.Control>
      </Form.Field>
    );
  };

  const handleNewProductInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const addNewMenuItem = async () => {
    setDisabledButtons(true);

    const _menuItems = menuItems;

    try {
      const response = await api.createMenuItem(newProduct);

      setNewProduct(response.data);

      _menuItems.push(response.data);

      setMenuItems(_menuItems);
      setNewProduct(config.defaultNewProduct);
      setCanShowAddMenuItem(false);
    } catch (e) {
      console.error("Failed to add new menu item");
    } finally {
      setDisabledButtons(false);
    }
  };

  const showAddMenuItem = () => {
    if (!canShowAddMenuItem) {
      return;
    }

    return (
      <Box>
        <Heading size={4}>Adicionar novo item</Heading>
        <Form.Field>
          <Form.Label>Nome do item do cardápio</Form.Label>
          <Form.Control>
            <Form.Input
              type="text"
              name="name"
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
              name="image"
              placeholder="Url da imagem do item"
              onChange={(e) => handleNewProductInputChange(e)}
            />
          </Form.Control>
        </Form.Field>
        {buildCategoriesSelect()}
        <hr />
        <Button.Group justifyContent="center">
          <Button
            color="danger"
            disabled={disabledButtons}
            onClick={() => {
              setNewProduct(config.defaultNewProduct);
              setCanShowAddMenuItem(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            color="success"
            disabled={disabledButtons}
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

  const deleteMenuItem = async (id) => {
    try {
      setDisabledButtons(true);

      await api.deleteMenuItem(id);

      setMenuItems(
        menuItems.filter((item) => {
          return item.id !== id;
        })
      );
    } catch (e) {
      console.error("Failed to delete Menu Item");
    } finally {
      setDisabledButtons(false);
    }
  };

  const showOnMenu = async (id, showOnMenu) => {
    let updatedItem = null;

    const _menuItems = menuItems.map((item, _) => {
      if (item.id === id) {
        item.inMenu = showOnMenu;
        updatedItem = item;
      }

      return item;
    });

    setMenuItems(_menuItems);

    try {
      await api.updateMenuItem(id, {
        name: updatedItem.name,
        price: updatedItem.price,
        image: updatedItem.image,
        description: updatedItem.description,
        inMenu: updatedItem.inMenu,
        category: updatedItem.category.id,
      });
    } catch (e) {
      console.error("Failed to update menu item");

      const _menuItems = menuItems.map((item, _) => {
        if (item.id === id) {
          item.inMenu = !showOnMenu;
        }

        return item;
      });

      setMenuItems(_menuItems);
    }
  };

  const showMenuItems = () => {
    const products = [];

    for (const product of menuItems) {
      products.push(
        <MenuRegisterItem
          key={product.id}
          id={product.id}
          image={product.image}
          name={product.name}
          description={product.description}
          price={product.price}
          inMenu={product.inMenu}
          onDelete={deleteMenuItem}
          showDeleteButton={isEditMode}
          showInMenuButton={isEditMode}
          showOnMenu={showOnMenu}
          disableButtons={disabledButtons}
        />
      );
    }

    return products;
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
              }}
            >
              {isEditMode ? "Finalizar edição" : "Editar"}
            </Button>
          </Button.Group>
        </Block>
        <hr />
        {showAddMenuItem()}
        <Block style={menuItems.length === 0 ? { textAlign: "center" } : {}}>
          {!isLoading ? showMenuItems() : <Spinner />}
          {!isLoading && menuItems.length === 0 ? (
            <Heading size={4}>Nenhum item foi cadastrado</Heading>
          ) : (
            ""
          )}
        </Block>
      </Box>
    </Container>
  );
};

export default MenuRegister;
