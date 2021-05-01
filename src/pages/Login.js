import React from "react";
import Card from "../components/card-login/Card";

import "./Login.css";

export default class Login extends React.Component {
  render() {
    return (
      <div className="login">
        <div className="login-container container is-fluid">
          <div className="columns">
            <div className="column is-three-quarters">
              <div className="only-css-my-friend">
                <div className="deliveryman is-desktop">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/entregador.png"}
                    alt="Entregador na motoca"
                    className="deliveryman-icon"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="login-card">
                <Card />
              </div>
            </div>
          </div>
        </div>
        <div>
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use href="#gentle-wave" x="48" y="0" fill="#f14668" />
            </g>
          </svg>
        </div>
      </div>
    );
  }
}
