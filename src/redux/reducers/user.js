import {

    ////////////////////
    USER_NEW_SUCCESS,
    USER_NEW_FAILED,
    ///////////////////
    USER_REMOVE_SUCCESS,
    USER_REMOVE_FAILED,
    ///////////////
    USER_SET_ITEM
} from "../types/userTypes";
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
function users(state = INITIAL_STATE, action) {
    switch (action.type) {
        /*  case USER_LIST_ATTEMPT:
              return {
                  ...state,
                  loading: true
              };
          case USER_LIST_SUCCESS:
              return {
                  ...state,
                  list: action.data.list,
                  page_size: action.data.size,
                  error: "",
                  loading: false
              };
          case USER_LIST_FAILED:
              return {
                  ...state,
                  error: action.error,
                  loading: false
              };
  */
        case USER_REMOVE_SUCCESS: {
            const newList = state.list.filter(item => {
                return item.id.toString() !== action.item.id; // return all the items not matching the action.id
            });
            return {
                ...state,
                list: newList,
            };
        }
        case USER_REMOVE_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        ///////////////////
        ////////////////////////
        case USER_SET_ITEM:
            return {
                ...state,
                item: action.item
            }
        case USER_NEW_SUCCESS:
            return {
                ...state,
                item: {}
            }
        case LOGOUT:
            return INITIAL_STATE
        default:
            return state;
    }
}
export default users;