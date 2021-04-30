import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <nav
          className="navbar"
          role="navigation"
          aria-label="main navigation"
          style={{ backgroundColor: "#f2f5f3" }}
        >
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <img
                src={process.env.PUBLIC_URL + "/assets/adielson-icon.png"}
                width="32"
                height="64"
                alt="Adielson's restaurant and pastry"
              />
            </Link>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to="/">
                Início
              </Link>
              <Link className="navbar-item" to="/menu">
                Cardápio
              </Link>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <Link className="button is-danger" to="/register">
                    <strong>Cadastre-se</strong>
                  </Link>
                  <Link className="button is-danger is-light" to="/login">
                    Realizar login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
