import React, { Component } from "react";
import "../styles/upload.css";
import { saveObject, getSingleObject } from "../utils/index.js";

export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: ""
    };
  }

  uploadFile(e) {
    e.preventDefault();
    const file = e.target.files[0];
    const props = this.props;
    saveObject(file)
      .then(() => {
        getSingleObject(file.name).then(res => {
          // const lsPhotoKeys = window.localStorage.getItem("photoKeys");
          // window.localStorage.setItem(
          //   "photoKeys",
          //   JSON.stringify([...lsPhotoKeys, file.name])
          // );
          // const lsBase64s = window.localStorage.getItem("base64s");
          window.localStorage.clear();
          //   "base64s",
          //   JSON.stringify([...lsBase64s, res])
          // );
          props.select({ title: file.name, base64: res });
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
