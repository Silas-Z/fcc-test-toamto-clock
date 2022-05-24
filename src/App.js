import React from "react";
import './App.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCaretUp, faSquareCaretDown} from '@fortawesome/free-solid-svg-icons'



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
              <div id="break-decrement"><FontAwesomeIcon icon={faSquareCaretDown} /></div>
              <div id="break-length">{this.state.breakLength}</div>
              <div id="break-increment"><FontAwesomeIcon icon={faSquareCaretUp} /></div>

            </div>
            <div id="session-area">
              <div id="session-label">Session Length</div>
              <div id="session-decrement"><FontAwesomeIcon icon={faSquareCaretDown} /></div>
              <div id="session-length">{this.state.sessionLength}</div>
              <div id="session-increment"><FontAwesomeIcon icon={faSquareCaretUp} /></div>
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
