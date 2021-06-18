import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Block,
  Box,
  Container,
  Columns,
  Heading,
  Button,
} from "react-bulma-components";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

import api from "../../services/api";
import CardMenu from "../../components/card-menu/CardMenu";
import Spinner from "../../components/spinner/Spinner";

import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const config = {
  maxMenuItems: 3,
};

const Home = (props) => {
  const [dailyMenuItems, setDailyMenuItems] = useState([]);

  useEffect(() => {
    fetchDailyMenuItems();
  }, []);

  const buildSomeOffersSection = () => {
    const menuItems = dailyMenuItems
      .slice(0, config.maxMenuItems)
      .map((item, _) => {
        return (
          <Columns.Column
            key={item.id}
            size={"one-third"}
            style={{ display: "flex" }}
          >
            <CardMenu menuItem={item} />
          </Columns.Column>
        );
      });

    return menuItems;
  };

  const fetchDailyMenuItems = async () => {
    try {
      const response = await api.listMenuItems();
      setDailyMenuItems(response.data);
    } catch (e) {
      console.error("Failed to load daily menu items", e);
    }
  };

  return (
    <Block
      renderAs={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Carousel
        showArrows={true}
        onChange={() => {}}
        onClickItem={() => {}}
        onClickThumb={() => {}}
        Carousel
        showThumbs={false}
        autoPlay={1000}
        infiniteLoop
      >
        <div>
          <img src={process.env.PUBLIC_URL + "/assets/5.png"} alt="Some ad" />
        </div>
        <div>
          <img src={process.env.PUBLIC_URL + "/assets/6.jpg"} alt="Some ad" />
        </div>
        <div>
          <img src={process.env.PUBLIC_URL + "/assets/7.jpg"} alt="Some ad" />
        </div>
      </Carousel>
      <Container
        renderAs={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="menu-container"
      >
        <Heading className="menu-title" size={4} style={{ marginTop: "30px" }}>
          Alguns itens do nosso cardápio
          <hr />
        </Heading>
        <Columns
          flexWrap={"wrap"}
          style={{ marginLeft: "2px", justifyContent: "center" }}
        >
          {dailyMenuItems.length > 0 ? buildSomeOffersSection() : <Spinner />}
        </Columns>
      </Container>
      <Box className="view-menu">
        <Link to="/menu">
          <Button size="medium" color="danger">
            Visualizar Cardápio
          </Button>
        </Link>
      </Box>
    </Block>
  );
};

export default Home;
