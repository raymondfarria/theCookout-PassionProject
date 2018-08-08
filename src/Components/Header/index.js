import Header from "./Header";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchCategories, fetchNewReleases, fetchFeatured } from '../../Actions/browseActions';
import { updateHeaderTitle } from '../../Actions/uiActions';
import { updateViewType } from '../../Actions/songActions';

const mapStateToProps = (state) => {

  return {
    songPaused: state.songsReducer.songPaused,
    headerTitle: state.uiReducer.title,
    viewType: state.songsReducer.viewType,
    playlists: state.playlistReducer.playlists,
    artists: state.artistsReducer.artistList ? state.artistsReducer.artistList.artists : [],
    token: state.tokenReducer.token
  };

};

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    fetchCategories,
    fetchNewReleases,
    updateHeaderTitle,
    updateViewType,
    fetchFeatured
  }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(Header);