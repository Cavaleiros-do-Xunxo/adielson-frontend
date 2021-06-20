import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Block, Navbar, Button } from "react-bulma-components";
import Cart from "../cart/Cart";

import { SessionContext } from "../../services/sessionProvider";
import SessionManager from "../../services/sessionManager";
import api from "../../services/api";

const Header = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const headerHeight = useRef(null);
  const { isAuthenticated, setIsAuthenticated, setIsAdmin } =
    useContext(SessionContext);

  useEffect(() => {
    props.updateHeaderHeight(headerHeight.current.clientHeight);
    const currentToken = SessionManager.getAuthToken();

    if (currentToken) {
      setIsAuthenticated(true);

      api.getUserFromCurrentSession().catch((e) => {
        if (e.response && e.response.status === 401) {
          setIsAuthenticated(false);
          setIsAdmin(false);
          SessionManager.clearSession();
        }
      });
    } else {
      setIsAuthenticated(false);
    }
  }, [props, setIsAuthenticated, setIsAdmin]);

  const logout = () => {
    SessionManager.clearSession();
    setIsAdmin(false);
    setIsAuthenticated(false);

    window.location.pathname = "/";
  };

  const renderLoginAndRegister = () => {
    if (!isAuthenticated) {
      return (
        <Block>
          <Link className="button is-danger" to="/register">
            <strong>Cadastre-se</strong>
          </Link>
          <Link className="button is-danger is-light" to="/login">
            Realizar login
          </Link>
        </Block>
      );
    }
  };

  const renderExit = () => {
    if (isAuthenticated) {
      return (
        <Block>
          <Button
            className="button is-danger"
            onClick={() => {
              logout();
            }}
          >
            Sair
          </Button>
        </Block>
      );
    }
  };

  return (
    <Navbar style={{ backgroundColor: "#F5F0EB" }} domRef={headerHeight}>
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
          className={isActive ? "is-active" : ""}
          onClick={() => setIsActive(!isActive)}
        />
      </Navbar.Brand>
      <Navbar.Menu className={isActive ? "is-active" : ""}>
        <Navbar.Container>
          <Navbar.Item renderAs={Link} to="/menu">
            Cardápio
          </Navbar.Item>
        </Navbar.Container>
        <Navbar.Container align="end">
          <Navbar.Item href="#" renderAs="div">
            <Block className="buttons">
              <Button
                className="is-ghost"
                style={{ color: "black" }}
                onClick={() => {
                  setShowCart(true);
                }}
              >
                <i className="fa fa-shopping-cart"></i>
              </Button>
              <Cart show={showCart} showCb={setShowCart} />
              {renderLoginAndRegister()}
              {renderExit()}
            </Block>
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};

export default Header;
