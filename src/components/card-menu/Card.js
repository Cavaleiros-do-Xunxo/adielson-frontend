import React from "react";

export default class Card extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src="https://bulma.io/images/placeholders/1280x960.png"
              alt="Batata eh top"
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <div className="columns">
                <div className="column is-four-fifths">
                  <p className="title is-4">Marmita</p>
                  <p className="subtitle is-6">
                    Arroz, feijão, frango empanado.
                  </p>
                </div>
                <div className="column">
                  <button className="button is-danger is-rounded">
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            nec iaculis mauris.
          </div>
        </div>
      </div>
    );
  }
}
