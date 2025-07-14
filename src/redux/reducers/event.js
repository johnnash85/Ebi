import {
    UPDATE_TICKER_STOCK_QUOTE,
    ////////////////////
    UPDATE_TICKER_OPTION_QUOTE
} from "../types/eventTypes";
import {
    LOGOUT,
} from "../types/sessionTypes";
const INITIAL_STATE = {
    stock: {},
    /////////
    option: {},
    /////////////
};
function event(state = INITIAL_STATE, action) {

    switch (action.type) {
        case UPDATE_TICKER_STOCK_QUOTE:
            return {
                ...state,
                stock: {
                    ...state.stock,
                    [action.item.sym]: action.item
                }
            };
        case UPDATE_TICKER_OPTION_QUOTE:
            return {
                ...state,
                option: {
                    ...state.option,
                    [action.item.sym]: action.item
                }
            };
        case LOGOUT:
            return INITIAL_STATE
        default:
            return state;
    }
};
export default event;