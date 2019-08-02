import React from "react";
import { connect } from "react-redux";
import { getSingleObject } from "../utils/index";
import { selectPhoto } from "../redux";

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
    // debugger;
    const base64 = this.props.includesBase64(this.props.photoKey);
    if (base64) {
      this.setState({ done: true, base64: base64 });
    } else {
      getSingleObject(this.props.photoKey).then(res => {
        // this.props.insertBase64(res, this.props.photoKey);
        const JS = JSON.stringify;
        const JP = JSON.parse;
        let lsB64 = window.localStorage.base64s;
        const parsedString = JP(lsB64);
        lsB64 = JS([...parsedString, res]);
        let lsPhotoKeys = window.localStorage.photoKeys;
        lsPhotoKeys = JS([...JP(lsPhotoKeys), this.props.photoKey]);
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
    selectPhoto: () => dispatch(selectPhoto())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SinglePhoto);
