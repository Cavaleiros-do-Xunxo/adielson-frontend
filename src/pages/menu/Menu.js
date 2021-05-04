import React from "react";
import Card from "../../components/card-menu/Card";

import "./Menu.css";

export default class Menu extends React.Component {
  render() {
    return (
      <div className="menu-container container">
        <div className="colums">
          <div className="column">
            <h1 className="title">Cardápio do dia</h1>
          </div>
        </div>
        <div className="columns">
          <div className="column is-one-third">
            <Card />
          </div>
          <div className="column is-one-third">
            <Card />
          </div>
          <div className="column is-one-third">
            <Card />
          </div>
        </div>
        <div className="columns">
          <div className="column is-one-third">
            <Card />
          </div>
          <div className="column is-one-third">
            <Card />
          </div>
          <div className="column is-one-third">
            <Card />
          </div>
        </div>
      </div>
    );
  }
}
