import {
  LEGAL_ATTEMPT,
  LEGAL_SUCCESS,
  LEGAL_FAILED,
  //////////////////
} from "../types/legalTypes";
import {
  LOGOUT,
} from "../types/sessionTypes";
const INITIAL_STATE = {
  loading: false,
  list: [],
  error: "",
  page_size: 0,
  index: 1,
  count: 0,
  error_update: "",
  //success_update: ""
};

function legal(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LEGAL_ATTEMPT:
      return {
        ...state,
        loading: true,
      };

    case LEGAL_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.data.list,
        page_size: action.data.size,
        index: action.data.index,
        //count: action.data.users_count,
        error: "",
      };

    case LEGAL_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        list: [],
      };
    /////////////////////////////////////////////
    /* case AD_DELETE_SUCCESS: {
        const newState = state.userList.filter(item => {
          return item.Id !== action.id;
        });
        return {
          ...state,
          userList: newState,
          count: state.count - 1,
          error: ""
        };
      }
  
      case AD_DELETE_FAILED:
        return {
          ...state,
          error_update: action.error
        };
      
          case REGISTER_SUCCESS:
            return {
              ...state,
              success_update: action.success,
              error_update: ""
            };
      
          case UPDATE_FAILED:
            return {
              ...state,
              success_update: "",
              error_update: action.error
            };
            */
    case LOGOUT:
      return INITIAL_STATE
    default:
      return state;
  }
}
export default legal;
