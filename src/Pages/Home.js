import React, { Component } from 'react';
import PlaylistCounter from '../Components/PlaylistCounter';
import DurationCounter from '../Components/DurationCounter'
import Filter from '../Components/Filter';
import Playlist from '../Components/Playlist';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import queryString from 'qs';
import Search from '../Pages/Search';
import {BrowserRouter} from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Menu from '../Components/Menu';


let textColor = 'grey'
let defaultStyle = {
  color: textColor,
}



export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {serverData: {},
        filterString: '',
        currentMenu: 'slide',
        menuOpen: false,
        side: 'left'
        }
       }
    
       handleStateChange(state){
         this.setState({menuOpen: state.isOpen})
       }
    
       closeMenu(){
         this.setState({menuOpen: false})
       }
    
       toggleMenu(){
         this.setState({menuOpen: !this.state.menuOpen})
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
        .then(playlistData => {
          let playlists = playlistData.items
          let trackDataPromises = playlists.map(playlist => {
            let responsePromise = fetch(playlist.tracks.href, {
              headers: {'Authorization': 'Bearer ' + accessToken}
            })
            let trackDataPromise = responsePromise
              .then(response => response.json())
            return trackDataPromise
          })
          let allTracksDataPromises = 
            Promise.all(trackDataPromises)
          let playlistsPromise = allTracksDataPromises.then(trackDatas => {
            trackDatas.forEach((trackData, i) => {
              playlists[i].trackDatas = trackData.items
                .map(item => item.track)
                .map(trackData => ({
                  name: trackData.name,
                  duration: trackData.duration_ms / 1000
                }))
            })
            return playlists
          })
          return playlistsPromise
        })
        .then(playlists => this.setState({
          playlists: playlists.map(item => {
            return {
              name: item.name,
              imageUrl: item.images[0].url, 
              songs: item.trackDatas.slice(0,3)
            }
        })
        }))
    
      }
              
      render() {
        let playlistToRender = 
        this.state.user && 
        this.state.playlists 
          ? this.state.playlists.filter(playlist =>{
            let matchesPlaylist = playlist.name.toLowerCase().includes(
              this.state.filterString.toLowerCase())
              let matchesSong = playlist.songs.find(song => song.name.toLowerCase()
              .includes(this.state.filterString.toLowerCase()))
              return matchesPlaylist || matchesSong
            }) : []
    
            
    

    return(
        <div id="outer-container" style={{height: '100%'}}>
          <main id="page-wrap">
            <div className="App">
            {this.state.user ?
                <div> 
                  <Typography variant='Title' >
                  <h3 style={{color: textColor}}>
                  {this.state.user.name}'s Playlists
                  </h3>
                  </Typography>
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
        </main>
    </div>
            )
    }
}

