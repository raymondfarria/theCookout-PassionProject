import TrackSearch from "./Search";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchSongs } from '../../Actions/songActions';

const mapStateToProps = (state) => {

  return {
    token: state.tokenReducer.token
  };

};

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    searchSongs,
  }, dispatch);

};
export default connect(mapStateToProps, mapDispatchToProps)(TrackSearch);