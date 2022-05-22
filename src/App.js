import React from "react";
import './App.scss';

const lastTwo = /[-+*/]-$/;
const lastOne = /[-+*/]$/;

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
    this.handleAC = this.handleAC.bind(this)
    this.handleDecimal = this.handleDecimal.bind(this)
    this.handleNumber = this.handleNumber.bind(this)
    this.handleOperator = this.handleOperator.bind(this)
    this.handleEquals = this.handleEquals.bind(this)
  }

  handleAC(e) {
    const value = e.target.innerText
    this.props.handleAC(value)
  }
  handleDecimal(e) {
    const value = e.target.innerText
    this.props.handleDecimal(value)
  }
  handleNumber(e) {
    const value = e.target.innerText
    this.props.handleNumber(value)
  }
  handleOperator(e) {
    const value = e.target.innerText
    this.props.handleOperator(value)
  }
  handleEquals(e) {
    const value = e.target.innerText
    this.props.handleEquals(value)
  }

  render() {
    return (
      <div id="button-area">
        <div onClick={this.handleAC} id="clear" className="button">AC</div>
        <div onClick={this.handleNumber} id="delete" className="button">?</div>
        <div onClick={this.handleOperator} id="divide" className="operator-button button">/</div>
        <div onClick={this.handleNumber} id="seven" className=" button">7</div>
        <div onClick={this.handleNumber} id="eight" className=" button">8</div>
        <div onClick={this.handleNumber} id="nine" className=" button">9</div>
        <div onClick={this.handleOperator} id="multiply" className="operator-button button">*</div>
        <div onClick={this.handleNumber} id="four" className=" button">4</div>
        <div onClick={this.handleNumber} id="five" className=" button">5</div>
        <div onClick={this.handleNumber} id="six" className=" button">6</div>
        <div onClick={this.handleOperator} id="subtract" className="operator-button button">-</div>
        <div onClick={this.handleNumber} id="one" className=" button">1</div>
        <div onClick={this.handleNumber} id="two" className=" button">2</div>
        <div onClick={this.handleNumber} id="three" className=" button">3</div>
        <div onClick={this.handleOperator} id="add" className="operator-button button">+</div>
        <div onClick={this.handleNumber} id="zero" className=" button">0</div>
        <div onClick={this.handleDecimal} id="decimal" className=" button">.</div>
        <div onClick={this.handleEquals} id="equals" className="operator-button button">=</div>
      </div>
    )
  }
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formula: '0',
      display: '0',
      isEvaluated: false
    }
    this.handleNumber = this.handleNumber.bind(this)
    this.handleOperator = this.handleOperator.bind(this)
    this.handleDecimal = this.handleDecimal.bind(this)
    this.handleAC = this.handleAC.bind(this)
    this.handleEquals = this.handleEquals.bind(this)
  }

  //处理 number
  //判断 display 为 0，如果输入值也为 0，不做操作，输入值不为 0，display 等于输入值， formula 删掉最后一位再后面加入输入值
  //判断 上一个为运算符，display 等于输入值，formula 后面加入输入值
  //其他情况 display 和 formula 后面加入输入值
  handleNumber(e) {
    const { formula, display, isEvaluated } = this.state;
    if (isEvaluated) {
      this.setState({
        display: e,
        formula: e,
        isEvaluated: false
      })
    }
    else if (display == '0' && e == '0') {
      return
    } else if (display == '0') {
      this.setState(
        {
          display: e,
          formula: formula.slice(0, -1) + e
        }
      )
    } else if (display == '+' || display == '-' || display == '*' || display == '/') {
      this.setState(
        {
          display: e,
          formula: formula + e
        }
      )
    } else {
      this.setState(
        {
          display: display + e,
          formula: formula + e
        }
      )
    }
  }


  //处理 加减乘除
  //判断 display 为 计算结果，display 为输入值，formula 为 display 加上输入值
  //判断 formula 为 2 位运算符，输入值为“-”时，不做操作；输入其他值 display 等于输入值，formula 删除最后 2 位再加入输入值  
  //判断 formula 为 1 位运算符，输入值为“-”时，display 等于输入值，formula 加入输入值；输入其他值，display 等于输入值，formula 删除最后 1 位再加入输入值


  //其他情况 display 等于输入值，formula 加入输入值
  handleOperator(e) {
    const { formula, display, isEvaluated } = this.state;
    if (isEvaluated) {
      this.setState({
        display: e,
        formula: display + e,
        isEvaluated: false
      })
    } else if (lastTwo.test(formula) && e == '-') {
      return
    } else if (lastTwo.test(formula)) {
      this.setState({
        display: e,
        formula: formula.slice(0,-2) + e
      })
    } else if (lastOne.test(formula) && e == '-') {
      this.setState({
        display: e,
        formula: formula + e
      })
    } else if (lastOne.test(formula)) {
      this.setState({
        display: e,
        formula: formula.slice(0,-1) + e
      })
    } else {
      this.setState({
        display: e,
        formula: formula + e
      })
    }


  }


  //处理 小数点
  //判断 display 没有“.”，display 和 formula 后面加入输入值
  handleDecimal(e) {
    const { formula, display } = this.state;
    if (!display.includes('.')) {
      this.setState(() => ({
        formula: formula + e,
        display: display + e
      }))
    }
  }


  //处理 AC 
  //display 为 “0”，formula 为 “”
  handleAC() {
    const { formula, display } = this.state;
    this.setState({
      formula: '0',
      display: '0'
    })
  }


  //处理 等于
  //处理公式里面的 “-”，如果 为 --5，改为 -(-5)
  //执行 eval（formula）
  //formula 等于 formula +”=“+ result
  //display 等于 result
  handleEquals(e) {
    const { formula, display, isEvaluated } = this.state;
    let result = eval(formula)
    this.setState({
      display: result,
      formula: formula + '=' + result,
      isEvaluated: true
    })

  }


  render() {
    return (
      <div id="container">
        <div id="calculator">
          <Display viewData={this.state} />
          <Button
            handleNumber={this.handleNumber}
            handleOperator={this.handleOperator}
            handleDecimal={this.handleDecimal}
            handleAC={this.handleAC}
            handleEquals={this.handleEquals}
          />
        </div>


      </div>
    )

  }
}


export default App;
