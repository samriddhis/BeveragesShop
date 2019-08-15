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
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

const initialList = {
  cartValue: []
};

const cartStore = (state = initialList, action) => {
  switch (action.type) {
    case "ADD_VALUE_IN_STORE":
      console.log("action dispachted", action);
      return {
        ...state,
        cartValue: [...state.cartValue,action.payload.item]
      };
    case "DELETE_VALUE_FROM_STORE":
      return{
        ...state,
        cartValue:state.cartValue.filter(item => item !== action.payload.item)
      }
    default:
      return state;
  }
};
const reducer = combineReducers({
  cartStore: cartStore
});

const store = createStore(reducer);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount(){
    console.log("application is going to close",store.getState())
    //here you can save your data in async storage
  }
  render() {
    return (
      <Provider store={store}>
        <RouterConfig />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});
