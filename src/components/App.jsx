import React, { Component } from "react";
import "../styles/styles.css";
// import Navbar from "./Navbar";
import { AllPhotos } from "./AllPhotos";
// import { SinglePhoto } from "./SinglePhoto";
// import { getSingleObject, listObjects } from "../utils/index.js";
import { connect } from "react-redux";
import { fetchPhotos } from "../redux";

class App extends Component {
  constructor(props) {
    super(props);
    // debugger;
    this.state = {
      done: false
    };
  }
  componentDidMount() {
    if (this.props.currentView === "All") {
      this.props.load();
      fetchPhotos();
      this.setState({ done: true });
    }
    // else {
    //   handle single photo
    // }
  }
  componentDidUpdate() {
    debugger;
  }

  render() {
    return (
      <div className="app">
        {/* <Navbar
          title={this.state.selectedPhoto.title}
          viewAll={() => this.viewAll()}
          select={photo => this.selectPhoto(photo)}
        /> */}
        {!this.props.loading && this.state.done ? (
          this.props.currentView === "All" ? (
            <AllPhotos
            // photos={this.state.photos}
            // select={photo => this.selectPhoto(photo)}
            // includesBase64={photoKey => this.includesBase64(photoKey)}
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
    // photos: state.photos,
    currentView: state.currentView,
    selectedPhoto: state.selectedPhoto,
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    load: () => dispatch({ type: "LOADING" })
    // fetchPhotos: () => dispatch(fetchPhotos())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
