import React, { Component } from "react";

class ImgFigure extends Component {
  render() {
    let data = this.props.data;
    return (
      <figure className="img-figure">
        <img src={data.url} alt={data.title}/>
        <figcaption>
          <h2 className="img-title">{data.title}</h2>
        </figcaption>
      </figure>
    );
  }
}

export default ImgFigure;
