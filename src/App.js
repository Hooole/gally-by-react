import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import ImgFigure from "./components/imgFigure.js";
import { imageData } from "./data/imageDatas.js";
import { getRangeRandom, get30Deg } from "./base/utils.js";
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
          },
          rotate:0, //旋转角度
          isInverse:false, // 图片正反面
          isCenter:false  // 图片居中
        }*/
      ]
    };
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
    let { imgsArrangeArr } = this.state;
    let { centerPos, leftPos, topPos } = this.Constant;
    /*
      *根据传入的索引获取到居中的图片
      *设置居中图片的位置
    */
    let center = imgsArrangeArr.splice(centerIndex, 1);
    center[0] = {
      pos: centerPos,
      rotate: 0,
      isCenter:true
    };
    let imgsArrangeTopArr = [],
      topImgNum = Math.floor(Math.random() * 2), //取一个或者不取
      topImgArrangeIndex = Math.floor(Math.random() * imgsArrangeArr.length); // 标记布局上侧图片的数组索引
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgArrangeIndex, topImgNum);
    /*设置位于上侧的图片位置信息*/
    imgsArrangeTopArr.forEach((value, index) => {
      imgsArrangeTopArr[index] = {
        pos: {
          top: getRangeRandom(topPos.y[0], topPos.y[1]),
          left: getRangeRandom(topPos.x[0], topPos.x[1])
        },
        rotate: get30Deg(),
        isCenter:false
      };
    });
    /*设置位于左右侧的图片位置信息*/
    for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
      let xSec = i < k ? leftPos.leftSecX : leftPos.rightSecX;
      imgsArrangeArr[i] = {
        pos: {
          top: getRangeRandom(leftPos.y[0], leftPos.y[1]),
          left: getRangeRandom(xSec[0], xSec[1])
        },
        rotate: get30Deg(),
        isCenter:false
      };
    }
    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgArrangeIndex, 0, imgsArrangeTopArr[0]);
    }
    imgsArrangeArr.splice(centerIndex, 0, center[0]);
    this.setState({ imgsArrangeArr });
  }

  /*
    *翻转图片
    *params index 传入当前被执行inverse操作的图片对应信息的index值
  */
  inverse(index) {
    let { imgsArrangeArr } = this.state;
    imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
    this.setState({
      imgsArrangeArr
    });
  }

  /*
    *居中图片
    *params index 传入当前需要被居中的index的索引值
  */ 
  center(index) {
    this.rearrange(index)
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
    this.Constant.leftPos.y[1] = appH - halfImgH;
    // 计算上侧图片的位置区
    this.Constant.topPos.x[0] = halfAppW - imgFigureW;
    this.Constant.topPos.x[1] = halfAppW;
    this.Constant.topPos.y[0] = -halfImgH;
    this.Constant.topPos.y[1] = halfAppH - halfImgH * 3;

    this.rearrange(0);

  }
  render() {
    let imgFigure = [];
    imageData.forEach((value, index) => {
      if (!this.state.imgsArrangeArr[index]) {
        // eslint-disable-next-line
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0,
          isInverse: false
        };
      }
      imgFigure.push(
        <ImgFigure
          data={value}
          key={index}
          ref={"imgFigure" + index}
          arrange={this.state.imgsArrangeArr[index]}
          inverse= {this.inverse.bind(this,index)}
          center = {this.center.bind(this,index)}
        />
      );
    });
    return (
      <div className="App" ref="app">
        <div className="img-sec">{imgFigure}</div>
        <div className="controller-nav" ></div>
      </div>
    );
  }
}

export default App;
