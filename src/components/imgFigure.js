import React, { Component } from "react";
import { prefixStyle } from "../base/utils.js";

class ImgFigure extends Component {
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
  getImageStyle() {
    let styleObj = {};
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }
    styleObj = JSON.parse(JSON.stringify(styleObj));
    if (this.props.arrange.rotate) {
      styleObj[prefixStyle("transform")] = `rotate(${
        this.props.arrange.rotate
      }deg)`;
    }
    if (this.props.arrange.isCenter) {
      styleObj.zIndex = 101;
    }
    return styleObj;
  }
  render() {
    let styleObj = this.getImageStyle();
    let data = this.props.data;
    let imgfigureClassName = "img-figure";

    imgfigureClassName += this.props.arrange.isInverse ? " is-inverse" : " ";
    return (
      <figure
        className={imgfigureClassName}
        style={styleObj}
        onClick={this.handleClick}
      >
        <img src={data.url} alt={data.title} />
        <figcaption>
          <h2 className="img-title">{data.title}</h2>
          <div className="img-back" onClick={this.handleClick}>
            <p>{data.desc}</p>
          </div>
        </figcaption>
      </figure>
    );
  }
}
export default ImgFigure;
