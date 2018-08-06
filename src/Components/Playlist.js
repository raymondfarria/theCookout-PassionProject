import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

export default class Playlist extends Component{
    render() {
    let textColor = 'grey'
    let defaultStyle = {
  color: textColor,
}
    let playlist = this.props.playlist;
      return(
        <div style={{...defaultStyle, width: "25%", display: 'inline-block'}}>
            <img src= {playlist.imageUrl} style = {{width: '160px'}}/>
            <Typography variant='Headline' align='center' gutterBottom>
                <h3>{playlist.name}</h3>
            </Typography>
            <ul>
            {playlist.songs.map(song => 
                <li>{song.name}</li>
                )}
            </ul>
         </div>
      );
    }
  }
