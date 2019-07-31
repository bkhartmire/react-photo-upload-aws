import React, { Component } from "react";
import _ from "lodash";
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
