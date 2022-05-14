import React from "react";

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
            <DrumPad />
          </div>
          <div id="display"></div>
        </div>
      </div>
    )

  }
}


export default App;
