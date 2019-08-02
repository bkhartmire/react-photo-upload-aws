import React, { Component } from "react";
import "../styles/upload.css";
import { saveObject } from "../utils/index.js";
import { uploadPhoto } from "../redux.js";
import { connect } from "react-redux";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: ""
    };
  }

  uploadFile(e) {
    e.preventDefault();
    const file = e.target.files[0];
    saveObject(file)
      .then(() => {
        this.props.uploadPhoto({
          fileName: file.name,
          url: encodeURI(`http://react.sprint.s3.amazonaws.com/${file.name}`)
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="file-upload">
        <input onChange={e => this.uploadFile(e)} type="file" />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    uploadPhoto: photo => dispatch(uploadPhoto(photo))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Upload);
