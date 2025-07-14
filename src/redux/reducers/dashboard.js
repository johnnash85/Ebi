import {
    DASHBOARD_INDICATOR_ATTEMPT,
    DASHBOARD_INDICATOR_SUCCESS,
    DASHBOARD_INDICATOR_FAILED,
    //////////////////////
    DASHBOARD_INVOICE_ATTEMPT,
    DASHBOARD_INVOICE_SUCCESS,
    DASHBOARD_INVOICE_FAILED,
} from "../types/dashboardTypes";
import {
    LOGOUT,
} from "../types/sessionTypes";
const INITIAL_STATE = {
    loading: false,
    data: {},
    error: "",
    /////////
}
function dashboard(state = INITIAL_STATE, action) {
    switch (action.type) {
        case DASHBOARD_INDICATOR_ATTEMPT:
            return {
                ...state,
                loading: true
            };
        case DASHBOARD_INDICATOR_SUCCESS:
            return {
                ...state,
                data: action.data,
                error: "",
                loading: false
            };
        case DASHBOARD_INDICATOR_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false,
                data: {}
            };
        /////////////////////////////////////////

        /////////////////////////////////////////
        case LOGOUT:
            return INITIAL_STATE
        default:
            return state;
    }
}
export default dashboard;