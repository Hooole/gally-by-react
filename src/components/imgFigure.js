import React, { Component } from "react";
import { prefixStyle } from "../base/utils.js";

class ImgFigure extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    this.props.inverse();
    e.stopPropagation();
    e.preventDefault();
  }
  getImageStyle() {
    let styleObj = {};
    console.log(styleObj);
    if (this.props.arrange.pos) {
      console.log(this.props.arrange)
      styleObj = this.props.arrange.pos;
    }
    console.log(styleObj);
    if (this.props.arrange && this.props.arrange.rotate) {
      styleObj["transform"] = 'rotate('+this.props.arrange.rotate+'deg)';
    }
    console.log(styleObj);
    return styleObj;
  }
  render() {
    let styleObj = this.getImageStyle();
    // console.log(styleObj);
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
