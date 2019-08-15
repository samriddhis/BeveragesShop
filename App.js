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
import AsyncStorage from "@react-native-community/async-storage";

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

  componentDidMount() {
    debugger;
    this.getStoredCartValue("CART_VALUE");
  }
  getStoredCartValue = async key => {
    try {
      const storedItems = await AsyncStorage.getItem(key);
      const storedVal = JSON.parse(storedItems);
      if (storedVal) {
        cartValue = storedVal;
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentWillUnmount(){
    debugger;
     //here you can save your data in async storage
    console.log("application is going to close",store.getState().cartStore.cartValue)
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
