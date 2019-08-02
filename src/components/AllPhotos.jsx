import React, { Component } from "react";
import { SinglePhoto } from "./SinglePhoto";
import { connect } from "react-redux";

export class AllPhotos extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     base64Array: [],
  //     photoKeys: []
  //   };
  // }

  insertBase64(string, photoKey) {
    this.setState({
      base64Array: [...this.state.base64Array, string],
      photoKeys: [...this.state.photoKeys, photoKey]
    });
  }

  componentDidUpdate() {
    if (this.props.photoKeys.length === this.props.photos.length) {
      const result = JSON.stringify(this.props.base64Array);
      window.localStorage.setItem("base64s", result);
    }
  }

  render() {
    return (
      <div>
        {JSON.parse(window.localStorage.photos).map((photo, index) => {
          return (
            <SinglePhoto
              photoKey={photo.Key}
              photoTag={photo.ETag}
              insertBase64={(string, photoKey) =>
                this.insertBase64(string, photoKey)
              }
              includesBase64={photoKey => this.props.includesBase64(photoKey)}
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

const mapStateToProps = state => {
  return {
    photos: state.photos
    // base64array: state.base64Array,
    // photoKeys: state.photoKeys
  };
};

export default connect(mapStateToProps)(AllPhotos);
