import React from "react";
import { Link } from "react-router-dom";

import "./Card.css";

export default class Card extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-content" style={{ textAlign: "center" }}>
              <img
                src={process.env.PUBLIC_URL + "/assets/adielson-icon.png"}
                alt="Adielson icon"
                className="login-icon"
              />
              <h2 className="subtitle is-4">
                Restaurante e pastelaria do Adielson
              </h2>
            </div>
          </div>
          <div className="content">
            <div className="field">
              <label className="label">E-mail</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Insira seu endereço de e-mail"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Senha</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Insira sua senha"
                />
              </div>
            </div>

            <p>
              Não possui uma conta ainda?{" "}
              <Link className="register-link" to="/register">
                Registre-se
              </Link>
            </p>

            <div className="field has-addons has-addons-centered">
              <div className="control">
                <button className="button is-success">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
