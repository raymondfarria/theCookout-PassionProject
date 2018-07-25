import React, { Component } from 'react';
import './App.css';

let textColor = 'darkgoldenrod'
let defaultStyle = {
  color: textColor,
}
class Aggregrate extends Component{
  render(){
    return (
      <div style= {{width: "40%", display: 'inline-block'}}>
      <h2 style={{color: textColor}}>Number text</h2>
      </div>
    );
  }
}

class Filter extends Component{
  render() {
    return (
      <div style={defaultStyle}>
      <img/>
      <input type="text"/>
      <img/>
      </div>
    );
  }
}

class Playlist extends Component{
  render() {
    return(
      <div style={{...defaultStyle, width: "25%", display: 'inline-block'}}>
       <img/>
       <h3>Playlist Name</h3>
       <ul><li>Song 1</li><li>Song 2</li><li>Song 3</li></ul>
      </div>
    );
  }
}


class App extends Component {

  render() {
    return (
      <div className="App">
      <h1 class="title">The Cookout</h1>
      <Aggregrate/>
      <Aggregrate/>
      <Filter/>
      <Playlist/>
      <Playlist/>
      <Playlist/>
      </div>
    );
  }
}

export default App;
