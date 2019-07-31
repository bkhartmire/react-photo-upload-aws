import React, { Component } from "react";
import SinglePhoto from "./SinglePhoto";

export default class AllPhotos extends Component {
  render() {
    return (
      <div>
        {this.props.photos.map((photo, index) => {
          return (
            <SinglePhoto
              photoKey={photo.Key}
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
