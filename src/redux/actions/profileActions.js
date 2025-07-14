import axios from "axios";
//import { I18n } from "react-redux-i18n";
import {
    FOLLOWER_UPSET_SUCCESS,
    FOLLOWER_UPSET_FAILED,
    ///////////////////
    PROFILE_ITEM_SUCCESS,
    PROFILE_ITEM_FAILED
    ///////////
} from "../types/profileTypes";
import { config } from "../../config";
const url_api = config.api.web;

export function success(item) {
    return {
        type: PROFILE_ITEM_SUCCESS,
        item: item
    };
}

export function failed(error) {
    return {
        type: PROFILE_ITEM_FAILED,
        error: error
    };
}
//////////////////////////
export function successFollow(item) {
    return {
        type: FOLLOWER_UPSET_SUCCESS,
        item: item
    };
}

export function failedFollow(error) {
    return {
        type: FOLLOWER_UPSET_FAILED,
        error: error
    };
}

export const upsetFollow = (data: Object) => async (dispatch) => {
    await axios({
        method: "put",
        url: url_api + "profile/follow",
        data: data.params,
        headers: { Authorization: `Bearer ${data.token}` },
    })
        .then(function (response) {
            //console.log(response);
            if (response.status < 300) {
                if (response.data.status === 'Success')
                    dispatch(successFollow(response.data.body));
                else dispatch(failedFollow(response.data.body));
            } else {
                dispatch(failedFollow("try_later"));
            }
        })
        .catch(function (error) {
            //console.log(error);
            if (error.Error) {
                dispatch(failedFollow("try_later"));
            } else {
                dispatch(failedFollow("try_later"));
            }
            return;
        });
};

export const loadItem = (data: Object) => async dispatch => {
    // dispatch(loading());
    await axios
        .get(url_api + "profile/", {
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