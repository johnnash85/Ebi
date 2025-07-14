import {
    HISTORY_LIST_ATTEMPT,
    HISTORY_LIST_SUCCESS,
    HISTORY_LIST_FAILED,
    ////////////////////
    HISTORY_MORELIST_ATTEMPT,
    HISTORY_MORELIST_SUCCESS,
    HISTORY_MORELIST_FAILED,
    ////////////////////
    HISTORY_REMOVE_SUCCESS,
    HISTORY_REMOVE_FAILED,
} from "../types/historyTypes";
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
    search: ''
};
function history(state = INITIAL_STATE, action) {
    switch (action.type) {
        case HISTORY_LIST_ATTEMPT:
            return {
                ...state,
                loading: true
            };
        case HISTORY_LIST_SUCCESS:
            return {
                ...state,
                list: action.data.list,
                page_size: action.data.size,
                page_count: action.data.size,
                search: action.data.search,
                error: "",
                loading: false
            };
        case HISTORY_LIST_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        ////////////////////
        case HISTORY_MORELIST_ATTEMPT:
            return {
                ...state,
                loadingMore: true,
            };

        case HISTORY_MORELIST_SUCCESS:
            return {
                ...state,
                loadingMore: false,
                page_size: action.data.size,
                page_count: state.page_count + action.data.size,
                list: state.list.concat(action.data.list),
                search: action.data.search,
                error: "",
            };

        case HISTORY_MORELIST_FAILED:
            return {
                ...state,
                loadingMore: false,
            };
        /////////////////////
        case HISTORY_REMOVE_SUCCESS: {
            const newList = state.list.filter(item => {
                return item.id.toString() !== action.item.id;
            });

            return {
                ...state,
                list: newList,
            };
        }

        case HISTORY_REMOVE_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case LOGOUT:
            return INITIAL_STATE
        default:
            return state;
    }
};
export default history;