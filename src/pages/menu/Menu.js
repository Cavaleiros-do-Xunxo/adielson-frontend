import React from "react";
import Card from "../../components/card-menu/Card";

import "./Menu.css";

export default class Menu extends React.Component {
  render() {
    const mockCards = [];

    for (let i = 0; i < 6; i++) {
      mockCards.push(
        <div key={i} className="column is-one-quarter">
          <div className="card-item">
            <Card />
          </div>
        </div>
      );
    }

    return (
      <div className="menu-container container">
        <div className="colums">
          <div className="column">
            <h1 className="title">Cardápio do dia</h1>
          </div>
        </div>
        <div className="columns is-flex-wrap-wrap">{mockCards}</div>
      </div>
    );
  }
}
