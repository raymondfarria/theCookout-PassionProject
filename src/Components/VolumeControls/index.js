import SongControl from "../SongControl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateVolume } from '../../Actions/soundActions';

const mapStateToProps = (state) => {
  
  return {
    volume: state.soundReducer.volume
  };
  
};

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    updateVolume
  }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(SongControl);