import React from "react";
import { connect } from "react-redux";
import { selectPhoto } from "../redux";

class SinglePhoto extends React.Component {
  render() {
    return (
      <div className="imageCell">
        <img
          onClick={() => {
            if (!this.props.selected) {
              this.props.selectPhoto({
                fileName: this.props.fileName,
                url: this.props.url
              });
            }
          }}
          className={"image " + this.props.class}
          src={this.props.url}
          alt={this.props.fileName}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectPhoto: photo => dispatch(selectPhoto(photo))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SinglePhoto);
