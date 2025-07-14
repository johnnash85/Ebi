import {
    OPTION_LIST_ATTEMPT,
    OPTION_LIST_SUCCESS,
    OPTION_LIST_FAILED,
    ////////////////////
    OPTION_NEW_SUCCESS,
    OPTION_NEW_FAILED,
    ///////////////////
    OPTION_REMOVE_SUCCESS,
    OPTION_REMOVE_FAILED,
    ///////////
    OPTION_SET_ITEM
} from "../types/optionOrderTypes";
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
function optionOrder(state = INITIAL_STATE, action) {
    switch (action.type) {
        case OPTION_LIST_ATTEMPT:
            return {
                ...state,
                loading: true
            };
        case OPTION_LIST_SUCCESS:
            return {
                ...state,
                list: action.data.list,
                page_size: action.data.size,
                error: "",
                loading: false
            };
        case OPTION_LIST_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };

        case OPTION_REMOVE_SUCCESS: {
            var newList;
            if (action.item.counter === 0) {
                newList = state.list.filter(item => {
                    return item.symbol !== action.item.symbol;
                });
            }
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
            };
        }
        case OPTION_REMOVE_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        ///////////////////
        ////////////////////////
        case OPTION_SET_ITEM:
            return {
                ...state,
                item: action.item
            }
        case OPTION_NEW_SUCCESS:
            {
                let band = true;
                const newState = state.list.map((item) => {
                    if (item.symbol === action.item.symbol) {
                        band = false;
                        return action.item;
                    }
                    else return item;
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
            }
        case LOGOUT:
            return INITIAL_STATE
        default:
            return state;
    }
}
export default optionOrder;