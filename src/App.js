import React from "react";
import './App.scss';

class Display extends React.Component {
  constructor() {
    super()
  }

  render() {
    const { formula, display } = this.props.viewData;
    return (
      <div id="view-area">
        <div id="formula">{formula}</div>
        <div id="display">{display}</div>
      </div>

    )
  }
}



class Button extends React.Component {
  constructor(props) {
    super(props)
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick(e) {
    const value = e.target.innerText
    console.log('buttonValue', value)
    this.props.handlePress(value)

  }
  render() {
    return (
      <div id="button-area">
        <div onClick={this.handleOnClick} id="clear" className="button">AC</div>
        <div onClick={this.handleOnClick} id="delete" className="button">?</div>
        <div onClick={this.handleOnClick} id="divide" className="calc-button button">÷</div>
        <div onClick={this.handleOnClick} id="seven" className=" button">7</div>
        <div onClick={this.handleOnClick} id="eight" className=" button">8</div>
        <div onClick={this.handleOnClick} id="nine" className=" button">9</div>
        <div onClick={this.handleOnClick} id="multiply" className="calc-button button">×</div>
        <div onClick={this.handleOnClick} id="four" className=" button">4</div>
        <div onClick={this.handleOnClick} id="five" className=" button">5</div>
        <div onClick={this.handleOnClick} id="six" className=" button">6</div>
        <div onClick={this.handleOnClick} id="subtract" className="calc-button button">-</div>
        <div onClick={this.handleOnClick} id="one" className=" button">1</div>
        <div onClick={this.handleOnClick} id="two" className=" button">2</div>
        <div onClick={this.handleOnClick} id="three" className=" button">3</div>
        <div onClick={this.handleOnClick} id="add" className="calc-button button">+</div>
        <div onClick={this.handleOnClick} id="zero" className=" button">0</div>
        <div onClick={this.handleOnClick} id="decimal" className=" button">.</div>
        <div onClick={this.handleOnClick} id="equals" className="calc-button button">=</div>

      </div>
    )
  }
}



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formula: '0',
      display: '0'
    }
    this.handlePress = this.handlePress.bind(this)
  }

  //处理 number
  //判断 初始状态，formula 为空，display 和 formula 等于输入值
  //判断 display 为 0，如果输入值也为 0，不做操作，输入值不为 0，display 等于输入值， formula 后面加入输入值
  //判断 上一个为运算符，display 等于输入值，formula 后面加入输入值
  //其他情况 display 和 formula 后面加入输入值

  //处理 加减乘除
  //判断 初始状态，formula 为空，不能输入值
  //判断 formula 为 1 位运算符，输入值为“-”时，display 等于输入值，formula 加入输入值；输入其他值，display 等于输入值，formula 删除最后 1 位再加入输入值
  //判断 formula 为 2 位运算符，输入值为“-”时，不做操作；输入其他值 display 等于输入值，formula 删除最后 2 位再加入输入值
  //其他情况 display 和 formula 等于输入值
  
  //处理 小数点
  //判断 display 有“.”，不做操作
  //其他情况 display 和 formula 等于输入值

  //处理 AC 
  //display 为 “0”，formula 为 “”
  
  //处理 等于
  //处理公式里面的 “-”，如果 为 --5，改为 -(-5)
  //执行 eval（formula）
  //formula 等于 formula +”=“+ result
  //display 等于 result

  handlePress(e) {
    const { formula, display } = this.state;
    const lastCharacter = display[display.length - 1]
    console.log('lastCharacter', lastCharacter)

    switch (e) {
      case 'AC':
        this.setState({
          formula: '0',
          display: '0'
        })
        break;

      case '.':
        if (!display.includes('.')) {
          this.setState(() => ({
            display: display + e
          }))
        }

        break;

      // case '+':
      // case '×':
      // case '-':
      // case '÷':
      //   if (!display == '+' || !display == '×' || !display == '-' || !display == '÷') {
      //     this.setState(() => ({
      //       display: e,
      //       formula: formula + e
      //     }))
      //   }
      //   break;




      default:
        if (formula == '0' || lastCharacter == '+' || lastCharacter == '×' || lastCharacter == '-' || lastCharacter == '÷') {
          this.setState({
            display: e,
            formula: formula + e
          })
        } else if (!display == '0') {
          this.setState(() => ({
            display: display + e,
            formula: formula + e
          }))

        }
    }

  }
  render() {
    return (
      <div id="container">
        <div id="calculator">
          <Display viewData={this.state} />
          <Button handlePress={this.handlePress} />
        </div>


      </div>
    )

  }
}


export default App;
