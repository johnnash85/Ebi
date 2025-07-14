import axios from "axios";
//import { I18n } from "react-redux-i18n";
import {
    WATCHSTOCK_LIST_ATTEMPT,
    WATCHSTOCK_LIST_SUCCESS,
    WATCHSTOCK_LIST_FAILED,
    ////////////////////
    WATCHSTOCK_NEW_SUCCESS,
    WATCHSTOCK_NEW_FAILED,
    ///////////////////
    WATCHSTOCK_REMOVE_SUCCESS,
    WATCHSTOCK_REMOVE_FAILED,
    ///////////
    WATCHSTOCK_SET_ITEM
} from "../types/watchStockTypes";
import { config } from "../../config";
const url_api = config.api.web;

export function loading() {
    return {
        type: WATCHSTOCK_LIST_ATTEMPT
    };
}

export function success(data) {
    return {
        type: WATCHSTOCK_LIST_SUCCESS,
        data: data
    };
}

export function failed(error) {
    return {
        type: WATCHSTOCK_LIST_FAILED,
        error: error
    };
}

///////////////////////////////////////////

export function successNew(item) {
    return {
        type: WATCHSTOCK_NEW_SUCCESS,
        item: item
    };
}

export function failedNew(error) {
    return {
        type: WATCHSTOCK_NEW_FAILED,
        error: error
    };
}
//////////////////////////
export function successRemove(item) {
    return {
        type: WATCHSTOCK_REMOVE_SUCCESS,
        item: item
    };
}

export function failedRemove(error) {
    return {
        type: WATCHSTOCK_REMOVE_FAILED,
        error: error
    };
}
////////////////////
export function set(item) {
    return {
        type: WATCHSTOCK_SET_ITEM,
        item: item
    };
}

////////////////////////
export const setItem = (data: Object) => async dispatch => {
    dispatch(set(data.item));
}

export const loadList = (data: Object) => async dispatch => {
    dispatch(loading());
    await axios
        .get(url_api + "watchstock/", {
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

export const newItem = (data: Object) => async (dispatch) => {
    //  console.log(data.params);
    await axios({
        method: "post",
        url: url_api + "watchstock/",
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

export const removeItem = (data: Object) => async (dispatch) => {
    await axios({
        method: "delete",
        url: url_api + "watchstock/",
        params: data.params,
        headers: { Authorization: `Bearer ${data.token}` },
    })
        .then(function (response) {
            //  console.log(response);
            if (response.status < 300) {
                if (response.data.status === 'Success')
                    dispatch(successRemove(response.data.body));
                else dispatch(failedRemove(response.data.body));
            } else {
                dispatch(failedRemove("try_later"));
            }
        })
        .catch(function (error) {
            //console.log(error);
            if (error.Error) {
                dispatch(failedRemove("try_later"));
            } else {
                dispatch(failedRemove("try_later"));
            }
            return;
        });
};

export const updateItem = (data: Object) => async (dispatch) => {
    await axios({
        method: "put",
        url: url_api + "watchstock/",
        data: data.params,
        headers: { Authorization: `Bearer ${data.token}` },
    })
        .then(function (response) {
            //  console.log(response);
            if (response.status < 300) {
                if (response.data.status === 'Success')
                    dispatch(successRemove(response.data.body));
                else dispatch(failedRemove(response.data.body));
            } else {
                dispatch(failedRemove("try_later"));
            }
        })
        .catch(function (error) {
            //console.log(error);
            if (error.Error) {
                dispatch(failedRemove("try_later"));
            } else {
                dispatch(failedRemove("try_later"));
            }
            return;
        });
};