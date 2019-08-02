import React, { Component } from "react";
import "../styles/styles.css";
import Navbar from "./Navbar";
import { AllPhotos } from "./AllPhotos";
import { SinglePhoto } from "./SinglePhoto";
import { getSingleObject, listObjects } from "../utils/index.js";
import { connect } from "react-redux";
import { getPhotos, fetchPhotos } from "../redux";

class App extends Component {
  constructor(props) {
    if (!window.localStorage.getItem("photos")) {
      window.localStorage.setItem("photos", JSON.stringify([]));
      window.localStorage.setItem("base64s", JSON.stringify([]));
      window.localStorage.setItem("photoKeys", JSON.stringify([]));
    }
    super(props);
    this.state = {
      done: false
    };
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (this.props.currentView === "All") {
      if (
        !JSON.parse(window.localStorage.getItem("photos")) ||
        JSON.parse(window.localStorage.getItem("photos")).length === 0
      ) {
        console.log("inside!");
        this.props.fetchPhotos();
      } else if (
        this.props.photos.length < 1 &&
        JSON.parse(window.localStorage.getItem("photos")).length > 0
      ) {
        // this.props.getPhotos();
        listObjects().then(res => {
          window.localStorage.setItem(
            "photos",
            JSON.stringify(res.slice(0, 20))
          );
          this.setState({
            done: true
          });
        });
      }
    } else if (this.state.currentView === "Single") {
      getSingleObject(this.state.selectedPhoto).then(res => {});
    }
  }

  //helper
  includesBase64(photoKey) {
    const lsPhotoKeys = JSON.parse(window.localStorage.getItem("photoKeys"));
    if (lsPhotoKeys && lsPhotoKeys.includes(photoKey)) {
      const index = lsPhotoKeys.indexOf(photoKey);
      return JSON.parse(window.localStorage.getItem("base64s"))[index];
    }
    return false;
  }

  render() {
    return (
      <div className="app">
        {/* <Navbar
          title={this.state.selectedPhoto.title}
          viewAll={() => this.viewAll()}
          select={photo => this.selectPhoto(photo)}
        /> */}
        {this.state.done ? (
          this.props.currentView === "All" ? (
            <AllPhotos
              // photos={this.state.photos}
              // select={photo => this.selectPhoto(photo)}
              includesBase64={photoKey => this.includesBase64(photoKey)}
            />
          ) : (
            <p>Single Photo goes here.</p>
            // <SinglePhoto
            //   photo={this.state.selectedPhoto}
            //   photoKey={this.state.selectedPhoto.title}
            //   selected={true}
            //   class="single-photo"
            //   includesBase64={photoKey => this.includesBase64(photoKey)}
            // />
          )
        ) : (
          <p>Waiting on photos...</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    photos: state.photos,
    currentView: state.currentView,
    selectedPhoto: state.selectedPhoto
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPhotos: () => dispatch(getPhotos()),
    fetchPhotos: () => dispatch(fetchPhotos())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
