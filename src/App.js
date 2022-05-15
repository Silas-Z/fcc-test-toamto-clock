import React from "react";
import './App.scss';



const drumResource = [
  {
    id: 'Q',
    code: 'KeyQ',
    scr: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    description: 'Q description'
  },
  {
    id: 'W',
    code: 'KeyW',
    scr: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    description: 'W description'
  },
  {
    id: 'E',
    code: 'KeyE',
    scr: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    description: 'E description'
  },
  {
    id: 'A',
    code: 'KeyA',
    scr: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    description: 'A description'
  },
  {
    id: 'S',
    code: 'KeyS',
    scr: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    description: 'S description'
  },
  {
    id: 'D',
    code: 'KeyD',
    scr: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    description: 'D description'
  }, {
    id: 'Z',
    code: 'KeyZ',
    scr: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    description: 'Z description'
  },
  {
    id: 'X',
    code: 'KeyX',
    scr: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    description: 'X description'
  },
  {
    id: 'C',
    code: 'KeyC',
    scr: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
    description: 'C description'
  },
]

class DrumPad extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isPressed: false,
    }
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this)
    this.changeIsPressed = this.changeIsPressed.bind(this)
    this.playSound = this.playSound.bind(this)
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleOnKeyDown)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleOnKeyDown)
  }
  handleOnClick(e) {
    this.changeIsPressed()

    
    this.props.setDisplay(e.target.id);
    console.log(e.target)
    this.playSound(e.target.firstElementChild.id);
  }

  handleOnKeyDown(e) {
    let item = this.props.drumResource;
    if (e.code == item.code) {
      console.log(e)
      this.changeIsPressed()
      this.playSound(item.id);
      // 处理 display 组件显示
      this.props.setDisplay(item.description);

    }

  }

  changeIsPressed() {
    this.setState({ isPressed: true })
    setTimeout(() => {
      this.setState({ isPressed: false })
    }, 100);
  }

  playSound(e) {
    const sound = document.getElementById(e);
    sound.currentTime = 0;
    sound.play();

  }

  render() {
    let item = this.props.drumResource;

    return (
      <div
        className={this.state.isPressed ? "drum-pad press" : "drum-pad"}
        id={item.description}
        onClick={this.handleOnClick}
      >

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
    this.handleSetDisplay = this.handleSetDisplay.bind(this)
  }
  handleSetDisplay(e) {
    this.setState({
      display: e
    })

  }
  render() {
    const drumPads = drumResource.map(
      item =>
        <DrumPad drumResource={item} key={item.id} setDisplay={this.handleSetDisplay} />)
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
