import axios from "axios";
//import { I18n } from "react-redux-i18n";
import {
    SETTING_ITEM_SUCCESS,
    SETTING_ITEM_FAILED,
    ///////////////////
    SETTING_UPDATE_SUCCESS,
    SETTING_UPDATE_FAILED,
    ///////////
} from "../types/settingTypes";
import { config } from "../../config";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
const url_api = config.api.web;

export function success(item) {
    return {
        type: SETTING_ITEM_SUCCESS,
        item: item
    };
}

export function failed(error) {
    return {
        type: SETTING_ITEM_FAILED,
        error: error
    };
}



export function successUpdate(item) {
    return {
        type: SETTING_UPDATE_SUCCESS,
        item: item
    };
}

export function failedUpdate(error) {
    return {
        type: SETTING_UPDATE_FAILED,
        error: error
    };
}

export const updateItem = (data: Object) => async (dispatch) => {
    await axios({
        method: "put",
        url: url_api + "setting/tax",
        data: data.params,
        headers: { Authorization: `Bearer ${data.token}` },
    })
        .then(function (response) {
            //console.log(response);
            if (response.status < 300) {
                if (response.data.status === 'Success') {
                    dispatch(successUpdate(response.data.body));
                    alertify.success("Successfull");
                }
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

export const loadItem = (data: Object) => async dispatch => {
    //   dispatch(loading());
    await axios
        .get(url_api + "setting/", {
            params: {
                id: data.user_id,
                //token: data.token,
                //lang: I18n.t("locale")
            },
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

export const reset = (data: Object) => async (dispatch) => {
    await axios({
        method: "post",
        url: url_api + "setting/reset",
        data: data.params,
        headers: { Authorization: `Bearer ${data.token}` },
    })
        .then(function (response) {
            //console.log(response);
            if (response.status < 300) {
                if (response.data.status === 'Success') {
                    dispatch(successUpdate(response.data.body));
                    alertify.success("Successfull");
                }
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