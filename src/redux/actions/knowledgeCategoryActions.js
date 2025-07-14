import axios from "axios";
//import { I18n } from "react-redux-i18n";
import {
    KNOWLEDGE_CATEGORY_LIST_ATTEMPT,
    KNOWLEDGE_CATEGORY_LIST_SUCCESS,
    KNOWLEDGE_CATEGORY_LIST_FAILED,
    ////////////////////
    KNOWLEDGE_CATEGORY_MORELIST_ATTEMPT,
    KNOWLEDGE_CATEGORY_MORELIST_SUCCESS,
    KNOWLEDGE_CATEGORY_MORELIST_FAILED,
} from "../types/knowledgeCategoryTypes";
import { config } from "../../config";

const url_api = config.api.web;

export function loading() {
    return {
        type: KNOWLEDGE_CATEGORY_LIST_ATTEMPT
    };
}

export function success(data) {
    return {
        type: KNOWLEDGE_CATEGORY_LIST_SUCCESS,
        data: data
    };
}

export function failed(error) {
    return {
        type: KNOWLEDGE_CATEGORY_LIST_FAILED,
        error: error
    };
}

///////////////////////////////////////////

export function loadingMore() {
    return {
        type: KNOWLEDGE_CATEGORY_MORELIST_ATTEMPT
    };
}

export function successMore(data) {
    return {
        type: KNOWLEDGE_CATEGORY_MORELIST_SUCCESS,
        data: data
    };
}

export function failedMore(error) {
    return {
        type: KNOWLEDGE_CATEGORY_MORELIST_FAILED,
        error: error
    };
}

export const loadList = (data: Object) => async dispatch => {
    dispatch(loading());
    await axios
        .get(url_api + "knowledge/list", {
            params: data.params,//{
            // id: data.user_id,
            //token: data.token,
            //lang: I18n.t("locale")
            // },
            headers: { Authorization: `Bearer ${data.token}` },
        })
        .then(function (response) {
            //console.log(response);
            if (response.status < 300) {
                if (response.data.status === 'Success')
                    dispatch(success(response.data.body));
                else dispatch(failed(response.data.body));
            } else {
                dispatch(failed("try_later"));
            }
        })
        .catch(function (error) {
            console.log(error);
            if (error.Error) {
                dispatch(failed("try_later"));
            } else {
                dispatch(failed("try_later"));
            }
            return;
        });
};

export const loadListScroll = (data: Object) => async dispatch => {
    dispatch(loadingMore());
    await axios
        .get(url_api + "knowledge/list", {
            params: data.params,
            headers: { Authorization: `Bearer ${data.token}` },
        })
        .then(function (response) {
            //console.log(response);
            if (response.status < 300) {
                if (response.data.status === 'Success')
                    dispatch(successMore(response.data.body));
                else dispatch(failedMore(response.data.body));
            } else {
                dispatch(failedMore("try_later"));
            }
        })
        .catch(function (error) {
            console.log(error);
            if (error.Error) {
                dispatch(failedMore("try_later"));
            } else {
                dispatch(failedMore("try_later"));
            }
            return;
        });
};