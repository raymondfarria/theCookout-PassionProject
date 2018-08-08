import React from 'react';
import PropTypes from 'prop-types';
import SongList from '../SongList';
import AlbumList from '../AlbumList';
import ArtistList from '../ArtistList';
import BrowserList from '../BrowserList';
import './HomePage.css';

const HomePage = ({ headerTitle, audioControl, resumeSong, pauseSong }) => {

  return (
    <div>
      {
        headerTitle === 'Albums' ?
          (<AlbumList audioControl={ audioControl } />) :
          headerTitle === 'Artists' ?
            (<ArtistList />) :
            (headerTitle === 'Browse') ?
              ( <BrowserList />) :
              //anything else show SongList
              ( <SongList resumeSong={ resumeSong } pauseSong={ pauseSong } audioControl={ audioControl } />)
      }
    </div>
  );

};

HomePage.propTypes = {
  headerTitle: PropTypes.string,
  audioControl: PropTypes.func,
  resumeSong: PropTypes.func,
  pauseSong: PropTypes.func
};

export default HomePage;