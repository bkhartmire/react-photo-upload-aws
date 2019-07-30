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
      selectedPhoto: { key: "0.jpg", base64: "" }, //key
      done: false
    };
  }

  componentDidMount() {
    if (this.state.currentView === "All") {
      listObjects().then(res => {
        this.setState({ photos: res, done: true });
        console.log(this.state);
      });
    } else if (this.state.currentView === "Single") {
      debugger;
      getSingleObject(this.state.selectedPhoto).then(res => {
        debugger;
      });
    }
  }

  selectPhoto(photo) {
    this.setState({ currentView: "Single", selectPhoto: photo });
  }

  unselectPhoto() {
    this.setState({ currentView: "All" });
  }

  render() {
    return (
      <div className="app">
        <h1>Hello World!</h1>
        <Navbar />
        {this.state.done ? (
          this.state.currentView === "All" ? (
            <AllPhotos photos={this.state.photos} />
          ) : (
            <SinglePhoto
              photo={this.state.selectedPhoto}
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
