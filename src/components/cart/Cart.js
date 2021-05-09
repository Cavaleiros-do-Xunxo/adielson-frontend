import React from "react";

import { Modal, Media, Image, Content, Button } from "react-bulma-components";

export default class Cart extends React.Component {
  render = () => {
    return (
      <Modal onClose={() => {}} show={true}>
        <Modal.Card>
          <Modal.Card.Header>
            <Modal.Card.Title>Title</Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body>
            <Media>
              <Media.Item align="left" renderAs="figure">
                <Image
                  alt="64x64"
                  size={64}
                  src="http://bulma.io/images/placeholders/128x128.png"
                />
              </Media.Item>
              <Media.Item>
                <Content>
                  <p>
                    <strong>John Smith</strong> <small>@johnsmith</small>{" "}
                    <small>31m</small>
                    <br />
                    If the children of the Modal is a card, the close button
                    will be on the Card Head instead than the top-right corner
                    You can also pass showClose = false to Card.Head to hide the
                    close button
                  </p>
                </Content>
              </Media.Item>
            </Media>
          </Modal.Card.Body>
          <Modal.Card.Footer align="right">
            <Button color="success">Like</Button>
            <Button>Share</Button>
          </Modal.Card.Footer>
        </Modal.Card>
      </Modal>
    );
  };
}
