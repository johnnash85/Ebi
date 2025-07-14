import {
    COMMENT_LIST_ATTEMPT,
    COMMENT_LIST_SUCCESS,
    COMMENT_LIST_FAILED,
    ////////////////////
    COMMENT_NEW_SUCCESS,
    COMMENT_NEW_FAILED,
    ////////////////////
    COMMENT_LIKE_SUCCESS,
    COMMENT_LIKE_FAILED,
    /////////////////
    COMMENT_SET_ITEM,
    //////////
    COMMENT_MORELIST_ATTEMPT,
    COMMENT_MORELIST_SUCCESS,
    COMMENT_MORELIST_FAILED,
    ////////////////
    COMMENT_REMOVE_SUCCESS,
    COMMENT_REMOVE_FAILED,
} from "../types/commentTypes";
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
    item: {}
};
function comment(state = INITIAL_STATE, action) {
    switch (action.type) {
        case COMMENT_LIST_ATTEMPT:
            return {
                ...state,
                loading: true
            };
        case COMMENT_LIST_SUCCESS:
            return {
                ...state,
                list: action.data.list,
                page_size: action.data.size,
                page_count: action.data.size,
                error: "",
                loading: false
            };
        case COMMENT_LIST_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        //////////////////////////////////////////
        case COMMENT_MORELIST_ATTEMPT:
            return {
                ...state,
                loadingMore: true,
            };

        case COMMENT_MORELIST_SUCCESS:
            return {
                ...state,
                loadingMore: false,
                page_size: action.data.size,
                page_count: state.page_count + action.data.size,
                list: state.list.concat(action.data.list),
                error: "",
            };

        case COMMENT_MORELIST_FAILED:
            return {
                ...state,
                loadingMore: false,
            };
        /////////////////////
        case COMMENT_NEW_SUCCESS:
            return {
                ...state,
                list: [
                    action.item,
                    ...state.list
                ],
                error: "",
                loading: false
            };
        case COMMENT_NEW_FAILED:
            return {
                ...state,
                error: action.error,
            };
        /////////////////////
        case COMMENT_LIKE_SUCCESS:
            {
                let newState = state.list.map((item) => {
                    if (item.id === action.item.id) {
                        item.like = action.item.like;
                        return item;
                    }
                    else return item;
                });
                return {
                    ...state,
                    list: newState,
                    error: "",
                    loading: false
                };
            }
        case COMMENT_LIKE_FAILED:
            return {
                ...state,
                error: action.error,
            };
        ////////////////////
        case COMMENT_SET_ITEM:
            return {
                ...state,
                item: action.item
            }

        /////////////////////
        case COMMENT_REMOVE_SUCCESS: {
            const newList = state.list.filter(item => {
                return item.id.toString() !== action.item.id.toString();
            });

            return {
                ...state,
                list: newList,
            };
        }
        case COMMENT_REMOVE_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case LOGOUT:
            return INITIAL_STATE
        default:
            return state;
    }
}
export default comment;