import React, { Component } from 'react';
import './App.css';

let textColor = 'darkgoldenrod'
let defaultStyle = {
  color: textColor,
}
let fakeServerData = {
  user: {
    name: 'Raymond',
    playlists: [
      {
        name: 'My Favorites',
        songs: [
          {name: 'In My Feelings', duration: 1245}, 
          {name:'Best I Ever Had', duration: 3183}, 
          {name: 'Hotline Bling', duration: 9729}
        ] 
      },
      {
        name: 'Discover',
        songs: [
          {name: 'Baby Please!!!', duration: 197937}, 
          {name: 'Dont Go', duration: 239742}, 
          {name: 'IDK What To Do', duration: 298329}
        ]
      },
      {
        name: 'New Playlists',
        songs: [
          {name: 'I Like Noodles', duration: 12123}, 
          {name: 'I Kinda Like Noodles', duration: 4692}, 
          {name: 'Noodle Me Up', duration: 92732}
        ]
      },
      {
        name: 'Friends Playlists',
        songs: [
          {name: 'I Like Cake', duration: 16381}, 
          {name: 'Cake Is My Friend', duration: 86392}, 
          {name: 'Cake Makes Me Fat', duration: 93637}
      ]
      }
    ]
  },

}

class PlaylistCounter extends Component{
  render() {
    return (
      <div style= {{width: "40%", display: 'inline-block'}}>
      <h2>{this.props.playlists.length} Playlists</h2>
      </div>
    );
  }
}

class DurationCounter extends Component{
  render() {
    let allSongs =this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
   let totalDuration = allSongs.reduce((sum, eachSong) => {
     return sum + eachSong.duration
   },0) 

    return (
      <div style= {{width: "40%", display: 'inline-block'}}>
      <h2> Total time: {totalDuration/60 }</h2>
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
  constructor(){
    super();
    this.state = {serverData: {}}
  }
componentDidMount() {
  setTimeout(() => {
  this.setState({serverData: fakeServerData});
  }, 100)
}
  render() {
    return (
      <div className="App">
      <h1 class="title">The Cookout
      </h1>
      {this.state.serverData.user && 
        <h3 style={{color: textColor}}>
        {this.state.serverData.user.name}'s Playlists
        </h3>}
      <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
      <DurationCounter playlists={this.state.serverData.user.playlists}/>
      <Filter/>
      <Playlist/>
      <Playlist/>
      <Playlist/>
      </div>
    );
  }
}

export default App;
