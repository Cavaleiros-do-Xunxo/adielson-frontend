import React from "react";
import { Block, Columns, Form, Icon } from "react-bulma-components";

export default class AddressForm extends React.Component {
  render() {
    return (
      <Block>
        <Columns>
          <Columns.Column>
            <Form.Field>
              <Form.Label>Endereço de entrega</Form.Label>
              <Form.Control>
                <Form.Input
                  type="text"
                  name="address"
                  placeholder="Insira o endereço de entrega"
                  onChange={(e) => this.props.handleInputChange(e)}
                />
                <Icon align="left" size="small">
                  <i className="fas fa-map-marker-alt"></i>
                </Icon>
              </Form.Control>
            </Form.Field>
          </Columns.Column>
          <Columns.Column size="one-quarter">
            <Form.Field>
              <Form.Label>Número</Form.Label>
              <Form.Control>
                <Form.Input
                  type="text"
                  name="number"
                  placeholder="Insira o número da casa ou apto"
                  onChange={(e) => this.props.handleInputChange(e)}
                />
              </Form.Control>
            </Form.Field>
          </Columns.Column>
        </Columns>
        <Form.Field>
          <Form.Label>Complemento</Form.Label>
          <Form.Control>
            <Form.Input
              type="text"
              name="complement"
              placeholder="Ex.: casa, apto, próximo à ..."
              onChange={(e) => this.props.handleInputChange(e)}
            />
            <Icon align="left" size="small">
              <i className="fas fa-info"></i>
            </Icon>
          </Form.Control>
        </Form.Field>
      </Block>
    );
  }
}
