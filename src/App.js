import React from "react";
import './App.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight, faPlay, faPause, faStop } from '@fortawesome/free-solid-svg-icons'

const perMinute = 60000;
const defaultBreakLength = 5;
const defaultSetBreakLength = defaultBreakLength * perMinute;
const defaultSessionLength = 25;
const defaultSetSessionLength = defaultSessionLength * perMinute;

const countDownInterval = 1000;

const sound = document.getElementById('beep');





class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      breakLength: defaultBreakLength,
      setBreakLength: defaultSetBreakLength,
      sessionLength: defaultSessionLength,
      setSessionLength: defaultSetSessionLength,
      isStopped: true,
      isPaused: false,
      isBreaking: false
    }
    this.handleIncreaseBreak = this.handleIncreaseBreak.bind(this)
    this.handleDecreaseBreak = this.handleDecreaseBreak.bind(this)
    this.handleIncreaseSession = this.handleIncreaseSession.bind(this)
    this.handleDecreaseSession = this.handleDecreaseSession.bind(this)

    this.countDown = this.countDown.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.handleStop = this.handleStop.bind(this)

    // this.handleSetTime = this.handleSetTime.bind(this)
  }
  // 处理点击

  // 点击加减
  // 程序在进行 不允许操作
  // 已经停止 判断 0 和 60，两组数值均进行调整 同时设置 length 和 set length，set length 等于 length * perMinute


  // 处理 开始
  // 程序处于暂停，判断处于 session or break，执行相应计时
  // 程序没有开始，把 session 处于倒计时

  // 处理 暂停
  // 停止当前

  // 处理 停止
  // 设置 is stopped 为 true，状态恢复为默认设置，设置声音停止


  // 倒计时逻辑
  // 使用倒计时的毫秒计算，每一秒减1000毫秒，使用计算后的值更新 state, 再以改state创建日期对象，再对日期对象 getMinutes() : getSeconds() 显示到 time-left

  // 处理倒计时

  //setting button begin
  handleIncreaseBreak() {
    if (!this.state.isStopped) {
      return
    }
    else if (this.state.breakLength === 60) {
      return
    }
    this.setState({
      breakLength: this.state.breakLength + 1,
      setBreakLength: this.state.setBreakLength + perMinute
    })

  }
  handleDecreaseBreak() {
    if (!this.state.isStopped) {
      return
    }
    else if (this.state.breakLength === 1) {
      return
    }
    this.setState(({
      breakLength: this.state.breakLength - 1,
      setBreakLength: this.state.setBreakLength - perMinute
    }))
  }

  handleIncreaseSession() {
    if (!this.state.isStopped) {
      return
    }
    else if (this.state.sessionLength === 60) {
      return
    }
    this.setState((state) => ({
      sessionLength: state.sessionLength + 1,
      setSessionLength: state.setSessionLength + perMinute
    }))
  }

  handleDecreaseSession() {
    if (!this.state.isStopped) {
      return
    }
    else if (this.state.sessionLength === 1) {
      return
    }
    this.setState({
      sessionLength: this.state.sessionLength - 1,
      setSessionLength: this.state.setSessionLength - perMinute
    });
  }


  //setting button end

  countDown() {
    let now = this.state.isBreaking ? 'setBreakLength' : 'setSessionLength';
    console.log('now', this.state[now])
    if (this.state[now] === 0) {
      this.setState(state => ({
        isBreaking: !state.isBreaking,
        setBreakLength: state.breakLength * perMinute,
        setSessionLength: state.sessionLength * perMinute,
      }));
      // sound.currentTime = 0;
      sound.play();
      return
    }
    this.setState({
      [now]: this.state[now] - 1000
    })

  }

  //controller button begin
  handleStart() {
    console.log('click start', this.handleStart)
    this.setState({
      isStopped: false,
      isPaused: false
    })
    this.timeId = setInterval(() => this.countDown(), countDownInterval);


  }
  handlePause() {
    console.log('click pause', this.handlePause)
    clearInterval(this.timeId)
    this.setState({
      isStopped: false,
      isPaused: true
    })

  }

  handleStop() {
    console.log('click stop')
    clearInterval(this.timeId)
    this.setState({
      breakLength: defaultBreakLength,
      setBreakLength: defaultSetBreakLength,
      sessionLength: defaultSessionLength,
      setSessionLength: defaultSetSessionLength,
      isStopped: true,
      isPaused: false,
      isBreaking: false
    })
  }
  //controller button end





  render() {
    const { breakLength, sessionLength, isStopped, isPaused, isBreaking } = this.state;
    let now = this.state.isBreaking ? 'setBreakLength' : 'setSessionLength';
    let time = new Date(this.state[now])
    let timeDisplay = ('0' + time.getMinutes().toString()).slice(-2) + ':' + ('0' + time.getSeconds().toString()).slice(-2)

    // console.log('time', time, 'display', timeDisplay, typeof(timeDisplay))
    return (
      <div id="container">
        <div id="tomato">
          <div id="title-green"></div>
          <div id="title">Tomato Clock</div>
          <div id="length-controller">
            <div id="break-area" className="controller-area">
              <div id="break-label" className="label">Break Length</div>
              <div className="set-area">
                <div id="break-decrement" onClick={this.handleDecreaseBreak}><FontAwesomeIcon icon={faCaretLeft} /></div>
                <div id="break-length" className="value">{breakLength}</div>
                <div id="break-increment" onClick={this.handleIncreaseBreak}><FontAwesomeIcon icon={faCaretRight} /></div>
              </div>
            </div>
            <div id="session-area" className="controller-area">
              <div id="session-label" className="label">Session Length</div>
              <div className="set-area">
                <div id="session-decrement" onClick={this.handleDecreaseSession}><FontAwesomeIcon icon={faCaretLeft} /></div>
                <div id="session-length" className="value">{sessionLength}</div>
                <div id="session-increment" onClick={this.handleIncreaseSession}><FontAwesomeIcon icon={faCaretRight} /></div>
              </div>
            </div>

          </div>
          <div id="time-display">
            <div id="timer-label" className="label">{isBreaking ? 'Break' : 'Session'}</div>
            <div id="time-left">{timeDisplay}</div>
            <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
          </div>
          <div id="time-controller">
            {isStopped ? <div id="start_stop" className="circle-button" onClick={this.handleStart}> <FontAwesomeIcon icon={faPlay} /> </div> :
              isPaused ? <div id="start_stop" className="circle-button" onClick={this.handleStart}><FontAwesomeIcon icon={faPlay} /> </div> :
                <div id="start_stop" className="circle-button" onClick={this.handlePause}><FontAwesomeIcon icon={faPause} /></div>}
            <div id="reset" className="circle-button" onClick={this.handleStop}><FontAwesomeIcon icon={faStop} /></div>


          </div>
        </div>
      </div>
    )
  }
}


export default App;
