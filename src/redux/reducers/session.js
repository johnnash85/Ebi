import {
    LOGIN_ATTEMPT,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    ////////////////////
    LOGOUT,
    ///////////////
    RESET_SUCCESS,
    UPDATE_FAILED,
    /////////////////////
    UPDATE_SUCCESS
} from "../types/sessionTypes";

const INITIAL_STATE = {
    loading: false,
    auth: {},
    error: "",
    /////////
    success: '',
    item: {}
};

function session(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN_ATTEMPT:
            return {
                ...state,
                loading: true,
                error: "",
                success: ""
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                auth: action.data,
                loading: false
            };
        case LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                auth: {},
            };
        ////////////////////////////////
        case LOGOUT:
            return INITIAL_STATE
        //////////////////////
        case RESET_SUCCESS:
            // console.timeLog(action.success);
            return {
                ...state,
                success: action.success,
                error: ""
            };
        case UPDATE_FAILED:
            // console.timeLog(action.error);
            return {
                ...state,
                error: action.error,
                success: ""
            };
        //////////////////
        case UPDATE_SUCCESS:
            return {
                ...state,
                auth: action.item,
                loading: false,
                error: "",
                success: ""
            };
        default:
            return state;
    }
}
export default session;