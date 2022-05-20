import React from "react";
import './App.scss';

class Display extends React.Component {
  constructor(){
    super()
  }

  render(){
    const {formula,display} = this.props.viewData;
    return(
      <div id="view-area">
        <div id="formula">{formula}</div>
        <div id="display">{display}</div>
      </div>

      )
  }
}



class Button extends React.Component {
  constructor(props){
    super(props)
    this.handleNumOnClick = this.handleNumOnClick.bind(this)
  }
  
  handleNumOnClick (e){
    const value = e.target.innerText
    console.log(value)
    this.props.handlePress(value)

  }
  render() {
    return (
      <div id="button-area">
        <div id="clear" className="button">AC</div>
        <div id="delete" className="button">?</div>
        <div id="divide" className="calc-button button">+</div>
        <div onClick={this.handleNumOnClick} id="seven" className="num-button button">7</div>
        <div onClick={this.handleNumOnClick} id="eight" className="num-button button">8</div>
        <div onClick={this.handleNumOnClick} id="nine" className="num-button button">9</div>
        <div id="multiply" className="calc-button button">×</div>
        <div onClick={this.handleNumOnClick} id="four" className="num-button button">4</div>
        <div onClick={this.handleNumOnClick} id="five" className="num-button button">5</div>
        <div onClick={this.handleNumOnClick} id="six" className="num-button button">6</div>
        <div id="subtract" className="calc-button button">-</div>
        <div onClick={this.handleNumOnClick} id="one" className="num-button button">1</div>
        <div onClick={this.handleNumOnClick} id="two" className="num-button button">2</div>
        <div onClick={this.handleNumOnClick} id="three" className="num-button button">3</div>
        <div id="add" className="calc-button button">+</div>
        <div onClick={this.handleNumOnClick} id="zero" className="num-button button">0</div>
        <div id="decimal" className="num-button button">.</div>
        <div id="equals" className="calc-button button">=</div>

      </div>
    )
  }
}



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formula:'0',
      display: '0'
    }
    this.handlePress = this.handlePress.bind(this)
  }
  handlePress (e){
    this.setState(({
      display:e
    }))
  }
  render() {
    return (
      <div id="container">
        <div id="calculator">
        <Display viewData={this.state}/>
        <Button handlePress={this.handlePress}/>
        </div>


      </div>
    )

  }
}


export default App;
