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
          {name: 'Hotline Bling', duration: 3880}
        ] 
      },
      {
        name: 'Discover',
        songs: [
          {name: 'Baby Please!!!', duration: 888}, 
          {name: 'Dont Go', duration: 2666}, 
          {name: 'IDK What To Do', duration: 2983}
        ]
      },
      {
        name: 'New Playlists',
        songs: [
          {name: 'I Like Noodles', duration: 1212}, 
          {name: 'I Kinda Like Noodles', duration: 4692}, 
          {name: 'Noodle Me Up', duration: 2000}
        ]
      },
      {
        name: 'Friends Playlists',
        songs: [
          {name: 'I Like Cake', duration: 2000}, 
          {name: 'Cake Is My Friend', duration: 1500}, 
          {name: 'Cake Makes Me Fat', duration: 7000}
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
      <h2> Total time: {Math.round(totalDuration/60) }</h2>
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
    let playlist = this.props.playlist;
    return(
      <div style={{...defaultStyle, width: "25%", display: 'inline-block'}}>
       <img/>
       <h3>{playlist.name}</h3>
       <ul>
       {playlist.songs.map(song => 
        <li>{song.name}</li>
      )}
       </ul>
      </div>
    );
  }
}


class App extends Component {
  constructor(){
    super();
    this.state = {serverData: {},
    filterString: ''
    }
  }
componentDidMount() {
  setTimeout(() => {
  this.setState({serverData: fakeServerData});
  }, 100)
}
  render() {
    let playlistElements = []
    if(this.state.serverData.user){
    this.state.serverData.user.playlists.forEach(playlist =>
      playlistElements.push(<Playlist playlist ={playlist} />)
    )
  }

    return (
      <div className="App">
      <h1 class="title">The Cookout
      </h1>
      {this.state.serverData.user ?
        <div> 
        <h3 style={{color: textColor}}>
        {this.state.serverData.user.name}'s Playlists
        </h3>
      <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
      <DurationCounter playlists={this.state.serverData.user.playlists}/>
      <Filter/>
      {this.state.serverData.user.playlists.filter(playlist =>
        playlist.name.toLowerCase().includes(this.state.filterString)
      ).map(playlist =>
        <Playlist playlist={playlist}/>
      )}
      </div> : <h1 style={defaultStyle}>Loading...</h1>
      }
      </div>
    );
  }
}

export default App;
      
