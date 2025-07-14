import axios from "axios";
//import { I18n } from "react-redux-i18n";
import {
    // HISTORY_LIST_ATTEMPT,
    IMPORT_LIST_SUCCESS,
    IMPORT_LIST_FAILED,
    ////////////////////
    SET_IMPORT_TABLE
} from "../types/importTypes";
import { config } from "../../config";

const url_api = config.api.web;

export function setTable(data) {
    return {
        type: SET_IMPORT_TABLE,
        data: data
    };
}
///////////////////////
export function successNew(data) {
    return {
        type: IMPORT_LIST_SUCCESS,
        data: data
    };
}
export function failedNew(data) {
    return {
        type: IMPORT_LIST_FAILED,
        data: data
    };
}

export const setTableCSV = (data: Object) => async dispatch => {
    dispatch(setTable(data));
}

export const newList = (data: Object) => async (dispatch) => {
    await axios({
        method: "post",
        url: url_api + "import/" + data.params.broker,
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