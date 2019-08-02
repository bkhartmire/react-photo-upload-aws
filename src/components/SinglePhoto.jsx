import React from "react";
import { getSingleObject } from "../utils/index";

export class SinglePhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base64: undefined,
      done: false,
      selected: false
    };
  }

  componentDidMount() {
    const base64 = this.props.includesBase64(this.props.photoKey);
    if (base64) {
      this.setState({ done: true, base64: base64 });
    } else {
      getSingleObject(this.props.photoKey).then(res => {
        // this.props.insertBase64(res, this.props.photoKey);
        const JS = JSON.stringify;
        const JP = JSON.parse;
        let lsB64 = window.localStorage.base64;
        lsB64 = JS([...JP(lsB64), res]);
        let lsPhotoKeys = window.localStorage.photoKeys;
        lsPhotoKeys = JS([...JP(lsPhotoKeys), res]);
        this.setState({ done: true, base64: res });
      });
    }
  }

  render() {
    return (
      <div className="imageCell">
        <img
          onClick={() => {
            if (!this.props.selected) {
              this.props.select({
                title: this.props.photoKey,
                base64: this.state.base64
              });
            }
          }}
          className={"image " + this.props.class}
          src={
            this.props.photo
              ? `data:image/png;base64,  ${this.props.photo.base64}`
              : `data:image/png;base64,  ${this.state.base64}`
          }
          alt={this.props.photoKey}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPhotos: () => dispatch(getPhotos()),
    fetchPhotos: () => dispatch(fetchPhotos())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SinglePhoto);
