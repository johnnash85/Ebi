import axios from "axios";
//import { I18n } from "react-redux-i18n";
import {
    NEWS_LIST_ATTEMPT,
    NEWS_LIST_SUCCESS,
    NEWS_LIST_FAILED,
    ////////////////////
    NEWS_MORELIST_ATTEMPT,
    NEWS_MORELIST_SUCCESS,
    NEWS_MORELIST_FAILED,
    ////////////////////////
    STOCK_INDICATOR_ATTEMPT,
    STOCK_INDICATOR_SUCCESS,
    STOCK_INDICATOR_FAILED,
    //////////////////////
    STOCK_STRATEGY_ATTEMPT,
    STOCK_STRATEGY_SUCCESS,
    STOCK_STRATEGY_FAILED
} from "../types/stockNewsTypes";
import { config } from "../../config";

const url_api = config.api.web;

export function loading() {
    return {
        type: NEWS_LIST_ATTEMPT
    };
}

export function success(data) {
    return {
        type: NEWS_LIST_SUCCESS,
        data: data
    };
}

export function failed(error) {
    return {
        type: NEWS_LIST_FAILED,
        error: error
    };
}

///////////////////////////////////////////

export function loadingMore() {
    return {
        type: NEWS_MORELIST_ATTEMPT
    };
}

export function successMore(data) {
    return {
        type: NEWS_MORELIST_SUCCESS,
        data: data
    };
}

export function failedMore(error) {
    return {
        type: NEWS_MORELIST_FAILED,
        error: error
    };
}
////////////////////////
export function loadingIndicator() {
    return {
        type: STOCK_INDICATOR_ATTEMPT
    };
}

export function successIndicator(data) {
    return {
        type: STOCK_INDICATOR_SUCCESS,
        data: data
    };
}

export function failedIndicator(error) {
    return {
        type: STOCK_INDICATOR_FAILED,
        error: error
    };
}
//////////////////////////////////
export function loadingStrategy() {
    return {
        type: STOCK_STRATEGY_ATTEMPT
    };
}

export function successStrategy(data) {
    return {
        type: STOCK_STRATEGY_SUCCESS,
        data: data
    };
}

export function failedStrategy(error) {
    return {
        type: STOCK_STRATEGY_FAILED,
        error: error
    };
}
export const loadList = (data: Object) => async dispatch => {
    dispatch(loading());
    await axios
        .get(url_api + "stock/news", {
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
        .get(url_api + "stock/news", {
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


export const loadIndicator = (data: Object) => async dispatch => {
    dispatch(loadingIndicator());
    await axios
        .get(url_api + "stock/indicator", {
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
                    dispatch(successIndicator(response.data.body));
                else dispatch(failedIndicator(response.data.body));
            } else {
                dispatch(failedIndicator("try_later"));
            }
        })
        .catch(function (error) {
            console.log(error);
            if (error.Error) {
                dispatch(failedIndicator("try_later"));
            } else {
                dispatch(failedIndicator("try_later"));
            }
            return;
        });
};

export const loadStrategy = (data: Object) => async dispatch => {
    dispatch(loadingStrategy());
    await axios
        .get(url_api + "stock/strategy", {
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
                    dispatch(successStrategy(response.data.body));
                else dispatch(failedStrategy(response.data.body));
            } else {
                dispatch(failedStrategy("try_later"));
            }
        })
        .catch(function (error) {
            console.log(error);
            if (error.Error) {
                dispatch(failedStrategy("try_later"));
            } else {
                dispatch(failedStrategy("try_later"));
            }
            return;
        });
};