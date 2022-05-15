import React from "react";
import './App.scss';

function DrumPad() {
  return (
    <div className="drum-pad"></div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div id="container">
        <div id="drum-machine">
          <div id="drum-area">
            {/* <DrumPad />
            <DrumPad />
            <DrumPad />
            <DrumPad />
            <DrumPad />
            <DrumPad />
            <DrumPad />
            <DrumPad />
            <DrumPad /> */}
          </div>
          <div id="display">
            <div>This is</div>
          </div>
        </div>
      </div>
    )

  }
}


export default App;
