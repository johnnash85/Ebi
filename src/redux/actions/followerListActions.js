import axios from "axios";
//import { I18n } from "react-redux-i18n";
import {
    FOLLOWER_LIST_ATTEMPT,
    FOLLOWER_LIST_SUCCESS,
    FOLLOWER_LIST_FAILED,
    ////////////////////
    FOLLOWER_MORELIST_ATTEMPT,
    FOLLOWER_MORELIST_SUCCESS,
    FOLLOWER_MORELIST_FAILED
} from "../types/followerListTypes";
import { config } from "../../config";

const url_api = config.api.web;

export function loading() {
    return {
        type: FOLLOWER_LIST_ATTEMPT
    };
}

export function success(data) {
    return {
        type: FOLLOWER_LIST_SUCCESS,
        data: data
    };
}

export function failed(error) {
    return {
        type: FOLLOWER_LIST_FAILED,
        error: error
    };
}

///////////////////////////////////////////

export function loadingMore() {
    return {
        type: FOLLOWER_MORELIST_ATTEMPT
    };
}

export function successMore(data) {
    return {
        type: FOLLOWER_MORELIST_SUCCESS,
        data: data
    };
}

export function failedMore(error) {
    return {
        type: FOLLOWER_MORELIST_FAILED,
        error: error
    };
}

////////////////////////

export const loadList = (data: Object) => async dispatch => {
    dispatch(loading());
    await axios
        .get(url_api + "follower/", {
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
        .get(url_api + "follower/", {
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