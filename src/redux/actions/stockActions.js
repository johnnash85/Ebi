import axios from "axios";
//import { I18n } from "react-redux-i18n";
import {
    STOCK_LIST_ATTEMPT,
    STOCK_LIST_SUCCESS,
    STOCK_LIST_FAILED,
    STOCK_LIST_RESET,
    ////////////////////
    STOCK_ITEM_ATTEMPT,
    STOCK_ITEM_SUCCESS,
    STOCK_ITEM_FAILED,
    ////////////////////
    STOCK_NEW_SUCCESS,
    STOCK_NEW_FAILED,
    ///////////////////
    STOCK_REMOVE_SUCCESS,
    STOCK_REMOVE_FAILED,
    ///////////
    STOCK_SET_ITEM
} from "../types/stockTypes";
import { config } from "../../config";
const url_api = config.api.web;

export function loading() {
    return {
        type: STOCK_LIST_ATTEMPT
    };
}

export function success(data) {
    return {
        type: STOCK_LIST_SUCCESS,
        data: data
    };
}

export function failed(error) {
    return {
        type: STOCK_LIST_FAILED,
        error: error
    };
}

///////////////////////////////////////////

export function loadingItem() {
    return {
        type: STOCK_ITEM_ATTEMPT
    };
}

export function successItem(item) {
    return {
        type: STOCK_ITEM_SUCCESS,
        item: item
    };
}

export function failedItem(error) {
    return {
        type: STOCK_ITEM_FAILED,
        error: error
    };
}

export function successNew(item) {
    return {
        type: STOCK_NEW_SUCCESS,
        item: item
    };
}



export function failedNew(error) {
    return {
        type: STOCK_NEW_FAILED,
        error: error
    };
}
//////////////////////////
export function successRemove(item) {
    return {
        type: STOCK_REMOVE_SUCCESS,
        item: item
    };
}

export function failedRemove(error) {
    return {
        type: STOCK_REMOVE_FAILED,
        error: error
    };
}
////////////////////
export function set(item) {
    return {
        type: STOCK_SET_ITEM,
        item: item
    };
}
export function clear() {
    return {
        type: STOCK_LIST_RESET,
    };
}

////////////////////////
export const setItem = (data: Object) => async dispatch => {
    dispatch(set(data.item));
}

export const resetList = (data: Object) => async dispatch => {
    dispatch(clear());
}

export const loadList = (data: Object) => async dispatch => {
    dispatch(loading());
    await axios
        .get(url_api + "stock/", {
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

export const loadItem = (data: Object) => async dispatch => {
    dispatch(loadingItem());
    await axios
        .get(url_api + "stock/ticker", {
            params: data.params,/*{
                id: data.user_id,
                //token: data.token,
                //lang: I18n.t("locale")
            },*/
            headers: { Authorization: `Bearer ${data.token}` },
        })
        .then(function (response) {
            //console.log(response);
            if (response.status < 300) {
                if (response.data.status === 'Success')
                    dispatch(successItem(response.data.body));
                else dispatch(failedItem(response.data.body));
            } else {
                dispatch(failedItem("try_later"));
            }
        })
        .catch(function (error) {
            console.log(error);
            if (error.Error) {
                dispatch(failedItem("try_later"));
            } else {
                dispatch(failedItem("try_later"));
            }
            return;
        });
};

export const newItem = (data: Object) => async (dispatch) => {
    //  console.log(data.params);
    await axios({
        method: "post",
        url: url_api + "stock/",
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




export const searchList = (data: Object) => async dispatch => {
    dispatch(loading());
    await axios
        .get(url_api + "stock/search", {
            params: data.params,/*{
                id: data.user_id,
                //token: data.token,
                //lang: I18n.t("locale")
            },*/
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