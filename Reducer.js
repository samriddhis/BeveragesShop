import { SAVE_BEER_LIST } from "./src/BeerSaga";
import { LOGIN_RESPONSE } from "./src/BeerSaga";

const initialList = {
  cartValue: [],
  beerList: [],
  loginResponse: {}
};

export const cartStore = (state = initialList, action) => {
  console.log("action dispachted", action);
  switch (action.type) {
    case "ADD_VALUE_IN_STORE":
      let temp = action.payload.item;
      let index = state.cartValue.findIndex(item => item.id === temp.id);
      let finalValue = state.cartValue.slice();
      if (index >= 0) {
        finalValue[index].count = finalValue[index].count + 1;
      } else {
        temp.count = 1;
        finalValue.push(temp);
      }
      return {
        ...state,
        cartValue: finalValue
      };
    case "DELETE_VALUE_FROM_STORE":
      let removeValue = action.payload.item;
      let indexOfRemove = state.cartValue.findIndex(
        item => item.id === removeValue.id
      );
      let updateValue = state.cartValue.slice();
      if (updateValue[indexOfRemove].count > 0) {
        updateValue[indexOfRemove].count = updateValue[indexOfRemove].count - 1;
      } else {
        updateValue = updateValue.filter(
          item => item.id !== action.payload.item.id
        );
      }
      return {
        ...state,
        cartValue: updateValue
      };
    case "ADD_CART_VALUE_FROM_STORAGE":
      return {
        ...state,
        cartValue: action.payload
      };
    case SAVE_BEER_LIST:
      return {
        ...state,
        beerList: action.payload
      };
    case LOGIN_RESPONSE:
      return {
        ...state,
        loginResponse: action.payload
      };
    default:
      return state;
  }
};
