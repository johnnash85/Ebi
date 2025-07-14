import axios from "axios";
//import { I18n } from "react-redux-i18n";
import {
    WINNERS_LIST_ATTEMPT,
    WINNERS_LIST_SUCCESS,
    WINNERS_LIST_FAILED,
    ////////////////////
    LOSERS_LIST_ATTEMPT,
    LOSERS_LIST_SUCCESS,
    LOSERS_LIST_FAILED,
} from "../types/marketWinLowTypes";
import { config } from "../../config";

const url_api = config.api.web;

export function loadingWinners() {
    return {
        type: WINNERS_LIST_ATTEMPT
    };
}

export function successWinners(data) {
    return {
        type: WINNERS_LIST_SUCCESS,
        data: data
    };
}

export function failedWinners(error) {
    return {
        type: WINNERS_LIST_FAILED,
        error: error
    };
}
///////////////////////////
export function loadingLosers() {
    return {
        type: LOSERS_LIST_ATTEMPT
    };
}

export function successLosers(data) {
    return {
        type: LOSERS_LIST_SUCCESS,
        data: data
    };
}

export function failedLosers(error) {
    return {
        type: LOSERS_LIST_FAILED,
        error: error
    };
}
export const loadListWinners = (data: Object) => async dispatch => {
    dispatch(loadingWinners());
    await axios
        .get(url_api + "market/winners", {
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
                    dispatch(successWinners(response.data.body));
                else dispatch(failedWinners(response.data.body));
            } else {
                dispatch(failedWinners("try_later"));
            }
        })
        .catch(function (error) {
            console.log(error);
            if (error.Error) {
                dispatch(failedWinners("try_later"));
            } else {
                dispatch(failedWinners("try_later"));
            }
            return;
        });
};

export const loadListLosers = (data: Object) => async dispatch => {
    dispatch(loadingLosers());
    await axios
        .get(url_api + "market/losers", {
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
                    dispatch(successLosers(response.data.body));
                else dispatch(failedLosers(response.data.body));
            } else {
                dispatch(failedLosers("try_later"));
            }
        })
        .catch(function (error) {
            console.log(error);
            if (error.Error) {
                dispatch(failedLosers("try_later"));
            } else {
                dispatch(failedLosers("try_later"));
            }
            return;
        });
};

