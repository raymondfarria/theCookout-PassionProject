import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
// import qs from 'qs';
import queryString from 'qs';


let textColor = 'darkgoldenrod'
let defaultStyle = {
  color: textColor,
}
// const querystring = require('querystring');
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
      }
    ]
  }

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
      <input type="text" onKeyDown={event => 
        this.props.onTextChange(event.target.value)}/>
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
       <img src= {playlist.imageUrl} style = {{width: '160px'}}/>
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
  componentDidMount(){
     let parsed = queryString.parse(window.location.search);
     console.log(parsed);
     console.log(parsed["?access_token"])
     let accessToken = parsed["?access_token"];
     
     //Checks to see if access token is still valid. Prompts sign in button if not. 
     if(!accessToken)
      return; 

    //Fetches access token for the api
    fetch('https://api.spotify.com/v1/me', {
       headers: {'Authorization': 'Bearer ' + accessToken}
     }).then(response => response.json())
     .then(data => this.setState({
       user: {
         name: data.id
       }
      }))
    
    //Fetches playlists of the current user
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
        playlists: data.items.map(item => {
          console.log(data.items)
          return {
          name: item.name,
          imageUrl: item.images[0].url,
          songs: []
          }
      })
    }))
    
  }
  render() {
    let playlistToRender = 
    this.state.user && 
    this.state.playlists 
      ? this.state.playlists.filter(playlist =>
        playlist.name.toLowerCase().includes(
          this.state.filterString.toLowerCase())) 
      : []

    

    return (
      <div className="App">
        <Typography variant='display1' align='center' gutterBottom>
          The Cookout
        </Typography>
          {this.state.user ?
        <div> 
          <h3 style={{color: textColor}}>
          {this.state.user.name}'s Playlists
          </h3>
          <PlaylistCounter playlists={playlistToRender}/>
          <DurationCounter playlists={playlistToRender}/>
          <Filter onTextChange={text => {             
             console.log(text);
             this.setState({filterString: text})
            }}/>
              {playlistToRender.map(playlist =>
          <Playlist playlist={playlist}/>
            )}
        </div> : <Button onClick={()=> {
          window.location = window.location.href.includes('localhost') 
          ? 'http://localhost:8888/login' 
          : 'https://backendcookout.herokuapp.com/login'}
        }
        variant="raised" color= 'primary'>
        Sign in with Spotify
        </Button>
        }
      </div>
    );
  }
}

export default App;
      
