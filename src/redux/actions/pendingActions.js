import axios from "axios";
//import { I18n } from "react-redux-i18n";
import {
    PENDING_ITEM_ATTEMPT,
    PENDING_ITEM_SUCCESS,
    PENDING_ITEM_FAILED,
    ////////////////////
    PENDING_UPDATE_SUCCESS,
    PENDING_UPDATE_FAILED,
    // PENDING_SET_ITEM,

    //////////////////////////

} from "../types/pendingTypes";
import { config } from "../../config";
const url_api = config.api.web;

export function loading() {
    return {
        type: PENDING_ITEM_ATTEMPT
    };
}

export function success(item) {
    return {
        type: PENDING_ITEM_SUCCESS,
        item: item
    };
}

export function failed(error) {
    return {
        type: PENDING_ITEM_FAILED,
        error: error
    };
}

export function successUpdate(item) {
    return {
        type: PENDING_UPDATE_SUCCESS,
        item: item
    };
}
export function failedUpdate(error) {
    return {
        type: PENDING_UPDATE_FAILED,
        error: error
    };
}

/////////////////////////////////////////////

export const loadItem = (data: Object) => async dispatch => {
    dispatch(loading());
    await axios
        .get(url_api + "note/pending", {
            params: data.params,//{
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

export const updateItem = (data: Object) => async (dispatch) => {
    await axios({
        method: "put",
        url: url_api + "note/pending",
        data: data.params,
        headers: { Authorization: `Bearer ${data.token}` },
    })
        .then(function (response) {
            //  console.log(response);
            if (response.status < 300) {
                if (response.data.status === 'Success')
                    dispatch(successUpdate(response.data.body));
                else dispatch(failedUpdate(response.data.body));
            } else {
                dispatch(failedUpdate("try_later"));
            }
        })
        .catch(function (error) {
            //console.log(error);
            if (error.Error) {
                dispatch(failedUpdate("try_later"));
            } else {
                dispatch(failedUpdate("try_later"));
            }
            return;
        });
};