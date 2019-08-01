import React, { Component } from "react";
import SinglePhoto from "./SinglePhoto";

export default class AllPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base64Array: [],
      photoKeys: []
    };
  }

  insertBase64(string, photoKey) {
    this.setState({
      base64Array: [...this.state.base64Array, string],
      photoKeys: [...this.state.photoKeys, photoKey]
    });
  }

  componentDidUpdate() {
    if (this.state.photoKeys.length === this.props.photos.length) {
      const result = JSON.stringify(this.state.base64Array);
      window.localStorage.setItem("base64s", result);
    }
  }

  render() {
    return (
      <div>
        {this.props.photos.map((photo, index) => {
          return (
            <SinglePhoto
              photoKey={photo.Key}
              photoTag={photo.ETag}
              insertBase64={(string, photoKey) =>
                this.insertBase64(string, photoKey)
              }
              includesBase64={photoKey => this.props.includesBase64(photoKey)}
              select={photo => this.props.select(photo)}
              selected={false}
              key={index}
              class="imageCell"
            />
          );
        })}
      </div>
    );
  }
}
