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
        <div className="waves">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#f14668"
              fill-opacity="1"
              d="M0,64L15,69.3C30,75,60,85,90,112C120,139,150,181,180,197.3C210,213,240,203,270,186.7C300,171,330,149,360,128C390,107,420,85,450,117.3C480,149,510,235,540,234.7C570,235,600,149,630,138.7C660,128,690,192,720,213.3C750,235,780,213,810,186.7C840,160,870,128,900,128C930,128,960,160,990,181.3C1020,203,1050,213,1080,229.3C1110,245,1140,267,1170,234.7C1200,203,1230,117,1260,106.7C1290,96,1320,160,1350,154.7C1380,149,1410,75,1425,37.3L1440,0L1440,320L1425,320C1410,320,1380,320,1350,320C1320,320,1290,320,1260,320C1230,320,1200,320,1170,320C1140,320,1110,320,1080,320C1050,320,1020,320,990,320C960,320,930,320,900,320C870,320,840,320,810,320C780,320,750,320,720,320C690,320,660,320,630,320C600,320,570,320,540,320C510,320,480,320,450,320C420,320,390,320,360,320C330,320,300,320,270,320C240,320,210,320,180,320C150,320,120,320,90,320C60,320,30,320,15,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }
}
