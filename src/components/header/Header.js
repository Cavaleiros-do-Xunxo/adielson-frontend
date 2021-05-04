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
          style={{ backgroundColor: "#F5F0EB" }}
        >
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <img
                src={process.env.PUBLIC_URL + "/assets/adielson-icon.png"}
                width="32"
                height="64"
                alt="Adielson's restaurant and pastry"
              />
              <h6 className="title is-6"> Adielson</h6>
            </Link>

            <a
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="true"
              data-target="navbar-items"
              href="#!"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbar-items" className="navbar-menu">
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
