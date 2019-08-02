import React, { Component } from "react";
import "../styles/navbar.css";
import Upload from "./Upload.jsx";
import { viewAll } from "../redux";
import { connect } from "react-redux";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <p className="navbar-header" onClick={this.props.viewAll}>
          All Photos
        </p>
        {this.props.title ? (
          <p className="pic-title">{this.props.title}</p>
        ) : (
          <p />
        )}
        <Upload />
      </div>
    );
  }
}

const mapDispatchToAction = dispatch => {
  return {
    viewAll: () => dispatch(viewAll())
  };
};

export default connect(
  null,
  mapDispatchToAction
)(Navbar);
