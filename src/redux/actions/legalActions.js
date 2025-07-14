import axios from "axios";
import { config } from "../../config";
import alertify from "alertifyjs";
import "../../components/styles/Alertify.css";
import "../../components/styles/AlertifyTheme.css";
import "../../components/styles/Alertify.min.css";
import "../../components/styles/AlertifyTheme.min.css";
import {
  LEGAL_ATTEMPT,
  LEGAL_SUCCESS,
  LEGAL_FAILED,
  ///////////////

  ///////////////////////
} from "../types/legalTypes";
const url_api = config.api.web;
export function loading() {
  return {
    type: LEGAL_ATTEMPT,
  };
}

export function success(data) {
  return {
    type: LEGAL_SUCCESS,
    data: data,
  };
}

export function failed(error) {
  return {
    type: LEGAL_FAILED,
    error: error,
  };
}

///////////////////////////////////
/*export function successRemoveUser(id) {
  return {
    type: AD_DELETE_SUCCESS,
    id: id
  };
}
///////////////////////////////////
export function failedRemoveUser(error) {
  return {
    type: AD_DELETE_FAILED,
    error: error
  };
}

///////////////////////////////////
export function successAvatarUpdate(item) {
  return {
    type: AVATAR_UPDATE_SUCCESS,
    item: item
  };
}

export function successRegister(success) {
  return {
    type: REGISTER_SUCCESS,
    success: success
  };
}

///////////////////////////////////
export function failedUpdate(error) {
  return {
    type: UPDATE_FAILED,
    error: error
  };
}
*/
export const loadInformation = (data: Object) => async (dispatch) => {
  dispatch(loading());
  await axios
    .get(url_api + "legal", {
      params: data.params,
      headers: { Authorization: `Bearer ${data.token}` },
    })
    .then(function (response) {
      console.log(response);
      if (response.status < 300) {
        if (response.data.status === "Success")
          dispatch(failed(response.data.body));
        else dispatch(success(response.data.body));
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

/*
export const removeUser = (data: Object) => async dispatch => {
  await axios
    .delete(BASE_API + "user", {
      params: {
        user_id: data.user_id,
        token: data.token,
        id: data.id
      }
    })
    .then(function(response) {
      console.log(response);
      if (response.status < 300) {
        if (response.data.status === "Error")
          dispatch(failedRemoveUser(response.data.description));
        else dispatch(successRemoveUser(response.data.Id));
      } else {
        dispatch(failedRemoveUser("try_later"));
      }
    })
    .catch(function(error) {
      console.log("Error", error.message);
      if (error.response) {
        dispatch(failedRemoveUser("try_later"));
      } else {
        dispatch(failedRemoveUser("try_later"));
      }
    });
};
*/
