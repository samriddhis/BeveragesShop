/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import RouterConfig from "./RouterConfig";
import { createStore, combineReducers,applyMiddleware } from "redux";
import { Provider } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import createSagaMiddleware from 'redux-saga'
import mainSaga from "./mainSaga";
import { cartStore } from "./Reducer";


const sagaMiddleware = createSagaMiddleware()


const reducer = combineReducers({
  cartStore: cartStore
});

const store = createStore(reducer,applyMiddleware(sagaMiddleware));


sagaMiddleware.run(mainSaga)

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount(){
     //here you can save your data in async storage
    //console.log("application is going to close",store.getState().cartStore.cartValue)
    this.storeInAsyncStorage("CART_VALUE",JSON.stringify(store.getState().cartStore.cartValue) );
  }

  storeInAsyncStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
      // Error saving data
    }
  };

  render() {
    return (
      <Provider store={store}>
        <RouterConfig />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});
