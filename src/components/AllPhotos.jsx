import React, { Component } from "react";
import SinglePhoto from "./SinglePhoto";

export default class AllPhotos extends Component {
  render() {
    return (
      <div>
        {this.props.photos.map((photo, index) => {
          return (
            <SinglePhoto
              fileName={photo.fileName}
              url={photo.url}
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
