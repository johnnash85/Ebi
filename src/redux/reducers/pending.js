import {
    PENDING_ITEM_ATTEMPT,
    PENDING_ITEM_SUCCESS,
    PENDING_ITEM_FAILED,
    ////////////////////
    PENDING_UPDATE_SUCCESS,
    PENDING_UPDATE_FAILED,
} from "../types/pendingTypes";
import {
    LOGOUT,
} from "../types/sessionTypes";
const INITIAL_STATE = {
    loading: false,
    item: {},
    error: "",
    /////////
};

function pending(state = INITIAL_STATE, action) {
    switch (action.type) {
        case PENDING_ITEM_ATTEMPT:
            return {
                ...state,
                loading: true,
            };
        case PENDING_ITEM_SUCCESS:
            return {
                ...state,
                item: action.item,
                loading: false,
                error: "",
            };
        case PENDING_ITEM_FAILED:
            return {
                ...state,
                item: {},
                loading: false,
                error: action.error,
            };
        ////////////////////////
        case PENDING_UPDATE_SUCCESS:
            return {
                ...state,
                item: action.item,
                error: "",
            };
        case PENDING_UPDATE_FAILED:
            return {
                ...state,
                error: action.error,
            };

        case LOGOUT:
            return INITIAL_STATE
        default:
            return state;
    }
}
export default pending;