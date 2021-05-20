import React from "react";
import Cards from "react-credit-cards";
import { Columns, Form } from "react-bulma-components";

import "react-credit-cards/es/styles-compiled.css";

export default class PaymentForm extends React.Component {
  render() {
    return (
      <Columns>
        <Columns.Column>
          <Form.Field>
            <Form.Label>Dados do cartão</Form.Label>
            <Form.Field>
              <Form.Control>
                <Form.Input
                  type="tel"
                  name="number"
                  placeholder="Número do cartão"
                  pattern="[\d| ]{16,22}"
                  onChange={this.props.handlePaymentInputChange}
                  onFocus={this.props.handleInputFocus}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Control>
                <Form.Input
                  placeholder="Nome"
                  type="text"
                  name="name"
                  onChange={this.props.handlePaymentInputChange}
                  onFocus={this.props.handleInputFocus}
                />
              </Form.Control>
            </Form.Field>
          </Form.Field>
          <Columns>
            <Columns.Column>
              <Form.Field>
                <Form.Control>
                  <Form.Input
                    placeholder="Data de expiração"
                    type="tel"
                    name="expiry"
                    pattern="\d\d/\d\d"
                    required
                    onChange={this.props.handlePaymentInputChange}
                    onFocus={this.props.handleInputFocus}
                  />
                </Form.Control>
              </Form.Field>
            </Columns.Column>
            <Columns.Column>
              <Form.Field>
                <Form.Control>
                  <Form.Input
                    placeholder="CVC"
                    type="tel"
                    name="cvc"
                    pattern="\d{3,4}"
                    required
                    onChange={this.props.handlePaymentInputChange}
                    onFocus={this.props.handleInputFocus}
                  />
                </Form.Control>
              </Form.Field>
            </Columns.Column>
          </Columns>
        </Columns.Column>
        <Columns.Column>
          <Cards
            cvc={this.props.cvc}
            expiry={this.props.expiry}
            focused={this.props.focused}
            name={this.props.name}
            number={this.props.number}
          />
        </Columns.Column>
      </Columns>
    );
  }
}
