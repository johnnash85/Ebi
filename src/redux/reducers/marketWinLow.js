import {
    WINNERS_LIST_ATTEMPT,
    WINNERS_LIST_SUCCESS,
    WINNERS_LIST_FAILED,
    ////////////////////
    LOSERS_LIST_ATTEMPT,
    LOSERS_LIST_SUCCESS,
    LOSERS_LIST_FAILED,
} from "../types/marketWinLowTypes";
import {
    LOGOUT,
} from "../types/sessionTypes";
const INITIAL_STATE = {
    loadingWinners: false,
    listWinners: [],
    errorWinners: "",
    /////////
    loadingLosers: false,
    listLosers: [],
    errorLosers: "",
};
function marketWinLow(state = INITIAL_STATE, action) {
    switch (action.type) {
        case WINNERS_LIST_ATTEMPT:
            return {
                ...state,
                loadingWinners: true
            };
        case WINNERS_LIST_SUCCESS:
            return {
                ...state,
                listWinners: action.data.list,
                errorWinners: "",
                loadingWinners: false,
            };
        case WINNERS_LIST_FAILED:
            return {
                ...state,
                errorWinners: action.error,
                loadingWinners: false
            };
        ////////////////////
        case LOSERS_LIST_ATTEMPT:
            return {
                ...state,
                loadingLosers: true
            };
        case LOSERS_LIST_SUCCESS:
            return {
                ...state,
                listLosers: action.data.list,
                errorLosers: "",
                loadingLosers: false,
            };
        case LOSERS_LIST_FAILED:
            return {
                ...state,
                errorLosers: action.error,
                loadingLosers: false
            };
        case LOGOUT:
            return INITIAL_STATE
        default:
            return state;
    }
};
export default marketWinLow;