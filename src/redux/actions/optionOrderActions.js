import axios from "axios";
//import { I18n } from "react-redux-i18n";
import {
    OPTION_LIST_ATTEMPT,
    OPTION_LIST_SUCCESS,
    OPTION_LIST_FAILED,
    ////////////////////
    OPTION_NEW_SUCCESS,
    OPTION_NEW_FAILED,
    ///////////////////
    OPTION_REMOVE_SUCCESS,
    OPTION_REMOVE_FAILED,
    ///////////
    OPTION_SET_ITEM
} from "../types/optionOrderTypes";
import { config } from "../../config";
const url_api = config.api.web;

export function loading() {
    return {
        type: OPTION_LIST_ATTEMPT
    };
}

export function success(data) {
    return {
        type: OPTION_LIST_SUCCESS,
        data: data
    };
}

export function failed(error) {
    return {
        type: OPTION_LIST_FAILED,
        error: error
    };
}

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
        type: OPTION_NEW_SUCCESS,
        item: item
    };
}



export function failedNew(error) {
    return {
        type: OPTION_NEW_FAILED,
        error: error
    };
}
//////////////////////////
export function successRemove(item) {
    return {
        type: OPTION_REMOVE_SUCCESS,
        item: item
    };
}

export function failedRemove(error) {
    return {
        type: OPTION_REMOVE_FAILED,
        error: error
    };
}
////////////////////
export function set(item) {
    return {
        type: OPTION_SET_ITEM,
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
        .get(url_api + "option/", {
            params: {
                id: data.user_id,
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

export const newItem = (data: Object) => async (dispatch) => {
    //  console.log(data.params);
    await axios({
        method: "post",
        url: url_api + "option/",
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

export const newStrategy = (data: Object) => async (dispatch) => {
    //  console.log(data.params);
    await axios({
        method: "post",
        url: url_api + "option/strategy",
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
        url: url_api + "option/",
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
        url: url_api + "option/close/item",
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

export const updateStrategy = (data: Object) => async (dispatch) => {
    await axios({
        method: "put",
        url: url_api + "option/close/strategy",
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

export const rollItem = (data: Object) => async (dispatch) => {
    await axios({
        method: "put",
        url: url_api + "option/roll/item",
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

export const rollStrategy = (data: Object) => async (dispatch) => {
    await axios({
        method: "put",
        url: url_api + "option/roll/strategy",
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

export const updateReference = (data: Object) => async (dispatch) => {
    await axios({
        method: "put",
        url: url_api + "option/reference",
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