import axios from "axios";
//import { I18n } from "react-redux-i18n";
import {
    FAQ_LIST_ATTEMPT,
    FAQ_LIST_SUCCESS,
    FAQ_LIST_FAILED,
    ////////////////////
    FAQ_NEW_SUCCESS,
    FAQ_NEW_FAILED,
} from "../types/faqTypes";
import { config } from "../../config";

const url_api = config.api.web;

export function loading() {
    return {
        type: FAQ_LIST_ATTEMPT
    };
}

export function success(data) {
    return {
        type: FAQ_LIST_SUCCESS,
        data: data
    };
}

export function failed(error) {
    return {
        type: FAQ_LIST_FAILED,
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
*/
export function successNew(item) {
    return {
        type: FAQ_NEW_SUCCESS,
        item: item
    };
}

export function failedNew(error) {
    return {
        type: FAQ_NEW_FAILED,
        error: error
    };
}

////////////////////////

export const loadList = (data: Object) => async dispatch => {
    dispatch(loading());
    await axios
        .get(url_api + "faq", {
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

export const newItem = (data: Object) => async (dispatch) => {
    //  console.log(data.params);
    await axios({
        method: "post",
        url: url_api + "faq/",
        data: data.params,
        headers: { Authorization: `Bearer ${data.token}` },
    }).then(function (response) {
        //  console.log(response);
        if (response.status < 300) {
            if (response.data.status === 'Success')
                dispatch(successNew(response.data.body));
            else dispatch(failedNew(response.data.body));
        } else {
            dispatch(failedNew("try_later"));
        }
    })
        .catch(function (error) {
            //console.log(error);
            if (error.Error) {
                dispatch(failedNew("try_later"));
            } else {
                dispatch(failedNew("try_later"));
            }
            return;
        });
};