import {
    NEWS_LIST_ATTEMPT,
    NEWS_LIST_SUCCESS,
    NEWS_LIST_FAILED,
    ////////////////////
    NEWS_MORELIST_ATTEMPT,
    NEWS_MORELIST_SUCCESS,
    NEWS_MORELIST_FAILED,
    ///////////////////////
    STOCK_INDICATOR_ATTEMPT,
    STOCK_INDICATOR_SUCCESS,
    STOCK_INDICATOR_FAILED,
    ///////////////////
    STOCK_STRATEGY_ATTEMPT,
    STOCK_STRATEGY_SUCCESS,
    STOCK_STRATEGY_FAILED
} from "../types/stockNewsTypes";
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
    loadingData: false,
    data: {},
    errorData: "",
    //////////////
    loadingStrategy: false,
    listStrategy: [],
    errorStrategy: "",
};
function stockNews(state = INITIAL_STATE, action) {
    switch (action.type) {
        case NEWS_LIST_ATTEMPT:
            return {
                ...state,
                loading: true
            };
        case NEWS_LIST_SUCCESS:
            return {
                ...state,
                list: action.data.list,
                page_size: action.data.size,
                page_count: action.data.size,
                error: "",
                loading: false
            };
        case NEWS_LIST_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        ////////////////////

        case NEWS_MORELIST_ATTEMPT:
            return {
                ...state,
                loadingMore: true,
            };

        case NEWS_MORELIST_SUCCESS:
            return {
                ...state,
                loadingMore: false,
                page_size: action.data.size,
                page_count: state.page_count + action.data.size,
                list: state.list.concat(action.data.list),
                error: "",
            };

        case NEWS_MORELIST_FAILED:
            return {
                ...state,
                loadingMore: false,
            };
        /////////////////////
        case STOCK_INDICATOR_ATTEMPT:
            return {
                ...state,
                loading: true
            };
        case STOCK_INDICATOR_SUCCESS:
            return {
                ...state,
                data: action.data,
                error: "",
                loading: false
            };
        case STOCK_INDICATOR_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        //////////////////////////////////////////
        case STOCK_STRATEGY_ATTEMPT:
            return {
                ...state,
                loadingStrategy: true
            };
        case STOCK_STRATEGY_SUCCESS:
            return {
                ...state,
                listStrategy: action.data.list,
                errorStrategy: "",
                loadingStrategy: false
            };
        case STOCK_STRATEGY_FAILED:
            return {
                ...state,
                errorStrategy: action.error,
                listStrategy: [],
                loadingStrategy: false
            };
        case LOGOUT:
            return INITIAL_STATE
        default:
            return state;
    }
};
export default stockNews;