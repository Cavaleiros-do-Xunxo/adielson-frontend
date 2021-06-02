import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Button } from "react-bulma-components";
import Cart from "../cart/Cart";
import Notification from "../notification/Notification";

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isActive: false, showCart: false };
    this.headerHeight = React.createRef();
  }

  setIsActive = (value) => {
    this.setState({ isActive: value });
  };

  showCart = (value) => {
    this.setState({ showCart: value });
  };
  showNotification = (value) => {
    this.setState({ showNotification: value });
  };

  componentDidMount = () => {
    this.props.updateHeaderHeight(this.headerHeight.current.clientHeight);
  };

  render = () => {
    return (
      <Navbar style={{ backgroundColor: "#F5F0EB" }} domRef={this.headerHeight}>
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
              <Button
                className="is-ghost"
                style={{ color: "black" }}
                onClick={() => {
                  this.setState({ showNotification: true });
                }}
              >
                <i className="fa fa-bell" aria-hidden="true"></i>
              </Button>
              <Notification
                show={this.state.showNotification}
                showCb={this.showNotification}
              />

              <div className="buttons">
                <Button
                  className="is-ghost"
                  style={{ color: "black" }}
                  onClick={() => {
                    this.setState({ showCart: true });
                  }}
                >
                  <i className="fa fa-shopping-cart"></i>
                </Button>
                <Cart show={this.state.showCart} showCb={this.showCart} />
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
