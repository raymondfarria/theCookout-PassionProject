import SongList from "./SongList";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchSongs } from '../../Actions/songActions';
import { addSongToLibrary } from '../../Actions/userActions';

const mapStateToProps = (state) => {

  return {
    token: state.tokenReducer.token ? state.tokenReducer.token : '',
    songs: state.songsReducer.songs ? state.songsReducer.songs : '',
    fetchSongsError: state.songsReducer.fetchSongsError,
    fetchSongsPending: state.songsReducer.fetchSongsPending,
    fetchPlaylistSongsPending: state.songsReducer.fetchPlaylistSongsPending,
    songPlaying: state.songsReducer.songPlaying,
    songPaused: state.songsReducer.songPaused,
    songId: state.songsReducer.songId,
    songAddedId: state.userReducer.songId || '',
    viewType: state.songsReducer.viewType,
  };

};

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    fetchSongs,
    addSongToLibrary
  }, dispatch);

};
export default connect(mapStateToProps, mapDispatchToProps)(SongList);