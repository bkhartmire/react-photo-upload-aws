import React from "react";
import { getSingleObject } from "../utils/index";

export default class SinglePhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base64: undefined,
      done: false,
      selected: false
    };
  }

  componentDidMount() {
    const lsPhotos = JSON.parse(window.localStorage.getItem("photos"));
    const photoObj = lsPhotos.find(x => {
      return x.Key === this.props.photoKey;
    });
    if (lsPhotos.base64) {
      console.log("base64 present");
      this.setState({ done: true, base64: lsPhotos.base64 });
    } else {
      console.log("base64 missing");
      getSingleObject(this.props.photoKey).then(res => {
        photoObj.base64 = res;
        // lsPhotos.push(res);
        window.localStorage.setItem("photos", JSON.stringify(lsPhotos));
        this.setState({ done: true, base64: res });
      });
    }
  }

  render() {
    return (
      <div className="imageCell">
        <img
          onClick={() => {
            if (!this.props.selected) {
              this.props.select({
                title: this.props.photoKey,
                base64: this.state.base64
              });
            }
          }}
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
