import {
    WATCHLIST_LIST_ATTEMPT,
    WATCHLIST_LIST_SUCCESS,
    WATCHLIST_LIST_FAILED,
    ////////////////////
    WATCHLIST_NEW_SUCCESS,
    WATCHLIST_NEW_FAILED,
    ///////////////////
    WATCHLIST_REMOVE_SUCCESS,
    WATCHLIST_REMOVE_FAILED,
    ///////////
    WATCHLIST_SET_ITEM
} from "../types/watchListTypes";
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
    item: {}

};
function watchList(state = INITIAL_STATE, action) {
    switch (action.type) {
        case WATCHLIST_LIST_ATTEMPT:
            return {
                ...state,
                loading: true
            };
        case WATCHLIST_LIST_SUCCESS:
            return {
                ...state,
                list: action.data.list,
                page_size: action.data.size,
                error: "",
                loading: false
            };
        case WATCHLIST_LIST_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };

        case WATCHLIST_REMOVE_SUCCESS: {
            const newList = state.list.filter(item => {
                return item.id.toString() !== action.item.id; // return all the items not matching the action.id
            });
            return {
                ...state,
                list: newList,
            };
        }
        case WATCHLIST_REMOVE_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        ///////////////////
        ////////////////////////
        case WATCHLIST_SET_ITEM:
            return {
                ...state,
                item: action.item
            }
        case WATCHLIST_NEW_SUCCESS:
            return {
                ...state,
                list: [
                    ...state.list,
                    action.item,
                ],
            }
        case LOGOUT:
            return INITIAL_STATE
        default:
            return state;
    }
}
export default watchList;