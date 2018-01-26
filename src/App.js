import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
let i = 0
let myStyle = {
  fontSize:14,
  color:'orange'
}
let index = 1
let arr = [
  <h1 key={index}>菜鸟教程呢</h1>,
  <h2 key={index+1}>学的不仅是技术,更是梦想</h2>
]
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">欢迎来到菜鸟教程</h1>
        </header>
        <p className="App-intro">
          你可以在 <code>src/App.js</code> 文件中修改
        </p>
        <div>
          <h1>菜鸟教程</h1>
          <h2>欢迎学习React</h2>
          {/*这是注释*/}
          <p data-myattribute="somevalue">这是一个很不错的JavaScript库</p>
          <p>{1+1}</p>
          <h1 style={myStyle}>{i===1?'True!':'False'}</h1>
          <div>{arr}</div>
        </div>
      </div>
    );
  }
}

export default App;



