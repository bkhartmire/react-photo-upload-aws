import React from "react";
import { connect } from "react-redux";
import { getSingleObject } from "../utils/index";
import { selectPhoto, insertBase64 } from "../redux";

export class SinglePhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base64: undefined,
      done: false,
      selected: false
    };
  }

  // includesBase64() {
  //   if (this.props.photos[this.props.index].Key === this.fileName){
  //     this.setState({base64: this.props.base64Array[this.props.index], done: true});
  //   } else {
  //     getSingleObject(this.props.fileName).then(res => {
  //       this.setState({base64: res, done: true});
  //     })
  //   };

  // }

  componentDidMount() {
    if (this.props.photos[this.props.index].Key === this.fileName) {
      this.setState({
        base64: this.props.base64Array[this.props.index],
        done: true
      });
    } else {
      getSingleObject(this.props.fileName).then(res => {
        // this.props.load();
        this.props.insertBase64(res);
        this.setState({ base64: res, done: true });
      });
    }
    // debugger;
    // const base64 = this.props.includesBase64(this.props.photoKey);
    // const base64 = this.includesBase64();
    // if (base64) {
    //   // this.setState({ done: true, base64: base64 });
    // } else {
    // getSingleObject(this.props.photoKey).then(res => {
    //   // this.props.insertBase64(res, this.props.photoKey);
    //   const JS = JSON.stringify;
    //   const JP = JSON.parse;
    //   let lsB64 = window.localStorage.base64s;
    //   const parsedString = JP(lsB64);
    //   lsB64 = JS([...parsedString, res]);
    //   let lsPhotoKeys = window.localStorage.photoKeys;
    //   lsPhotoKeys = JS([...JP(lsPhotoKeys), this.props.photoKey]);
    //   this.setState({ done: true, base64: res });
    // });
    // }
  }

  render() {
    return (
      <div className="imageCell">
        <img
          onClick={() => {
            if (!this.props.selected) {
              this.props.select({
                title: this.props.fileName,
                base64: this.state.base64
              });
            }
          }}
          className={"image " + this.props.class}
          src={`data:image/png;base64,  ${this.state.base64}`}
          // this.props.photo
          // ? `data:image/png;base64,  ${this.props.photo.base64}`
          // : `data:image/png;base64,  ${this.state.base64}`
          // }
          alt={this.props.fileName}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    photos: state.photos,
    base64Array: state.base64Array
    // photoKeys: state.photoKeys
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectPhoto: () => dispatch(selectPhoto()),
    // load: () => dispatch({type: "LOADING"}),
    insertBase64: () => dispatch(insertBase64())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePhoto);
