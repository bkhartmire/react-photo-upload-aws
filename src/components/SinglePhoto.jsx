import React from "react";
import { getSingleObject } from "../utils/index";

export default class SinglePhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base64: undefined,
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
      <div className="imageCell">
        <img
          onClick={() =>
            this.props.select({
              key: this.props.photoKey,
              base64: this.state.base64
            })
          }
          className={"image " + this.props.class}
          src={
            this.props.photo
              ? `data:image/png;base64,  ${this.props.photo.base64}`
              : `data:image/png;base64,  ${this.state.base64}`
          }
          alt={this.props.photoKey}
        />
      </div>
    );
  }
}
