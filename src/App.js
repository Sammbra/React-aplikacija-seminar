import React, { Component } from 'react';
import './App.css';
import { Messages, Input } from './components';

function randomName() {
  const adjectives = [
    "Autumn", "Hidden", "Bitter", "Misty", "Silent", "Empty", "Dry", "Dark",
    "Summer", "Icy", "Delicate", "Quiet", "White", "Cool", "Spring", "Winter",
    "Patient", "Twilight", "Dawn", "Crimson", "Wispy", "Weathered", "Blue",
    "Billowing", "Broken", "Cold", "Damp", "Falling", "Frosty", "Green", "Long",
    "Late", "Lingering", "Bold", "Little", "Morning", "Muddy", "Old", "Red",
    "Rough", "Still", "Small", "Sparkling", "Throbbing", "Shy", "Wandering",
    "Withered", "Wild", "Black", "Young", "Holy", "Solitary", "Fragrant",
    "Aged", "Snowy", "Proud", "Floral", "Restless", "Divine", "Polished",
    "Ancient", "Purple", "Lively", "Nameless"
  ];
  const nouns = [
    "waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning",
    "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter",
    "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook",
    "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly",
    "feather", "grass", "haze", "mountain", "night", "pond", "darkness",
    "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder",
    "violet", "water", "wildflower", "wave", "water", "resonance", "sun",
    "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog",
    "smoke", "star"
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName()
    }
  };

  constructor() {
    super();
    this.drone = new window.Scaledrone("ngx8x6uzvbulCgjm", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.state.member = member;
    });
  }

  componentDidMount() {
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });
  }

  /* Funkcija koja prima poruku iz Input komponente pomoću propsa */
  /* drone.publish omogućuje slanje poruke i unutar njega moramo navesti ime sobe i podatke koji se šalju iz inputa */
  handleMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>CHAT APPLICATION</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onSendMessage={this.handleMessage}
        />
      </div>
    );
  }

}

export default App;