import React from "react";
import { Card, Block, Heading, Tag } from "react-bulma-components";
import "./CardOrder.css";

export default class CardOrder extends React.Component {
  render() {
    return (
      <Card className={`card-order ${this.props.className}`}>
        <Card.Content>
          <Block className="card-order-content" style={{ marginBottom: "5px" }}>
            <Heading size={4} style={{ marginBottom: "0px" }}>
              {this.props.customerName}
            </Heading>
            <Tag
              style={{ marginLeft: "5px" }}
              size="medium"
              rounded={true}
              color={this.props.statusColor}
            >
              {this.props.orderStatus}
            </Tag>
          </Block>
          <Block>
            <strong>Realizado às: </strong> {this.props.orderCreatedDate}
          </Block>
        </Card.Content>
      </Card>
    );
  }
}
