import React, { Component } from "react";
import { prefixStyle } from "../base/utils.js";

class ImgFigure extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
  }
  getImageStyle() {
    let styleObj = {};
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }
    if (this.props.arrange.rotate) {
      styleObj[prefixStyle("transform")] = `rotate(${
        this.props.arrange.rotate
      }deg)`;
    }
    return styleObj;
  }
  render() {
    let styleObj = this.getImageStyle();
    let data = this.props.data;
    let imgfigureClassName = "img-figure";

    imgfigureClassName += this.props.arrange.isInverse ? "is-inverse" : "";
    return (
      <figure className={imgfigureClassName} style={styleObj} onClick={this.handleClick}>
        <img src={data.url} alt={data.title} />
        <figcaption>
          <h2 className="img-title">{data.title}</h2>
          <div className="img-back">

          </div>
        </figcaption>
      </figure>
    );
  }
}

export default ImgFigure;
