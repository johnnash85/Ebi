import {
    EMAIL_WELCOME_SUCCESS,
    MAIL_WELCOME_FAILED,
} from "../types/emailTypes";
import {
    LOGOUT,
} from "../types/sessionTypes";
const INITIAL_STATE = {
    success: "",
    error: "",
    loading: false
    /////////
};
function email(state = INITIAL_STATE, action) {
    switch (action.type) {

        case EMAIL_WELCOME_SUCCESS:
            return {
                ...state,
                success: action.data.success,
                error: "",
                loading: false
            };
        case MAIL_WELCOME_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false,
            };

        case LOGOUT:
            return INITIAL_STATE
        default:
            return state;
    }
}
export default email;