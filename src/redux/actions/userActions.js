import axios from "axios";
//import { I18n } from "react-redux-i18n";
import {

    ////////////////////
    USER_NEW_SUCCESS,
    USER_NEW_FAILED,
    ///////////////////
    USER_REMOVE_SUCCESS,
    USER_REMOVE_FAILED,
    ///////////
    USER_SET_ITEM
} from "../types/userTypes";
import { config } from "../../config";
const url_api = config.api.web;



///////////////////////////////////////////
/*
export function loadingMore() {
    return {
        type: AD_MORELIST_ATTEMPT
    };
}

export function successMore(data) {
    return {
        type: AD_MORELIST_SUCCESS,
        data: data
    };
}

export function failedMore(error) {
    return {
        type: AD_MORELIST_FAILED,
        error: error
    };
}
*/
export function successNew(item) {
    return {
        type: USER_NEW_SUCCESS
    };
}



export function failedNew(error) {
    return {
        type: USER_NEW_FAILED,
        error: error
    };
}
//////////////////////////
export function successRemove(item) {
    return {
        type: USER_REMOVE_SUCCESS,
        item
    };
}

export function failedRemove(error) {
    return {
        type: USER_REMOVE_FAILED,
        error: error
    };
}
////////////////////
export function set(item) {
    return {
        type: USER_SET_ITEM,
        item: item
    };
}

////////////////////////
export const setItem = (data: Object) => async dispatch => {
    dispatch(set(data.item));
}

export const newItem = (data: Object) => async (dispatch) => {
    //  console.log(data.params);
    await axios({
        method: "post",
        url: url_api + "user/",
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

export const deleteItem = (data: Object) => async (dispatch) => {
    await axios({
        method: "delete",
        url: url_api + "user/",
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
        url: url_api + "user/",
        data: data.params,
        headers: { Authorization: `Bearer ${data.token}` },
    })
        .then(function (response) {
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