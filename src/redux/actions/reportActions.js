import axios from "axios";
//import { I18n } from "react-redux-i18n";
import {
    SUMSYMBOL_LIST_ATTEMPT,
    SUMSYMBOL_LIST_SUCCESS,
    SUMSYMBOL_LIST_FAILED,
    ////////////////////
    LATESROI_LIST_ATTEMPT,
    LATESROI_LIST_SUCCESS,
    LATESROI_LIST_FAILED,
    //////////////////////
    LATESTRADE_LIST_ATTEMPT,
    LATESTRADE_LIST_SUCCESS,
    LATESTRADE_LIST_FAILED,
    //////////////////////
    SUMSTRATEGY_LIST_ATTEMPT,
    SUMSTRATEGY_LIST_SUCCESS,
    SUMSTRATEGY_LIST_FAILED,
} from "../types/reportTypes";
import { config } from "../../config";

const url_api = config.api.web;

export function loading() {
    return {
        type: SUMSYMBOL_LIST_ATTEMPT
    };
}

export function success(data) {
    return {
        type: SUMSYMBOL_LIST_SUCCESS,
        data: data
    };
}

export function failed(error) {
    return {
        type: SUMSYMBOL_LIST_FAILED,
        error: error
    };
}

///////////////////////////////////////////
export function loadingLatesRoi() {
    return {
        type: LATESROI_LIST_ATTEMPT
    };
}
export function successLatesRoi(data) {
    return {
        type: LATESROI_LIST_SUCCESS,
        data: data
    };
}
export function failedLatesRoi(error) {
    return {
        type: LATESROI_LIST_FAILED,
        error: error
    };
}
////////////////////////////////////////////
export function loadingLatesTrade() {
    return {
        type: LATESTRADE_LIST_ATTEMPT
    };
}
export function successLatesTrade(data) {
    return {
        type: LATESTRADE_LIST_SUCCESS,
        data: data
    };
}
export function failedLatesTrade(error) {
    return {
        type: LATESTRADE_LIST_FAILED,
        error: error
    };
}
////////////////////
export function loadingStrategy() {
    return {
        type: SUMSTRATEGY_LIST_ATTEMPT
    };
}

export function successStrategy(data) {
    return {
        type: SUMSTRATEGY_LIST_SUCCESS,
        data: data
    };
}

export function failedStrategy(error) {
    return {
        type: SUMSTRATEGY_LIST_FAILED,
        error: error
    };
}


////////////////////////

export const loadListSymbol = (data: Object) => async dispatch => {
    dispatch(loading());
    await axios
        .get(url_api + "report/summarystock", {
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

export const loadListLatesRoi = (data: Object) => async dispatch => {
    dispatch(loadingLatesRoi());
    await axios
        .get(url_api + "report/latespl", {
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
                    dispatch(successLatesRoi(response.data.body));
                else dispatch(failedLatesRoi(response.data.body));
            } else {
                dispatch(failedLatesRoi("try_later"));
            }
        })
        .catch(function (error) {
            console.log(error);
            if (error.Error) {
                dispatch(failedLatesRoi("try_later"));
            } else {
                dispatch(failedLatesRoi("try_later"));
            }
            return;
        });
};

export const loadListTrade = (data: Object) => async dispatch => {
    dispatch(loadingLatesTrade());
    await axios
        .get(url_api + "report/latestrade", {
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
                    dispatch(successLatesTrade(response.data.body));
                else dispatch(failedLatesTrade(response.data.body));
            } else {
                dispatch(failedLatesTrade("try_later"));
            }
        })
        .catch(function (error) {
            console.log(error);
            if (error.Error) {
                dispatch(failedLatesTrade("try_later"));
            } else {
                dispatch(failedLatesTrade("try_later"));
            }
            return;
        });
};


export const loadListStrategy = (data: Object) => async dispatch => {
    dispatch(loadingStrategy());
    await axios
        .get(url_api + "report/summarystrategy", {
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