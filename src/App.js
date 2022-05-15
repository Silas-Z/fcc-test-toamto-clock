import React from "react";
import './App.scss';

const drumResource = [
  {
    id: 'Q',
    keyCode: '00',
    scr: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    description: 'no description'
  },
  {
    id: 'W',
    keyCode: '00',
    scr: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    description: 'no description'
  },
  {
    id: 'E',
    keyCode: '00',
    scr: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    description: 'no description'
  },
  {
    id: 'A',
    keyCode: '00',
    scr: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    description: 'no description'
  },
  {
    id: 'S',
    keyCode: '00',
    scr: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    description: 'no description'
  },
  {
    id: 'D',
    keyCode: '00',
    scr: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    description: 'no description'
  }, {
    id: 'Z',
    keyCode: '00',
    scr: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    description: 'no description'
  },
  {
    id: 'X',
    keyCode: '00',
    scr: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    description: 'no description'
  },
  {
    id: 'C',
    keyCode: '00',
    scr: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
    description: 'no description'
  },
]

class DrumPad extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isPressed: false,
    }
    this.handlePress = this.handlePress.bind(this)
    this.playSound = this.playSound.bind(this)
  }
  handlePress(e) {
    this.setState({ isPressed: true })
    setTimeout(() => {
      this.setState({ isPressed: false })
    }, 100);
    this.playSound(e);
  }
  playSound (e){
    const sound = e.target.firstElementChild;
    sound.currentTime = 0;
    sound.play();

  }
  render() {
    let item = this.props.drumResource;
    return (
      <div className={this.state.isPressed ? "drum-pad press" : "drum-pad"} id={item.id.toLowerCase()} onClick={this.handlePress}>
        <audio className="clip" id={item.id} src={item.scr} ></audio>
        {item.id}
      </div>

    )
  }

}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: 'Nothing'
    }
  }
  handleClick() {

  }
  render() {
    const drumPads = drumResource.map(
      item =>
        <DrumPad drumResource={item} key={item.id}/>)
    return (
      <div id="container">
        <div id="drum-machine">
          <div id="drum-area">{drumPads}</div>

          <div id="display">
            <div id="content">{this.state.display}</div>
          </div>
        </div>
      </div>
    )

  }
}


export default App;
