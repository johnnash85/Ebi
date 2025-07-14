import {
    STOCK_LIST_ATTEMPT,
    STOCK_LIST_SUCCESS,
    STOCK_LIST_FAILED,
    STOCK_LIST_RESET,
    ////////////////////
    STOCK_ITEM_ATTEMPT,
    STOCK_ITEM_SUCCESS,
    STOCK_ITEM_FAILED,
    ////////////////////
    STOCK_NEW_SUCCESS,
    STOCK_NEW_FAILED,
    ///////////////////
    STOCK_REMOVE_SUCCESS,
    STOCK_REMOVE_FAILED,
    ///////////
    STOCK_SET_ITEM
} from "../types/stockTypes";
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
function stock(state = INITIAL_STATE, action) {
    switch (action.type) {
        case STOCK_LIST_ATTEMPT:
            return {
                ...state,
                loading: true
            };
        case STOCK_LIST_SUCCESS:
            return {
                ...state,
                list: action.data.list,
                page_size: action.data.size,
                error: "",
                loading: false
            };
        case STOCK_LIST_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case STOCK_LIST_RESET:
            return {
                ...state,
                list: [],
            }
        ///////////////////////////
        case STOCK_ITEM_ATTEMPT:
            return {
                ...state,
                loading: true
            };
        case STOCK_ITEM_SUCCESS:
            return {
                ...state,
                item: action.item,
                error: "",
                loading: false
            };
        case STOCK_ITEM_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        //////////////////////////
        case STOCK_REMOVE_SUCCESS: {
            const newList = state.list.filter(item => {
                return item.id.toString() !== action.item.id.toString();
            });

            return {
                ...state,
                list: newList,
            };
        }
        case STOCK_REMOVE_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        ///////////////////
        ////////////////////////
        case STOCK_SET_ITEM:
            return {
                ...state,
                item: action.item
            }
        case STOCK_NEW_SUCCESS:
            return {
                ...state,
                list: [
                    action.item,
                    ...state.list
                ],
                item: {}
            }
        case LOGOUT:
            return INITIAL_STATE
        default:
            return state;
    }
}
export default stock;