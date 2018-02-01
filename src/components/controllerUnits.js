import React, { Component } from "react";

class controllerUnits extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    if (this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }
    e.stopPropagation();
    e.preventDefault();
  }
  render() {
    let controllerUnit = "controller-unit";
    if (this.props.arrange.isCenter) {
      controllerUnit += " is-center";
      if (this.props.arrange.isInverse) {
        controllerUnit += " is-inverse";
      }
    }
    return <span className={controllerUnit} onClick={this.handleClick} />;
  }
}

export default controllerUnits;
