import SideMenu from "./SideMenu";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchSongs, fetchRecentlyPlayed, updateViewType } from '../../Actions/songActions';
import { fetchAlbums } from '../../Actions/albumActions';
import { fetchArtists } from '../../Actions/artistActions';
import { fetchFeatured } from '../../Actions/browseActions';
import { updateHeaderTitle } from '../../Actions/uiActions';

const mapStateToProps = (state) => {

  return {
    userId: state.userReducer.user ? state.userReducer.user.id : '',
    token: state.tokenReducer.token ? state.tokenReducer.token : '',
    artistIds: state.artistsReducer.artistIds,
    title: state.uiReducer.title
  };

};

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    fetchRecentlyPlayed,
    fetchSongs,
    fetchAlbums,
    fetchArtists,
    fetchFeatured,
    updateViewType,
    updateHeaderTitle,
  }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);