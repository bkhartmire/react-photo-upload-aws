import React from "react";
import { getSingleObject } from "../utils/index";

export default class SinglePhoto extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      base64: "",
      done: false
    };
  }

  componentDidMount() {
    getSingleObject(this.props.photoKey).then(res =>
      this.setState({ done: true, base64: res })
    );
  }

  render() {
    return (
      <div>
        <img
          src={`data:image/png;base64, ${this.state.base64}`}
          alt={this.props.photoKey}
        />
      </div>
    );
  }
}
