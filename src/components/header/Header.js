import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Button } from "react-bulma-components";

import Cart from "../cart/Cart";

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isActive: false, openCart: false };
  }

  setIsActive = (value) => {
    this.setState({ isActive: value });
  };

  render = () => {
    return (
      <Navbar style={{ backgroundColor: "#F5F0EB" }}>
        <Navbar.Brand>
          <Navbar.Item renderAs={Link} to="/">
            <img
              src={process.env.PUBLIC_URL + "/assets/adielson.png"}
              width="32"
              height="64"
              alt="Adielson's restaurant and pastry"
            />
            <h6 className="title is-6"> Adielson</h6>
          </Navbar.Item>
          <Navbar.Burger
            className={this.state.isActive ? "is-active" : ""}
            onClick={() => this.setIsActive(!this.state.isActive)}
          />
        </Navbar.Brand>
        <Navbar.Menu className={this.state.isActive ? "is-active" : ""}>
          <Navbar.Container>
            <Navbar.Item renderAs={Link} to="/">
              Home
            </Navbar.Item>
            <Navbar.Item renderAs={Link} to="/menu">
              Cardápio
            </Navbar.Item>
          </Navbar.Container>
          <Navbar.Container align="end">
            <Navbar.Item href="#" renderAs="div">
              <div className="buttons">
                <Button
                  className="is-ghost"
                  style={{ color: "black" }}
                  onClick={() => this.showCart()}
                >
                  <i className="fa fa-shopping-cart"></i>
                </Button>
                <Cart />
                <Link className="button is-danger" to="/register">
                  <strong>Cadastre-se</strong>
                </Link>
                <Link className="button is-danger is-light" to="/login">
                  Realizar login
                </Link>
              </div>
            </Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
    );
  };
}
