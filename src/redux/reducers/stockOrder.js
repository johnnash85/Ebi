import {
    STOCK_ORDER_LIST_ATTEMPT,
    STOCK_ORDER_LIST_SUCCESS,
    STOCK_ORDER_LIST_FAILED,
    ////////////////////
    STOCK_ORDER_NEW_SUCCESS,
    STOCK_ORDER_NEW_FAILED,
    ///////////////////
    STOCK_ORDER_REMOVE_SUCCESS,
    STOCK_ORDER_REMOVE_FAILED,
    ///////////
    STOCK_ORDER_SET_ITEM
} from "../types/stockOrderTypes";
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
function stockOrder(state = INITIAL_STATE, action) {
    switch (action.type) {
        case STOCK_ORDER_LIST_ATTEMPT:
            return {
                ...state,
                loading: true
            };
        case STOCK_ORDER_LIST_SUCCESS:
            return {
                ...state,
                list: action.data.list,
                page_size: action.data.size,
                error: "",
                loading: false
            };
        case STOCK_ORDER_LIST_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };

        case STOCK_ORDER_REMOVE_SUCCESS: {
            var newList;
            if (action.item.counter === 0)
                newList = state.list.filter(item => {
                    return item.symbol !== action.item.symbol;
                });
            else {
                newList = state.list.map((item) => {
                    if (item.symbol === action.item.symbol) {
                        return action.item;
                    }
                    return item;
                });
            }
            return {
                ...state,
                list: newList,
                item: {}
            };
        }
        case STOCK_ORDER_REMOVE_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        ///////////////////
        ////////////////////////
        case STOCK_ORDER_SET_ITEM:
            return {
                ...state,
                item: action.item
            }
        case STOCK_ORDER_NEW_SUCCESS:
            let band = true;
            const newState = state.list.map((item) => {
                if (item.symbol === action.item.symbol) {
                    band = false;
                    return action.item;
                }
                return item;
            });
            if (band)
                return {
                    ...state,
                    list: [
                        action.item,
                        ...state.list
                    ],
                    item: {}
                };
            return {
                ...state,
                list: newState,
                item: {}
            };
        case LOGOUT:
            return INITIAL_STATE
        default:
            return state;
    }
}
export default stockOrder;

/**
 *  else {
                    newItem = item.sub_order.filter(item_ => {
                        return item_.id.toString() !== action.item.id.toString();
                    });
                    item.sub_order = newItem;
                    item.count = item.sub_order.length;
                    return item;
                }
 */