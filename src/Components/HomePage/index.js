import HomePage from "./HomePage";
import { connect } from "react-redux";

const mapStateToProps = (state) => {

  return {
    headerTitle: state.uiReducer.title
  };

};

export default connect(mapStateToProps)(HomePage);