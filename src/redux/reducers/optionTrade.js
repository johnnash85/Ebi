import {
    OPTIONTRADE_LIST_ATTEMPT,
    OPTIONTRADE_LIST_SUCCESS,
    OPTIONTRADE_LIST_FAILED,
    ////////////////////
} from "../types/optionTradeTypes";
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
function optionTrade(state = INITIAL_STATE, action) {
    switch (action.type) {
        case OPTIONTRADE_LIST_ATTEMPT:
            return {
                ...state,
                loading: true
            };
        case OPTIONTRADE_LIST_SUCCESS:
            return {
                ...state,
                list: action.data.list,
                page_size: action.data.size,
                page_count: action.data.size,
                error: "",
                loading: false
            };
        case OPTIONTRADE_LIST_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        ////////////////////
        //////////////////////////////////////////
        case LOGOUT:
            return INITIAL_STATE
        default:
            return state;
    }
};
export default optionTrade;