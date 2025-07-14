import {
    SETTING_ITEM_SUCCESS,
    SETTING_ITEM_FAILED,
    ///////////////////
    SETTING_UPDATE_SUCCESS,
    SETTING_UPDATE_FAILED,
} from "../types/settingTypes";
import {
    LOGOUT,
} from "../types/sessionTypes";
const INITIAL_STATE = {
    loading: false,
    item: {},
    error: "",
    ////////
};
function setting(state = INITIAL_STATE, action) {
    switch (action.type) {

        case SETTING_ITEM_SUCCESS:
            return {
                ...state,
                item: action.item,
                error: "",
            };
        case SETTING_ITEM_FAILED:
            return {
                ...state,
                error: action.error,
            };
        /////////////////////////////////////////
        case SETTING_UPDATE_SUCCESS:
            return {
                ...state,
                item: action.item,
                error: "",
            };
        case SETTING_UPDATE_FAILED:
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
export default setting;