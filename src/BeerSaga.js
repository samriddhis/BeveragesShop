import { call, put, takeLatest } from "redux-saga/effects";
import Api from "./Api";
import { NavigationActions, StackActions } from "react-navigation";
/**
 * action type constants
 */
export const GET_BEER_LIST = "GET_BEER_LIST";
export const SAVE_BEER_LIST = "SAVE_BEER_LIST";
export const VALIDATE_LOGIN = "VALIDATE_LOGIN";
export const LOGIN_RESPONSE = "LOGIN_RESPONSE";
export const SIGNUP_REGISTER = "SIGNUP_REGISTER";

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

export const loginResponse = payload => ({
  type: LOGIN_RESPONSE,
  payload
});

export const signUpRegister = payload => ({
  type: SIGNUP_REGISTER,
  payload
});

/**
 * this function will be forked
 */
export default function* BeerSaga() {
  yield takeLatest(VALIDATE_LOGIN, handleValidateLogin);
  yield takeLatest(GET_BEER_LIST, handleGetBeerList);
  yield takeLatest(SIGNUP_REGISTER, handleSignUp);
}

function* handleGetBeerList(action) {
  try {
    const resp = yield call(Api.getListValue, action.payload);
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
    yield put(loginResponse(response));
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
