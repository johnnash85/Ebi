import {
    CALENDAR_LIST_ATTEMPT,
    CALENDAR_LIST_SUCCESS,
    CALENDAR_LIST_FAILED,
} from "../types/calendarTypes";
import {
    LOGOUT,
} from "../types/sessionTypes";
const INITIAL_STATE = {
    loading: false,
    list: [],
    error: "",
    /////////

};
function calendar(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CALENDAR_LIST_ATTEMPT:
            return {
                ...state,
                loading: true
            };
        case CALENDAR_LIST_SUCCESS:
            return {
                ...state,
                list: action.data.list,
                page_size: action.data.size,
                page_count: action.data.size,
                error: "",
                loading: false,
            };
        case CALENDAR_LIST_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        ////////////////////
        case LOGOUT:
            return INITIAL_STATE
        default:
            return state;
    }
};
export default calendar;