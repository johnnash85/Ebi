import axios from "axios";
//import { I18n } from "react-redux-i18n";
import {
    DASHBOARD_INDICATOR_ATTEMPT,
    DASHBOARD_INDICATOR_SUCCESS,
    DASHBOARD_INDICATOR_FAILED,
    //////////////////////
    DASHBOARD_INVOICE_ATTEMPT,
    DASHBOARD_INVOICE_SUCCESS,
    DASHBOARD_INVOICE_FAILED,
} from "../types/dashboardTypes";
import { config } from "../../config";
const url_api = config.api.web;

export function loading() {
    return {
        type: DASHBOARD_INDICATOR_ATTEMPT
    };
}

export function successIndicator(data) {
    return {
        type: DASHBOARD_INDICATOR_SUCCESS,
        data: data
    };
}

export function failed(error) {
    return {
        type: DASHBOARD_INDICATOR_FAILED,
        error: error
    };
}
////////////////////////////////////////////

////////////////////////////////////////////
export function loadingInvoice() {
    return {
        type: DASHBOARD_INVOICE_ATTEMPT
    };
}
export function successInvoice(data) {
    return {
        type: DASHBOARD_INVOICE_SUCCESS,
        data: data
    };
}
export function failedInvoice(error) {
    return {
        type: DASHBOARD_INVOICE_FAILED,
        error: error
    };
}
export const loadListIndicator = (data: Object) => async dispatch => {
    dispatch(loading());
    await axios
        .get(url_api + "dashboard/indicator", {
            params: {
                id: data.user_id,
                //token: data.token,
                //lang: I18n.t("locale")
            },
            headers: { Authorization: `Bearer ${data.token}` },
        })
        .then(function (response) {
            // console.log(response);
            if (response.status < 300) {
                if (response.data.status === 'Success')
                    dispatch(successIndicator(response.data.body));
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


export const loadListInvoice = (data: Object) => async dispatch => {
    dispatch(loadingInvoice());
    await axios
        .get(url_api + "dashboard/invoice", {
            params: {
                id: data.user_id,
                // token: data.token,
                //lang: I18n.t("locale")
            },
            headers: { Authorization: `Bearer ${data.token}` },
        })
        .then(function (response) {
            //console.log(response);
            if (response.status < 300) {
                if (response.data.status === 'Success')
                    dispatch(successInvoice(response.data.body));
                else dispatch(failed(response.data.body));
            } else {
                dispatch(failedInvoice("try_later"));
            }
        })
        .catch(function (error) {
            console.log(error);
            if (error.Error) {
                dispatch(failedInvoice("try_later"));
            } else {
                dispatch(failedInvoice("try_later"));
            }
            return;
        });
};