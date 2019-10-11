import { call, put, takeLatest } from "redux-saga/effects";
import Api from "./Api";
import { NavigationActions, StackActions } from "react-navigation";
/**
 * action type constants
 */
export const GET_BEER_LIST = "GET_BEER_LIST";
export const SAVE_BEER_LIST = "SAVE_BEER_LIST";
export const VALIDATE_LOGIN = "VALIDATE_LOGIN";
export const LOGIN_STATUS = "LOGIN_STATUS";
export const LOGIN_RESPONSE = "LOGIN_RESPONSE";
export const SIGNUP_REGISTER = "SIGNUP_REGISTER";
export const CHECK_PROFILE_DETAILS = "CHECK_PROFILE_DETAILS";
export const SAVE_PROFILE_DETAILS = "SAVE_PROFILE_DETAILS";
export const UPDATE_PROFILE_DETAILS = "UPDATE_PROFILE_DETAILS";

/**
 * action function constants
 */

export const getBeerList = payload => ({
  type: GET_BEER_LIST,
  payload
});

export const saveBeerList = payload => ({
  type: SAVE_BEER_LIST,
  payload
});

export const validateLogin = payload => ({
  type: VALIDATE_LOGIN,
  payload
});

export const loginStatus = payload => ({
  type: LOGIN_STATUS,
  payload
});

export const loginResponse = payload => ({
  type: LOGIN_RESPONSE,
  payload
});

export const signUpRegister = payload => ({
  type: SIGNUP_REGISTER,
  payload
});

export const checkProfileDetails = payload => ({
  type: CHECK_PROFILE_DETAILS,
  payload
});

export const saveProfileDetails = payload => ({
  type: SAVE_PROFILE_DETAILS,
  payload
});

export const updateProfile = payload => ({
  type: UPDATE_PROFILE_DETAILS,
  payload
});

/**
 * this function will be forked
 */
export default function* BeerSaga() {
  yield takeLatest(UPDATE_PROFILE_DETAILS, handleUpdateProfile);
  yield takeLatest(CHECK_PROFILE_DETAILS, handleCheckProfile);
  yield takeLatest(VALIDATE_LOGIN, handleValidateLogin);
  yield takeLatest(GET_BEER_LIST, handleGetBeerList);
  yield takeLatest(SIGNUP_REGISTER, handleSignUp);
}

function* handleGetBeerList(action) {
  try {
    const respVal = yield call(Api.getListValue, action.payload);
    const resp = respVal.data;

    // console.log("response of get beer list is", resp);
    var result = resp.map(function(el) {
      var o = Object.assign({}, el);
      o.count = 0;
      return o;
    });
    // console.log("update")
    yield put(saveBeerList(result));
  } catch (error) {
    console.log("error is", error);
  }
}

function* handleValidateLogin(action) {
  try {
    const response = yield call(Api.checkLogin, action.payload);
    yield put(loginStatus(response));
    yield put(loginResponse(action.payload));
  } catch (error) {
    console.log("error is", error);
  }
}

function* handleSignUp(action) {
  try {
    const response = yield call(Api.checkSignUp, action.payload);
    // console.log("response is", response);
    if (response.success === 0) {
      console.log("unable to login");
      Alert.alert(response.message);
    } else {
      Alert.alert(response.message);
    }
  } catch (error) {
    console.log("error is", error);
  }
}

function* handleCheckProfile(action) {
  try {
    const response = yield call(Api.handleCheckProfile, action.payload);
    yield put(saveProfileDetails(response.data));
  } catch (error) {
    console.log("error is", error);
  }
}

function* handleUpdateProfile(action) {
  try {
    const response = yield call(Api.handleUpdateProfile, action.payload);
    alert(response.message);
    // console.log(response);
  } catch (error) {
    console.log("error is", error);
  }
}
