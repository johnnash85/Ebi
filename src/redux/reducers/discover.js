import {
    DISCOVER_LIST_ATTEMPT,
    DISCOVER_LIST_SUCCESS,
    DISCOVER_LIST_FAILED,
    ////////////////////
    DISCOVER_MORELIST_ATTEMPT,
    DISCOVER_MORELIST_SUCCESS,
    DISCOVER_MORELIST_FAILED
} from "../types/discoverTypes";
import {
    LOGOUT,
} from "../types/sessionTypes";
const INITIAL_STATE = {
    loading: false,
    list: [],
    error: "",
    /////////
    loadingMore: false,
    page_count: 0,
    page_size: 0,
    /////////////
    item: {},
};
function discover(state = INITIAL_STATE, action) {
    switch (action.type) {
        case DISCOVER_LIST_ATTEMPT:
            return {
                ...state,
                loading: true
            };
        case DISCOVER_LIST_SUCCESS:
            return {
                ...state,
                list: action.data.list,
                page_size: action.data.size,
                page_count: action.data.size,
                error: "",
                loading: false
            };
        case DISCOVER_LIST_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        ////////////////////
        //////////////////////////////////////////
        case DISCOVER_MORELIST_ATTEMPT:
            return {
                ...state,
                loadingMore: true,
            };

        case DISCOVER_MORELIST_SUCCESS:
            return {
                ...state,
                loadingMore: false,
                page_size: action.data.size,
                page_count: state.page_count + action.data.size,
                list: state.list.concat(action.data.list),
                error: "",
            };

        case DISCOVER_MORELIST_FAILED:
            return {
                ...state,
                loadingMore: false,
            };
        /////////////////////
        case LOGOUT:
            return INITIAL_STATE

        default:
            return state;
    }
};
export default discover;