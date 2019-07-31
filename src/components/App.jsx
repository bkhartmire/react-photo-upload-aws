import React, { Component } from "react";
import { render } from "react-dom";
import "../styles/styles.css";
import Navbar from "./Navbar";
import AllPhotos from "./AllPhotos";
import SinglePhoto from "./SinglePhoto";
import { listObjects, getSingleObject, saveObject } from "../utils/index.js";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: "All", //or 'Single'
      photos: [],
      selectedPhoto: { title: "", base64: "" }, //key
      done: false
    };
  }

  componentDidMount() {
    if (this.state.currentView === "All") {
      listObjects().then(res => {
        this.setState({ photos: res, done: true });
      });
    } else if (this.state.currentView === "Single") {
      getSingleObject(this.state.selectedPhoto).then(res => {});
    }
  }

  selectPhoto = photo => {
    this.setState({ currentView: "Single", selectedPhoto: photo });
  };

  unselectPhoto() {
    this.setState({ currentView: "All", selectedPhoto: { title: "" } });
  }

  render() {
    return (
      <div className="app">
        <h1>Hello World!</h1>
        <Navbar
          title={this.state.selectedPhoto.title}
          unselect={() => this.unselectPhoto()}
          select={photo => this.selectPhoto(photo)}
        />
        {this.state.done ? (
          this.state.currentView === "All" ? (
            <AllPhotos
              photos={this.state.photos}
              select={photo => this.selectPhoto(photo)}
            />
          ) : (
            <SinglePhoto
              photo={this.state.selectedPhoto}
              selected={true}
              class="single-photo"
            />
          )
        ) : (
          <p>Waiting on photos...</p>
        )}
      </div>
    );
  }
}
