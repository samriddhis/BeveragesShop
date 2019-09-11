import {fork,all} from "redux-saga/effects"
import BeerSaga from "./src/BeerSaga";

export default function* mainSaga(){
    yield all([fork(BeerSaga)])
}