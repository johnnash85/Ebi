import {
    FOLLOWER_UPSET_SUCCESS,
    FOLLOWER_UPSET_FAILED,
    //////////////////
    PROFILE_ITEM_SUCCESS,
    PROFILE_ITEM_FAILED
} from "../types/profileTypes";
import {
    LOGOUT,
} from "../types/sessionTypes";
const INITIAL_STATE = {
    loading: false,
    item: {},
    error: "",
    /////////
};

function profile(state = INITIAL_STATE, action) {
    switch (action.type) {

        case FOLLOWER_UPSET_SUCCESS:
            return {
                ...state,
                item: {
                    ...state.item,
                    follow: action.item,
                },
                error: "",
            };
        case FOLLOWER_UPSET_FAILED:
            return {
                ...state,
                error: action.error,
            };
        ////////////////////////
        case PROFILE_ITEM_SUCCESS:
            return {
                ...state,
                item: action.item,
                error: "",
            };
        case PROFILE_ITEM_FAILED:
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
export default profile;