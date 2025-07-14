import axios from "axios";
//import { I18n } from "react-redux-i18n";
import {
    HISTORY_LIST_ATTEMPT,
    HISTORY_LIST_SUCCESS,
    HISTORY_LIST_FAILED,
    ////////////////////
    HISTORY_MORELIST_ATTEMPT,
    HISTORY_MORELIST_SUCCESS,
    HISTORY_MORELIST_FAILED,
    //////////////////////
    HISTORY_REMOVE_SUCCESS,
    HISTORY_REMOVE_FAILED,
} from "../types/historyTypes";
import { config } from "../../config";

const url_api = config.api.web;

export function loading() {
    return {
        type: HISTORY_LIST_ATTEMPT
    };
}

export function success(data) {
    return {
        type: HISTORY_LIST_SUCCESS,
        data: data
    };
}

export function failed(error) {
    return {
        type: HISTORY_LIST_FAILED,
        error: error
    };
}

///////////////////////////////////////////

export function loadingMore() {
    return {
        type: HISTORY_MORELIST_ATTEMPT
    };
}

export function successMore(data) {
    return {
        type: HISTORY_MORELIST_SUCCESS,
        data: data
    };
}

export function failedMore(error) {
    return {
        type: HISTORY_MORELIST_FAILED,
        error: error
    };
}
//////////////////////////
export function successRemove(item) {
    return {
        type: HISTORY_REMOVE_SUCCESS,
        item: item
    };
}

export function failedRemove(error) {
    return {
        type: HISTORY_REMOVE_FAILED,
        error: error
    };
}
////////////////////////

export const loadList = (data: Object) => async dispatch => {
    dispatch(loading());
    await axios
        .get(url_api + "history/", {
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
        .get(url_api + "history/", {
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

export const removeItem = (data: Object) => async (dispatch) => {
    await axios({
        method: "delete",
        url: url_api + "history/",
        params: data.params,
        headers: { Authorization: `Bearer ${data.token}` },
    })
        .then(function (response) {
            //  console.log(response);
            if (response.status < 300) {
                if (response.data.status === 'Success')
                    dispatch(successRemove(response.data.body));
                else dispatch(failedRemove(response.data.body));
            } else {
                dispatch(failedRemove("try_later"));
            }
        })
        .catch(function (error) {
            //console.log(error);
            if (error.Error) {
                dispatch(failedRemove("try_later"));
            } else {
                dispatch(failedRemove("try_later"));
            }
            return;
        });
};