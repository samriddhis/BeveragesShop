import { call,put,takeLatest } from "redux-saga/effects";
import Api from "./Api"

/**
 * action type constants
 */
export  const GET_BEER_LIST = "GET_BEER_LIST"
export const SAVE_BEER_LIST = "SAVE_BEER_LIST"

/**
 * action function constants
 */

export const getBeerList = payload => ({
    type:GET_BEER_LIST,
    payload
})

export const saveBeerList = payload => ({
    type:SAVE_BEER_LIST,
    payload
})
/**
 * this function will be forked
 */
export default function* BeerSaga(){
    yield takeLatest(GET_BEER_LIST,handleGetBeerList)
}

function* handleGetBeerList(action){
    try{
        const resp = yield call(Api.getListValue,action.payload)
        console.log("response of get beer list is",resp)
        var result = resp.map(function(el) {
            var o = Object.assign({}, el);
            o.count = 0;
            return o;
          });
        yield put(saveBeerList(result))
    }catch(error){
        console.log("error is",error)
    }
}