import {
    FOLLOWER_LIST_ATTEMPT,
    FOLLOWER_LIST_SUCCESS,
    FOLLOWER_LIST_FAILED,
    ////////////////////
    FOLLOWER_MORELIST_ATTEMPT,
    FOLLOWER_MORELIST_SUCCESS,
    FOLLOWER_MORELIST_FAILED
} from "../types/followerListTypes";
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
function followerList(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FOLLOWER_LIST_ATTEMPT:
            return {
                ...state,
                loading: true
            };
        case FOLLOWER_LIST_SUCCESS:
            return {
                ...state,
                list: action.data.list,
                page_size: action.data.size,
                page_count: action.data.size,
                error: "",
                loading: false
            };
        case FOLLOWER_LIST_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        ////////////////////
        //////////////////////////////////////////
        case FOLLOWER_MORELIST_ATTEMPT:
            return {
                ...state,
                loadingMore: true,
            };

        case FOLLOWER_MORELIST_SUCCESS:
            return {
                ...state,
                loadingMore: false,
                page_size: action.data.size,
                page_count: state.page_count + action.data.size,
                list: state.list.concat(action.data.list),
                error: "",
            };

        case FOLLOWER_MORELIST_FAILED:
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
export default followerList;