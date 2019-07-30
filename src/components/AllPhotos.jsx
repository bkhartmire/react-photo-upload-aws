import React, { Component } from "react";
import _ from "lodash";
import SinglePhoto from "./SinglePhoto";
import { getSingleObject } from "../utils";

export default class AllPhotos extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.select);
  }

  render() {
    return (
      <div>
        <h1>hi</h1>
        {this.props.photos.map(photo => {
          console.log(photo.Key);
          return (
            <SinglePhoto
              photoKey={photo.Key}
              select={photo => this.props.select(photo)}
              class="imageCell"
            />
          );
        })}
      </div>
    );
  }
}
