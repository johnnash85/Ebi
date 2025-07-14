import {
    NOTE_LIST_ATTEMPT,
    NOTE_LIST_SUCCESS,
    NOTE_LIST_FAILED,
    ////////////////////
    NOTE_MORELIST_ATTEMPT,
    NOTE_MORELIST_SUCCESS,
    NOTE_MORELIST_FAILED,
    ////////////////
    NOTE_NEW_SUCCESS,
    NOTE_NEW_FAILED,
    /////////////////////
    NOTE_UPDATE_SUCCESS,
    NOTE_UPDATE_HIDE_SUCCESS,
    NOTE_SET_ITEM,
    /////////////////
    NOTE_REMOVE_SUCCESS,
    NOTE_REMOVE_FAILED
} from "../types/noteTypes";
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
    item: {},
};
function note(state = INITIAL_STATE, action) {
    switch (action.type) {
        case NOTE_LIST_ATTEMPT:
            return {
                ...state,
                loading: true
            };
        case NOTE_LIST_SUCCESS:
            return {
                ...state,
                list: action.data.list,
                page_size: action.data.size,
                page_count: action.data.size,
                item: action.data.list[0],
                error: "",
                loading: false
            };
        case NOTE_LIST_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        ////////////////////
        case NOTE_MORELIST_ATTEMPT:
            return {
                ...state,
                loadingMore: true,
            };

        case NOTE_MORELIST_SUCCESS:
            return {
                ...state,
                loadingMore: false,
                page_size: action.data.size,
                page_count: state.page_count + action.data.size,
                list: state.list.concat(action.data.list),
                error: "",
            };

        case NOTE_MORELIST_FAILED:
            return {
                ...state,
                loadingMore: false,
            };
        /////////////////////
        case NOTE_NEW_SUCCESS:
            return {
                ...state,
                list: [
                    action.item,
                    ...state.list
                ],
                item: {}
            }
        case NOTE_NEW_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        ///////////////////////
        case NOTE_UPDATE_SUCCESS: {
            const newList = state.list.map((element) => {
                if (element.id === action.item.id)
                    return action.item;
                return element;
            });
            return {
                ...state,
                item: action.item,
                list: newList
            };
        }
        case NOTE_UPDATE_HIDE_SUCCESS:
            {
                const newList = state.list.map((element) => {
                    if (element.id === action.item.id)
                        return action.item;
                    return element;
                });
                return {
                    ...state,
                    list: newList
                };
            }
        case NOTE_SET_ITEM:
            return {
                ...state,
                item: action.item
            };
        //////////////////////////////////////////
        case NOTE_REMOVE_SUCCESS: {
            const newList = state.list.filter(item => {
                return item.id.toString() !== action.item.id.toString();
            });

            return {
                ...state,
                list: newList,
            };
        }
        case NOTE_REMOVE_FAILED:
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
};
export default note;