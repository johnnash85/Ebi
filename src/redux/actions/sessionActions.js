import axios from "axios";
import {
    LOGIN_ATTEMPT,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    /////////////////////
    LOGOUT,
    ///////////////////////
    RESET_SUCCESS,
    UPDATE_FAILED,
    /////////////////////

    /////////////////////
    UPDATE_SUCCESS
} from "../types/sessionTypes";
import { config } from "../../config";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const url_api = config.api.web;

export function loading() {
    return {
        type: LOGIN_ATTEMPT
    };
}

export function success(data) {
    return {
        type: LOGIN_SUCCESS,
        data: data
    };
}

export function failed(error) {
    return {
        type: LOGIN_FAILED,
        error: error
    };
}
//////////////////////////
export function signout(error) {
    return {
        type: LOGOUT,
        //error: error
    };
}
//////////////////////////////////
export function successUpdate(success) {
    return {
        type: RESET_SUCCESS,
        success: success
    };
}

export function failedUpdate(error) {
    return {
        type: UPDATE_FAILED,
        error: error
    };
}
export const logout = (data: Object) => async (dispatch) => {
    dispatch(signout());
}

export function successItem(item) {
    return {
        type: UPDATE_SUCCESS,
        item: item
    };
}

export const login = (data: Object) => async (dispatch) => {
    //console.log(data);
    await axios({
        method: "post",
        url: url_api + "auth/login",
        /* headers: {
             "Content-Type": "application/json",
             "Access-Control-Allow-Origin": "*",
             'origin': 'x-requested-with',
             'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
             'Content-Type': 'application/json',
         },*/
        data: data,
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

export const resetItem = (data: Object) => async (dispatch) => {
    await axios({
        method: "put",
        url: url_api + "auth/reset",
        data: data.params,
        headers: { Authorization: `Bearer ${data.token}` },
    })
        .then(function (response) {
            //  console.log(response);
            if (response.status < 300) {
                if (response.data.status === 'Success')
                    dispatch(successUpdate(response.data.body));
                else dispatch(failedUpdate(response.data.body));
            } else {
                dispatch(failedUpdate("try_later"));
            }
        })
        .catch(function (error) {
            //console.log(error);
            if (error.Error) {
                dispatch(failedUpdate("try_later"));
            } else {
                dispatch(failedUpdate("try_later"));
            }
            return;
        });
};

export const updateItem = (data: Object) => async (dispatch) => {
    await axios({
        method: "put",
        url: url_api + "auth/update",
        data: data.params,
        headers: { Authorization: `Bearer ${data.token}` },
    })
        .then(function (response) {
            //  console.log(response);
            if (response.status < 300) {
                if (response.data.status === 'Success') {
                    dispatch(successItem(response.data.body));
                    alertify.success("Success");
                }
                else dispatch(failedUpdate(response.data.body));
            } else {
                dispatch(failedUpdate("try_later"));
            }
        })
        .catch(function (error) {
            //console.log(error);
            if (error.Error) {
                dispatch(failedUpdate("try_later"));
            } else {
                dispatch(failedUpdate("try_later"));
            }
            return;
        });
};

export const loadItem = (data: Object) => async dispatch => {
    dispatch(loading());
    await axios
        .get(url_api + "auth/profile", {
            params: {
                id: data.user_id,
                // token: data.token,
                //lang: I18n.t("locale")
            },
            headers: { Authorization: `Bearer ${data.token}` },
        })
        .then(function (response) {
            //        console.log(response);
            if (response.status < 300) {
                if (response.data.status === 'Success')
                    dispatch(successItem(response.data.body));
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
}

export const activate = (data: Object) => async (dispatch) => {
    // dispatch(loading());
    await axios({
        method: "post",
        url: url_api + "auth/activate",
        /* headers: {
             "Content-Type": "application/json",
             "Access-Control-Allow-Origin": "*",
             'origin': 'x-requested-with',
             'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
             'Content-Type': 'application/json',
         },*/
        data: data.params,
    })
        .then(function (response) {
            //console.log(response);
            if (response.status < 300) {
                if (response.data.status === 'Success')
                    dispatch(successUpdate(response.data.body));
                else dispatch(failedUpdate(response.data.body));
            } else {
                dispatch(failedUpdate("try_later"));
            }
        })
        .catch(function (error) {
            console.log(error);
            if (error.Error) {
                dispatch(failedUpdate("try_later"));
            } else {
                dispatch(failedUpdate("try_later"));
            }
            return;
        });
};

export const register = (data: Object) => async (dispatch) => {
    //dispatch(loading());
    await axios({
        method: "post",
        url: url_api + "auth/register",
        data: data.params,
    })
        .then(function (response) {
            //console.timeLog(response);
            if (response.status < 300) {
                if (response.data.status === 'Success')
                    dispatch(successUpdate(response.data.body));
                else dispatch(failedUpdate(response.data.body));
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

export const recovery = (data: Object) => async (dispatch) => {
    //dispatch(loading());
    await axios({
        method: "post",
        url: url_api + "email/recovery",
        /* headers: {
             "Content-Type": "application/json",
             "Access-Control-Allow-Origin": "*",
             'origin': 'x-requested-with',
             'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
             'Content-Type': 'application/json',
         },*/
        data: data,
    })
        .then(function (response) {
            //console.log(response);
            if (response.status < 300) {
                if (response.data.status === 'Success')
                    dispatch(successUpdate(response.data.body));
                else dispatch(failedUpdate(response.data.body));
            } else {
                dispatch(failedUpdate("try_later"));
            }
        })
        .catch(function (error) {
            console.log(error);
            if (error.Error) {
                dispatch(failedUpdate("try_later"));
            } else {
                dispatch(failedUpdate("try_later"));
            }
            return;
        });
};