import {
    WATCHSTOCK_LIST_ATTEMPT,
    WATCHSTOCK_LIST_SUCCESS,
    WATCHSTOCK_LIST_FAILED,
    ////////////////////
    WATCHSTOCK_NEW_SUCCESS,
    WATCHSTOCK_NEW_FAILED,
    ///////////////////
    WATCHSTOCK_REMOVE_SUCCESS,
    WATCHSTOCK_REMOVE_FAILED,
    ///////////
    WATCHSTOCK_SET_ITEM
} from "../types/watchStockTypes";
import {
    LOGOUT,
} from "../types/sessionTypes";
const INITIAL_STATE = {
    loading: false,
    list_id: "",
    list: [],
    error: "",
    /////////
    loadingMore: false,
    page_count: 0,
    page_size: 0,
};
function watchStock(state = INITIAL_STATE, action) {
    switch (action.type) {
        case WATCHSTOCK_LIST_ATTEMPT:
            return {
                ...state,
                loading: true
            };
        case WATCHSTOCK_LIST_SUCCESS:
            return {
                ...state,
                list: action.data.list,
                list_id: action.data.list_id.toString(),
                page_size: action.data.size,
                error: "",
                loading: false
            };
        case WATCHSTOCK_LIST_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false,
                list: [],
                list_id: 0
            };

        case WATCHSTOCK_REMOVE_SUCCESS: {
            const newList = state.list.filter(item => {
                return item.id.toString() !== action.item.id; // return all the items not matching the action.id
            });
            return {
                ...state,
                list: newList,
            };
        }
        case WATCHSTOCK_REMOVE_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        ///////////////////
        ////////////////////////
        case WATCHSTOCK_SET_ITEM:
            return {
                ...state,
                item: action.item
            }
        case WATCHSTOCK_NEW_SUCCESS:
            {
                if (state.list_id.toString() === action.item.list_id.toString()) {
                    return {
                        ...state,
                        list: [
                            ...state.list,
                            action.item,
                        ],
                    }
                }

            }
        case LOGOUT:
            return INITIAL_STATE
        default:
            return state;
    }
}
export default watchStock;