import axios from "axios";
//import { I18n } from "react-redux-i18n";
import {
    OPTIONHISTORY_LIST_ATTEMPT,
    OPTIONHISTORY_LIST_SUCCESS,
    OPTIONHISTORY_LIST_FAILED,
    ////////////////////
} from "../types/optionHistoryTypes";
import { config } from "../../config";

const url_api = config.api.web;

export function loading() {
    return {
        type: OPTIONHISTORY_LIST_ATTEMPT
    };
}

export function success(data) {
    return {
        type: OPTIONHISTORY_LIST_SUCCESS,
        data: data
    };
}

export function failed(error) {
    return {
        type: OPTIONHISTORY_LIST_FAILED,
        error: error
    };
}

///////////////////////////////////////////
/*
export function loadingMore() {
    return {
        type: DISCOVER_MORELIST_ATTEMPT
    };
}

export function successMore(data) {
    return {
        type: DISCOVER_MORELIST_SUCCESS,
        data: data
    };
}

export function failedMore(error) {
    return {
        type: DISCOVER_MORELIST_FAILED,
        error: error
    };
}
*/
////////////////////////

export const loadList = (data: Object) => async dispatch => {
    dispatch(loading());
    await axios
        .get(url_api + "rollhistory", {
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