import React, { Component } from 'react';
import queryString from 'qs';
import './Search.css';

import Profile from './Profile';
import Gallery from './Gallery';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: "",
      artist: null, //IMPORTANT
      tracks: []
    }
  }


  // MAIN SEARCH FUNCTION
  search(query) {
    //-----------API SETUP-----------
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${!query ? this.state.query: query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';

    /*
      accessToken expires every one hour. 
      In order to get accessToken start "web-api-auth-examples"
    */
   let parsed = queryString.parse(window.location.search);
   console.log(parsed);
   console.log(parsed["?access_token"])
   let accessToken = parsed["?access_token"];

    let myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    // FETCH!!!!
    fetch(FETCH_URL, myOptions)
    .then(response => response.json())
    .then(json => {

      const artist = json.artists.items[0];
      console.log(artist);        
      this.setState({ artist });
      
      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
      fetch(FETCH_URL, myOptions) 
      .then(response => response.json())
      .then(json => {
        const { tracks } = json;
        this.setState({tracks});
      })

    });

  }

  render() {
    return (
      <div className="Search">
        <h2>Search</h2>

          <div className="InputGroup">
            <input
              type="text"
              placeholder="Search for an artist"
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={
                event => {
                  if(event.key === 'Enter') {
                    this.search()
                  }
                }
              }
            />
            <button onClick={ () => this.search()}>
              <img src={require('../img/search.png')} alt="search"/>
            </button>
          </div>

          {
            this.state.artist !== null 
            ? <div>
                <Profile
                  artist={this.state.artist}
                />

                <Gallery 
                  tracks={this.state.tracks}
                />
              </div>
            : <p></p>
          }
      </div>
    );
  }
}

export default Search;