import React, { Component } from "react";
import { SinglePhoto } from "./SinglePhoto";
import { connect } from "react-redux";

export class AllPhotos extends Component {
  componentDidMount() {
    debugger;
  }
  componentDidUpdate() {
    debugger;
  }

  // componentDidUpdate() {
  //   // debugger;
  //   // if (JSON.parse(window.localStorage.getItem("photoKeys")).length === 20) {
  //   //   const result = JSON.stringify(this.props.base64Array);
  //   //   window.localStorage.setItem("base64s", result);
  //   // }
  // }

  render() {
    return (
      <div>
        {this.props.photos.map((photo, index) => {
          return (
            <SinglePhoto
              fileName={photo.Key}
              // photoTag={photo.ETag}
              // insertBase64={(string, photoKey) =>
              //   this.insertBase64(string, photoKey)
              // }
              // includesBase64={photoKey => this.props.includesBase64(photoKey)}
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
    photos: state.photos,
    loading: state.loading

    // base64array: state.base64Array,
    // photoKeys: state.photoKeys
  };
};

export default connect(mapStateToProps)(AllPhotos);
