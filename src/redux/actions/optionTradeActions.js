import axios from "axios";
//import { I18n } from "react-redux-i18n";
import {
    OPTIONTRADE_LIST_ATTEMPT,
    OPTIONTRADE_LIST_SUCCESS,
    OPTIONTRADE_LIST_FAILED,
    ////////////////////

} from "../types/optionTradeTypes";
import { config } from "../../config";
const url_api = config.api.web;

export function loading() {
    return {
        type: OPTIONTRADE_LIST_ATTEMPT
    };
}

export function success(data) {
    return {
        type: OPTIONTRADE_LIST_SUCCESS,
        data: data
    };
}

export function failed(error) {
    return {
        type: OPTIONTRADE_LIST_FAILED,
        error: error
    };
}

export const loadList = (data: Object) => async dispatch => {
    dispatch(loading());
    await axios
        .get(url_api + "optiontrade/", {
            params: data.params,
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