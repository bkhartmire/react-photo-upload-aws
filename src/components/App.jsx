import React, { Component } from "react";
import "../styles/styles.css";
import Navbar from "./Navbar";
import AllPhotos from "./AllPhotos";
import SinglePhoto from "./SinglePhoto";
import { listObjects, getSingleObject } from "../utils/index.js";

export default class App extends Component {
  constructor(props) {
    if (!window.localStorage.getItem("photos"))
      window.localStorage.setItem("photos", JSON.stringify([]));
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
      if (JSON.parse(window.localStorage.getItem("photos")).length === 0) {
        console.log("inside!");
        listObjects().then(res => {
          window.localStorage.setItem("photos", JSON.stringify(res));
          this.setState({ photos: res, done: true });
        });
      } else if (
        this.state.photos.length < 1 &&
        JSON.parse(window.localStorage.getItem("photos")).length > 0
      ) {
        this.setState({
          photos: JSON.parse(window.localStorage.getItem("photos")),
          done: true
        });
      }
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
