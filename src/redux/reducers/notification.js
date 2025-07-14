import {
    NOTIFICATION_LIST_ATTEMPT,
    NOTIFICATION_LIST_SUCCESS,
    NOTIFICATION_LIST_FAILED,
    ////////////////////
    NOTIFICATION_MORELIST_ATTEMPT,
    NOTIFICATION_MORELIST_SUCCESS,
    NOTIFICATION_MORELIST_FAILED,
    //////////////////
    NOTIFICATION_SET_COUNT
} from "../types/notificationTypes";
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
    count: null
};
function notification(state = INITIAL_STATE, action) {
    switch (action.type) {
        case NOTIFICATION_LIST_ATTEMPT:
            return {
                ...state,
                loading: true
            };
        case NOTIFICATION_LIST_SUCCESS:
            return {
                ...state,
                list: action.data.list,
                page_size: action.data.size,
                page_count: action.data.size,
                error: "",
                loading: false,
                count: 0
            };
        case NOTIFICATION_LIST_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        ////////////////////
        //////////////////////////////////////////
        case NOTIFICATION_MORELIST_ATTEMPT:
            return {
                ...state,
                loadingMore: true,
            };

        case NOTIFICATION_MORELIST_SUCCESS:
            return {
                ...state,
                loadingMore: false,
                page_size: action.data.size,
                page_count: state.page_count + action.data.size,
                list: state.list.concat(action.data.list),
                error: "",
            };

        case NOTIFICATION_MORELIST_FAILED:
            return {
                ...state,
                loadingMore: false,
            };
        /////////////////////
        case NOTIFICATION_SET_COUNT:
            return {
                ...state,
                count: action.count,
            };
        case LOGOUT:
            return INITIAL_STATE;

        default:
            return state;
    }
};
export default notification;