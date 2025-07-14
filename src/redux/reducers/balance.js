import {
    BALANCE_LIST_ATTEMPT,
    BALANCE_LIST_SUCCESS,
    BALANCE_LIST_FAILED,
    ////////////////////
    BALANCE_MORELIST_ATTEMPT,
    BALANCE_MORELIST_SUCCESS,
    BALANCE_MORELIST_FAILED,
    ////////////////////
    BALANCE_NEW_SUCCESS,
    BALANCE_NEW_FAILED,
} from "../types/balanceTypes";
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
function balance(state = INITIAL_STATE, action) {
    switch (action.type) {
        case BALANCE_LIST_ATTEMPT:
            return {
                ...state,
                loading: true
            };
        case BALANCE_LIST_SUCCESS:
            return {
                ...state,
                list: action.data.list,
                page_size: action.data.size,
                page_count: action.data.size,
                search: action.data.search,
                error: "",
                loading: false
            };
        case BALANCE_LIST_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        ////////////////////
        case BALANCE_MORELIST_ATTEMPT:
            return {
                ...state,
                loadingMore: true,
            };

        case BALANCE_MORELIST_SUCCESS:
            return {
                ...state,
                loadingMore: false,
                page_size: action.data.size,
                page_count: state.page_count + action.data.size,
                list: state.list.concat(action.data.list),
                search: action.data.search,
                error: "",
            };

        case BALANCE_MORELIST_FAILED:
            return {
                ...state,
                loadingMore: false,
            };
        /////////////////////
        case BALANCE_NEW_SUCCESS: {
            return {
                ...state,
                list: [
                    action.item,
                    ...state.list
                ],
                error: "",
                loading: false
            };
        };
        case BALANCE_NEW_FAILED: {
            return {
                ...state,
                error: action.error,
            };
        };
        case LOGOUT:
            return INITIAL_STATE
        default:
            return state;
    }
};
export default balance;