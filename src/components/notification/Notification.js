import React from "react";
import { motion } from "framer-motion";
import{Modal} from "react-bulma-components";
import ListNotificationItem from "../list-notification-item/ListNotificationItem";
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
            <Modal.Card.Title>
              <strong>Notificações</strong>
            </Modal.Card.Title>
          </Modal.Card.Header>
            <Modal.Card.Body>
              <ListNotificationItem/>
            </Modal.Card.Body>
          <Modal.Card.Footer justifyContent="center">
          </Modal.Card.Footer>
        </Modal.Card>
      </Modal>
    );
  }

}