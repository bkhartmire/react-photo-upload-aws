import React, { Component } from "react";
import "../styles/styles.css";
// import Navbar from "./Navbar";
import AllPhotos from "./AllPhotos";
import SinglePhoto from "./SinglePhoto";
import { connect } from "react-redux";
import { fetchPhotos } from "../redux";

class App extends Component {
  componentDidMount() {
    if (this.props.currentView === "All") fetchPhotos();
  }
  render() {
    return (
      <div className="app">
        {/* <Navbar
          title={this.state.selectedPhoto.title}
          viewAll={() => this.viewAll()}
          select={photo => this.selectPhoto(photo)}
        /> */}
        {this.props.photos.length > 0 ? (
          this.props.currentView === "All" ? (
            <AllPhotos photos={this.props.photos} />
          ) : (
            <SinglePhoto
              url={this.props.selectedPhoto.url}
              fileName={this.props.selectedPhoto.fileName}
              selected={true}
              class="single-photo"
              includesBase64={photoKey => this.includesBase64(photoKey)}
            />
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

export default connect(mapStateToProps)(App);
