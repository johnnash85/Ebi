import axios from "axios";
//import { I18n } from "react-redux-i18n";
import {
    NOTIFICATION_LIST_ATTEMPT,
    NOTIFICATION_LIST_SUCCESS,
    NOTIFICATION_LIST_FAILED,
    ////////////////////
    NOTIFICATION_MORELIST_ATTEMPT,
    NOTIFICATION_MORELIST_SUCCESS,
    NOTIFICATION_MORELIST_FAILED,
    ////////////
    NOTIFICATION_SET_COUNT
} from "../types/notificationTypes";
import { config } from "../../config";

const url_api = config.api.web;

export function loading() {
    return {
        type: NOTIFICATION_LIST_ATTEMPT
    };
}

export function success(data) {
    return {
        type: NOTIFICATION_LIST_SUCCESS,
        data: data
    };
}

export function failed(error) {
    return {
        type: NOTIFICATION_LIST_FAILED,
        error: error
    };
}

///////////////////////////////////////////

export function loadingMore() {
    return {
        type: NOTIFICATION_MORELIST_ATTEMPT
    };
}

export function successMore(data) {
    return {
        type: NOTIFICATION_MORELIST_SUCCESS,
        data: data
    };
}

export function failedMore(error) {
    return {
        type: NOTIFICATION_MORELIST_FAILED,
        error: error
    };
}

export function setNum(count) {
    return {
        type: NOTIFICATION_SET_COUNT,
        count: count
    };
}

////////////////////////
export const setCount = (data: Object) => async dispatch => {
    dispatch(setNum(data.count));
}
export const loadList = (data: Object) => async dispatch => {
    dispatch(loading());
    await axios
        .get(url_api + "notification/", {
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
        .get(url_api + "notification/", {
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