import axios from "axios";
//import { I18n } from "react-redux-i18n";
import {
    EMAIL_WELCOME_SUCCESS,
    MAIL_WELCOME_FAILED,
} from "../types/emailTypes";
import { config } from "../../config";
const url_api = config.api.web;
/*
export function loading() {
    return {
        type: EXAM_LIST_ATTEMPT
    };
}
*/
export function success(data) {
    return {
        type: EMAIL_WELCOME_SUCCESS,
        data: data
    };
}

export function failed(error) {
    return {
        type: MAIL_WELCOME_FAILED,
        error: error
    };
}
export const emailActivate = (data: Object) => async (dispatch) => {
    await axios({
        method: "post",
        url: url_api + "email",
        data: data.params,
        headers: { Authorization: `Bearer ${data.token}` },
    })
        .then(function (response) {
            //  console.log(response);
            if (response.status < 300) {
                if (response.data.status === 'Success')
                    dispatch(success(response.data.body));
                else dispatch(failed(response.data.body));
            } else {
                dispatch(failed("try_later"));
            }
        })
        .catch(function (error) {
            //console.log(error);
            if (error.Error) {
                dispatch(failed("try_later"));
            } else {
                dispatch(failed("try_later"));
            }
            return;
        });
};