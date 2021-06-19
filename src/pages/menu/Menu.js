import React, { useState, useEffect } from "react";
import CardMenu from "../../components/card-menu/CardMenu";
import { motion } from "framer-motion";
import { Container, Columns, Heading } from "react-bulma-components";

import Spinner from "../../components/spinner/Spinner";
import api from "../../services/api";

import "./Menu.css";

const Menu = (props) => {
  const [dailyMenuItems, setDailyMenuItems] = useState([]);

  const fetchDailyMenuItems = async () => {
    try {
      const response = await api.listMenuItems();

      if (response && response.data && Array.isArray(response.data)) {
        const menuItems = response.data.filter((item, _) => {
          return item.inMenu;
        });

        setDailyMenuItems(menuItems);
      }
    } catch (e) {
      console.error("Failed to load daily menu items", e);
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      fetchDailyMenuItems();
    }

    return () => {
      isMounted = false;
    };
  }, [setDailyMenuItems]);

  const buildDailyMenu = () => {
    const menuItems = dailyMenuItems.map((item, _) => {
      return (
        <Columns.Column
          key={item.id}
          size={"one-quarter"}
          style={{ display: "flex" }}
        >
          <CardMenu menuItem={item} />
        </Columns.Column>
      );
    });

    return menuItems;
  };

  return (
    <Container
      renderAs={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="menu-container"
    >
      <Columns>
        <Columns.Column>
          <Heading
            className="menu-title"
            size={3}
            style={{ marginTop: "10px" }}
          >
            Cardápio do dia
          </Heading>
          <hr />
        </Columns.Column>
      </Columns>
      <Columns
        flexWrap={"wrap"}
        style={dailyMenuItems.length === 0 ? { justifyContent: "center" } : {}}
      >
        {dailyMenuItems.length > 0 ? buildDailyMenu() : <Spinner />}
      </Columns>
    </Container>
  );
};

export default Menu;
