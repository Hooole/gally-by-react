import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import ImgFigure from "./components/imgFigure.js";
import { imageData } from "./data/imageDatas.js";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgsArrangeArr: [
        /*{
          pos:{
            left:0,
            top:0
          }
        }*/
      ]
    }
    this.Constant = {
      //中心图片位置
      centerPos: {
        left: 0,
        top: 0
      },
      //水平图片区的left,top临界值
      leftPos: {
        leftSecX: [0, 0], //左侧left临界值
        rightSecX: [0, 0], //右侧left临街值
        y: [0, 0]
      },
      //上侧图片区的left,top临界值
      topPos: {
        x: [0, 0],
        y: [0, 0]
      }
    };
  }
  /*
    *重新布局所有图片
    @param centerIndex指定居中排布哪个图片
  */
  rearrange(centerIndex) {

  }
  /*
    组件渲染完成后执行的操作
    组件加载以后,为每张图片计算其位置的范围
  */
  componentDidMount() {
    // 拿到内容区的大小
    let appDom = findDOMNode(this.refs.app),
      appW = appDom.scrollWidth,
      appH = appDom.scrollHeight,
      halfAppW = Math.ceil(appW / 2),
      halfAppH = Math.ceil(appH / 2);
    // 拿到imgFigure的大小
    let imgFigureDom = findDOMNode(this.refs.imgFigure0),
      imgFigureW = imgFigureDom.scrollWidth,
      imgFigureH = imgFigureDom.scrollHeight,
      halfImgW = Math.ceil(imgFigureW / 2),
      halfImgH = Math.ceil(imgFigureH / 2);
    // 计算中心图片的位置点
    this.Constant.centerPos = {
      left: halfAppW - halfImgW,
      top: halfAppH - halfImgH
    };
    // 计算水平位置图片的位置区
    this.Constant.leftPos.leftSecX[0] = -halfImgW;
    this.Constant.leftPos.leftSecX[1] = halfAppW - halfImgW * 3;
    this.Constant.leftPos.rightSecX[0] = halfAppW + halfImgW;
    this.Constant.leftPos.rightSecX[1] = appW - halfImgW;
    this.Constant.leftPos.y[0] = -halfImgH;
    this.Constant.leftPos.y[1] = appH + halfImgH;
    // 计算上侧图片的位置区
    this.Constant.topPos.x[0] = halfAppW - imgFigureW;
    this.Constant.topPos.x[1] = halfAppW;
    this.Constant.topPos.y[0] = -halfImgH;
    this.Constant.topPos.y[0] = halfAppH - halfImgH * 3;

    this.rearrange(0);
    console.log(this.Constant);
  }
  render() {
    let imgFigure = [];
    imageData.forEach((value, index) => {
      if (!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          }
        }
      }
      imgFigure.push(
        <ImgFigure data={value} key={index} ref={"imgFigure" + index} />
      );
    });
    return (
      <div className="App" ref="app">
        <div className="img-sec">{imgFigure}</div>
        <div className="controller-nav" />
      </div>
    );
  }
}

export default App;
