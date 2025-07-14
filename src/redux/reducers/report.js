import {
    SUMSYMBOL_LIST_ATTEMPT,
    SUMSYMBOL_LIST_SUCCESS,
    SUMSYMBOL_LIST_FAILED,
    ////////////////////
    LATESROI_LIST_ATTEMPT,
    LATESROI_LIST_SUCCESS,
    LATESROI_LIST_FAILED,
    //////////////////////
    LATESTRADE_LIST_ATTEMPT,
    LATESTRADE_LIST_SUCCESS,
    LATESTRADE_LIST_FAILED,
    /////////////////////
    SUMSTRATEGY_LIST_ATTEMPT,
    SUMSTRATEGY_LIST_SUCCESS,
    SUMSTRATEGY_LIST_FAILED,
} from "../types/reportTypes";
import {
    LOGOUT,
} from "../types/sessionTypes";
const INITIAL_STATE = {
    loadingSymbol: false,
    listSymbol: [],
    errorSymbol: "",
    /////////
    loadingRoi: false,
    errorRoi: "",
    dataRoi: {},
    /////////
    loadingTrade: false,
    errorTrade: "",
    dataTrade: {},
    /////////
    loadingStrategy: false,
    listStrategy: [],
    errorStrategy: "",
    /////////////

};
function report(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SUMSYMBOL_LIST_ATTEMPT:
            return {
                ...state,
                loadingSymbol: true
            };
        case SUMSYMBOL_LIST_SUCCESS:
            return {
                ...state,
                listSymbol: action.data.list,
                errorSymbol: "",
                loadingSymbol: false
            };
        case SUMSYMBOL_LIST_FAILED:
            return {
                ...state,
                errorSymbol: action.error,
                loadingSymbol: false
            };
        ////////////////////
        case LATESROI_LIST_ATTEMPT:
            return {
                ...state,
                loadingRoi: true
            };
        case LATESROI_LIST_SUCCESS:
            return {
                ...state,
                dataRoi: action.data,
                errorRoi: "",
                loadingRoi: false
            };
        case LATESROI_LIST_FAILED:
            return {
                ...state,
                errorRoi: action.error,
                loadingRoi: false,
                dataRoi: {},
            };
        /////////////////////////////////////////
        case LATESTRADE_LIST_ATTEMPT:
            return {
                ...state,
                loadingTrade: true
            };
        case LATESTRADE_LIST_SUCCESS:
            return {
                ...state,
                dataTrade: action.data,
                errorTrade: "",
                loadingTrade: false
            };
        case LATESTRADE_LIST_FAILED:
            return {
                ...state,
                errorTrade: action.error,
                loadingTrade: false,
                dataTrade: {},
            };
        /////////////////////
        case SUMSTRATEGY_LIST_ATTEMPT:
            return {
                ...state,
                loadingStrategy: true
            };
        case SUMSTRATEGY_LIST_SUCCESS:
            return {
                ...state,
                listStrategy: action.data.list,
                errorStrategy: "",
                loadingStrategy: false
            };
        case SUMSTRATEGY_LIST_FAILED:
            return {
                ...state,
                errorStrategy: action.error,
                loadingStrategy: false,
                listStrategy: [],
            };
        /////////////////////
        case LOGOUT:
            return INITIAL_STATE
        default:
            return state;
    }
}
export default report;