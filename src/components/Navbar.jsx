import React, { Component } from "react";
import "../styles/navbar.css";
const _ = require("lodash");

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="navbar">
        <a onClick={() => this.props.unselect()}>All Photos</a>
      </div>
    );
  }
}
