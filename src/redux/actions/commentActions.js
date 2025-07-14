import axios from "axios";
//import { I18n } from "react-redux-i18n";
import {
    COMMENT_LIST_ATTEMPT,
    COMMENT_LIST_SUCCESS,
    COMMENT_LIST_FAILED,
    ////////////////////
    COMMENT_NEW_SUCCESS,
    COMMENT_NEW_FAILED,
    ////////////////////
    COMMENT_LIKE_SUCCESS,
    COMMENT_LIKE_FAILED,
    //////////////////
    COMMENT_SET_ITEM,
    ////
    COMMENT_MORELIST_ATTEMPT,
    COMMENT_MORELIST_SUCCESS,
    COMMENT_MORELIST_FAILED,
    ////////
    COMMENT_REMOVE_SUCCESS,
    COMMENT_REMOVE_FAILED,
} from "../types/commentTypes";
import { config } from "../../config";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const url_api = config.api.web;

export function loading() {
    return {
        type: COMMENT_LIST_ATTEMPT
    };
}

export function success(data) {
    return {
        type: COMMENT_LIST_SUCCESS,
        data: data
    };
}

export function failed(error) {
    return {
        type: COMMENT_LIST_FAILED,
        error: error
    };
}
///////////////////////////////////////////
export function loadingMore() {
    return {
        type: COMMENT_MORELIST_ATTEMPT
    };
}

export function successMore(data) {
    return {
        type: COMMENT_MORELIST_SUCCESS,
        data: data
    };
}

export function failedMore(error) {
    return {
        type: COMMENT_MORELIST_FAILED,
        error: error
    };
}
////////////////////
export function successNew(item) {
    return {
        type: COMMENT_NEW_SUCCESS,
        item: item
    };
}

export function failedNew(error) {
    return {
        type: COMMENT_NEW_FAILED,
        error: error
    };
}
////////////////////////
export function successLike(item) {
    return {
        type: COMMENT_LIKE_SUCCESS,
        item: item
    };
}

export function failedLike(error) {
    return {
        type: COMMENT_LIKE_FAILED,
        error: error
    };
}

////////////////////////
export function setComment(item) {
    return {
        type: COMMENT_SET_ITEM,
        item: item
    };
}
///////////////////////////////////////////


export function successRemove(item) {
    return {
        type: COMMENT_REMOVE_SUCCESS,
        item: item
    };
}

export function failedRemove(error) {
    return {
        type: COMMENT_REMOVE_FAILED,
        error: error
    };
}
export const setItem = (data: Object) => async dispatch => {
    dispatch(setComment(data.item));
}
export const loadList = (data: Object) => async dispatch => {
    dispatch(loading());
    await axios
        .get(url_api + "comment/", {
            params: data.params,//{
            // id: data.user_id,
            //token: data.token,
            //lang: I18n.t("locale")
            //},
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
    await axios({
        method: "post",
        url: url_api + "comment/",
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

export const updateLike = (data: Object) => async (dispatch) => {
    //  console.log(data.params);
    await axios({
        method: "put",
        url: url_api + "comment",// /like
        data: data.params,
        headers: { Authorization: `Bearer ${data.token}` },
    }).then(function (response) {
        //  console.log(response);
        if (response.status < 300) {
            if (response.data.status === 'Success')
                dispatch(successLike(response.data.body));
            else dispatch(failedLike(response.data.body));
        } else {
            dispatch(failedLike("try_later"));
        }
    })
        .catch(function (error) {
            //console.log(error);
            if (error.Error) {
                dispatch(failedLike("try_later"));
            } else {
                dispatch(failedLike("try_later"));
            }
            return;
        });
};



export const loadListProfile = (data: Object) => async dispatch => {
    dispatch(loading());
    await axios
        .get(url_api + "comment/profile", {
            params: data.params,//{
            //id: data.user_id,
            //token: data.token,
            //lang: I18n.t("locale")
            //},
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
        .get(url_api + "comment/", {
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

export const removeItem = (data: Object) => async (dispatch) => {
    await axios({
        method: "delete",
        url: url_api + "comment",
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

export const reportItem = (data: Object) => async (dispatch) => {
    await axios({
        method: "delete",
        url: url_api + "comment/report",
        params: data.params,
        headers: { Authorization: `Bearer ${data.token}` },
    })
        .then(function (response) {
            //  console.log(response);
            if (response.status < 300) {
                if (response.data.status === 'Success')
                    //dispatch((response.data.body));
                    alertify.success("Success");
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

export const loadItem = (data: Object) => async dispatch => {
    dispatch(loading());
    await axios
        .get(url_api + "comment/item", {
            params: data.params,
            headers: { Authorization: `Bearer ${data.token}` },
        })
        .then(function (response) {
            //console.log(response);
            if (response.status < 300) {
                if (response.data.status === 'Success')
                    dispatch(setComment(response.data.body));
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