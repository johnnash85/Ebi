import {
    KNOWLEDGE_CATEGORY_LIST_ATTEMPT,
    KNOWLEDGE_CATEGORY_LIST_SUCCESS,
    KNOWLEDGE_CATEGORY_LIST_FAILED,
    ////////////////////
    KNOWLEDGE_CATEGORY_MORELIST_ATTEMPT,
    KNOWLEDGE_CATEGORY_MORELIST_SUCCESS,
    KNOWLEDGE_CATEGORY_MORELIST_FAILED,
} from "../types/knowledgeCategoryTypes";
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
};
function knowledgeCategory(state = INITIAL_STATE, action) {
    switch (action.type) {
        case KNOWLEDGE_CATEGORY_LIST_ATTEMPT:
            return {
                ...state,
                loading: true
            };
        case KNOWLEDGE_CATEGORY_LIST_SUCCESS:
            return {
                ...state,
                list: action.data.list,
                page_size: action.data.size,
                page_count: action.data.size,
                item: action.data.list[0],
                error: "",
                loading: false
            };
        case KNOWLEDGE_CATEGORY_LIST_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        ////////////////////
        case KNOWLEDGE_CATEGORY_MORELIST_ATTEMPT:
            return {
                ...state,
                loadingMore: true,
            };

        case KNOWLEDGE_CATEGORY_MORELIST_SUCCESS:
            return {
                ...state,
                loadingMore: false,
                page_size: action.data.size,
                page_count: state.page_count + action.data.size,
                list: state.list.concat(action.data.list),
                error: "",
            };

        case KNOWLEDGE_CATEGORY_MORELIST_FAILED:
            return {
                ...state,
                loadingMore: false,
            };
        case LOGOUT:
            return INITIAL_STATE
        default:
            return state;
    }
};
export default knowledgeCategory;