import React, { Component } from "react";
import "../styles/navbar.css";
import Upload from "./Upload.jsx";
const _ = require("lodash");

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="navbar">
        <p className="navbar-header" onClick={() => this.props.unselect()}>
          All Photos
        </p>
        {this.props.title.length > 0 ? (
          <p className="pic-title">{this.props.title}</p>
        ) : (
          <p />
        )}
        <Upload select={photo => this.props.select(photo)} />
      </div>
    );
  }
}
