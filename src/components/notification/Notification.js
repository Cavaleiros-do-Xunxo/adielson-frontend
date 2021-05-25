import React from "react";
import { motion } from "framer-motion";
import{Columns, Media, Image, Heading, Modal} from "react-bulma-components";
import ListItem from "../list-item/ListItem";

export default class Notification extends React.Component
{
  render = () =>{
    return (
      <Modal
        onClose={() => {
          this.props.showCb(false);
        }}
        show={this.props.show}
      >
        <Modal.Card
          renderAs={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Modal.Card.Header>
            <Modal.Card.Title><strong>Notificação</strong></Modal.Card.Title>
          </Modal.Card.Header>
            <Modal.Card.Body>
            <Columns>
              <Columns.Column>
                <Media>
                  <Media.Item renderAs="figure" align="left">
                    <Image
                      size={64}
                      alt="64x64"
                      src={process.env.PUBLIC_URL + "/assets/adielson.png"}
                    />
                  </Media.Item>
                  <Media.Item>
                    <Heading 
                      size={4}
                    >
                      Pedido n° xx
                    </Heading>
                    <Heading 
                      subtitle size={6}
                    >  
                      <p><strong>Data:</strong> 24/05/2021</p>
                      <strong>Status:</strong> Está sendo preparado
                      <p><strong>Tempo estimado:</strong> 10min</p>
                    </Heading>
                  </Media.Item>
                </Media>
              </Columns.Column>
              <hr></hr>
              <Columns.Column>
                <ol style={{ listStyle:"none"}}>
                  <strong><li>Produtos</li></strong>
                  <li>1 Pastel de carne</li>
                  <li>1 Pastel de queijo</li>
                  <li>1 Pastel de calabresa</li>
                  <li>1 Pastel de carne e panela</li>
                </ol> 
              </Columns.Column>
            </Columns>
            <hr></hr>
            </Modal.Card.Body>
          <Modal.Card.Footer justifyContent="center">
           
          </Modal.Card.Footer>
        </Modal.Card>
      </Modal>
      
    );
  }

}