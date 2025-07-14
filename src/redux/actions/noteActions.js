import axios from "axios";
//import { I18n } from "react-redux-i18n";
import {
    NOTE_LIST_ATTEMPT,
    NOTE_LIST_SUCCESS,
    NOTE_LIST_FAILED,
    ////////////////////
    NOTE_MORELIST_ATTEMPT,
    NOTE_MORELIST_SUCCESS,
    NOTE_MORELIST_FAILED,
    ////////////////////////
    NOTE_NEW_SUCCESS,
    NOTE_NEW_FAILED,
    /////////////////
    NOTE_UPDATE_SUCCESS,
    NOTE_UPDATE_HIDE_SUCCESS,
    NOTE_SET_ITEM,
    ////////////////
    NOTE_REMOVE_SUCCESS,
    NOTE_REMOVE_FAILED,
    //////////////////////////

} from "../types/noteTypes";
import { config } from "../../config";

const url_api = config.api.web;

export function loading() {
    return {
        type: NOTE_LIST_ATTEMPT
    };
}

export function success(data) {
    return {
        type: NOTE_LIST_SUCCESS,
        data: data
    };
}

export function failed(error) {
    return {
        type: NOTE_LIST_FAILED,
        error: error
    };
}

///////////////////////////////////////////

export function loadingMore() {
    return {
        type: NOTE_MORELIST_ATTEMPT
    };
}

export function successMore(data) {
    return {
        type: NOTE_MORELIST_SUCCESS,
        data: data
    };
}

export function failedMore(error) {
    return {
        type: NOTE_MORELIST_FAILED,
        error: error
    };
}

////////////////////////
export function successNew(item) {
    return {
        type: NOTE_NEW_SUCCESS,
        item: item
    };
}

export function failedNew(error) {
    return {
        type: NOTE_NEW_FAILED,
        error: error
    };
}
/////////////////
export function successUpdate(item) {
    return {
        type: NOTE_UPDATE_SUCCESS,
        item: item
    };
}

export function successUpdateHide(item) {
    return {
        type: NOTE_UPDATE_HIDE_SUCCESS,
        item: item
    };
}
//////////////////////////
export function successRemove(item) {
    return {
        type: NOTE_REMOVE_SUCCESS,
        item: item
    };
}
export function failedRemove(error) {
    return {
        type: NOTE_REMOVE_FAILED,
        error: error
    };
}

export function set(item) {
    return {
        type: NOTE_SET_ITEM,
        item: item
    };
}

export const setItem = (data: Object) => async dispatch => {
    dispatch(set(data.item));
}
///////////////////////////////////



export const loadList = (data: Object) => async dispatch => {
    dispatch(loading());
    await axios
        .get(url_api + "note/", {
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

export const loadListScroll = (data: Object) => async dispatch => {
    dispatch(loadingMore());
    await axios
        .get(url_api + "note/", {
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

export const newItem = (data: Object) => async (dispatch) => {
    //  console.log(data.params);
    await axios({
        method: "post",
        url: url_api + "note/",
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

export const updateItem = (data: Object) => async (dispatch) => {
    await axios({
        method: "put",
        url: url_api + "note/",
        data: data.params,
        headers: { Authorization: `Bearer ${data.token}` },
    })
        .then(function (response) {
            //  console.log(response);
            if (response.status < 300) {
                if (response.data.status === 'Success')
                    dispatch(successUpdate(response.data.body));
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

export const updateItemHide = (data: Object) => async (dispatch) => {
    await axios({
        method: "put",
        url: url_api + "note/",
        data: data.params,
        headers: { Authorization: `Bearer ${data.token}` },
    })
        .then(function (response) {
            //  console.log(response);
            if (response.status < 300) {
                if (response.data.status === 'Success')
                    dispatch(successUpdateHide(response.data.body));
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
        url: url_api + "note",
        params: data.params,
        headers: { Authorization: `Bearer ${data.token}` },
    })
        .then(function (response) {
            //  console.log(response);
            if (response.status < 300) {
                if (response.data.status === 'Success')
                    dispatch(successRemove(response.data.body));
                // alertify.success("Success");
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


