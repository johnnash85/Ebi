import {
    SET_IMPORT_TABLE
} from "../types/importTypes";
import {
    LOGOUT,
} from "../types/sessionTypes";
const INITIAL_STATE = {
    loading: false,
    list: [],
    header: [],
    error: "",
    /////////
    loadingMore: false,
    page_count: 0,
    page_size: 0,
    /////////////
};
function history(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_IMPORT_TABLE:
            return {
                ...state,
                list: action.data.list,
                header: action.data.header
            };

        ////////////////////

        /////////////////////
        case LOGOUT:
            return INITIAL_STATE
        default:
            return state;
    }
}
export default history;