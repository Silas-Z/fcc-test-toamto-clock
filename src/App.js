import React from "react";
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      breakLength: 5,
      sessionLength: 20

    }


  }
  render() {
    return (
      <div id="container">
        <div id="tomato">
          <div id="title">Tomato Clock</div>
          <div id="length-controller">
            <div id="break-area">
              <div id="break-label">Break Length</div>
              <div id="break-decrement"></div>
              <div id="break-length">{this.state.breakLength}</div>
              <div id="break-increment"><FontAwesomeIcon icon="fa-regular fa-circle-chevron-up" /></div>

            </div>
            <div id="session-area">
              <div id="session-label">Session Length</div>
              <div id="session-decrement"></div>
              <div id="session-length">{this.state.sessionLength}</div>
              <div id="session-increment"></div>
            </div>

          </div>
          <div id="time-display">
            <div id="timer-label">Session</div>
            <div id="time-left"></div>
          </div>
          <div id="timer-controller">
            <div id="start_stop"></div>
            <div id="reset"></div>
          </div>
        </div>
      </div>
    )
  }
}


export default App;
