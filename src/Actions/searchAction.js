'use strict';

import Dispatcher  from "../dispatcher";
import { SEARCH_ADD, SEARCH_RESET } from "../Constants/constants";

let SearchActions = {

    newSearch: (text) =>{
        Dispatcher.dispatch({
            type: SEARCH_ADD,
            text:text
        });
    },

    resetSearch: () => {
        Dispatcher.dispatch({
            type: SEARCH_RESET
        });
    }
};

export default SearchActions;