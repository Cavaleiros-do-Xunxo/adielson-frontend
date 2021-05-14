import React from "react";
import { motion } from "framer-motion";
import { Block, Box } from "react-bulma-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Container ,Columns, Heading, Button} from "react-bulma-components";
import "./Home.css";
import { Link } from "react-router-dom";
import CardMenu from "../../components/card-menu/CardMenu";
export default class Home extends React.Component {
  
  render() {
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
        Carousel showThumbs={false}
        autoPlay = {1000} 
        infiniteLoop
      >
        <div>
          <img
            src={process.env.PUBLIC_URL + "/assets/5.png"}
            alt="vai filhao"
          />
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + "/assets/6.jpg"}
            alt="vai filhao"
          />
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + "/assets/7.jpg"}
            alt="vai filhao"
          />
        </div>
      </Carousel>
      <Container
          renderAs={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="menu-container"
        > 
      <Heading
        className="menu-title"
        size={4}
        style={{ marginTop: "30px" }}
      >
        Promoção do dia
      <hr /> 
      </Heading>
        <Columns flexWrap={"wrap"} style={{marginLeft:'2px'}}>
          <Columns.Column size={"one-third"}>
            <CardMenu/>
          </Columns.Column>
          <Columns.Column size={"one-third"}>
            <CardMenu/>
          </Columns.Column>
            <Columns.Column size={"one-third"}>
              <CardMenu/>
            </Columns.Column>
        </Columns>
      </Container>  
          <Box className="teste"> 
            <Link to="/menu">
              <Button size="medium" color="danger">
                Visualizar Cardápio 
              </Button>
            </Link>
          </Box> 
        </Block>
    );
  }
}
