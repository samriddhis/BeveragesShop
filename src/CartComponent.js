import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  FlatList
} from "react-native";
import HeaderComponent from "./HeaderComponent";
import AsyncStorage from "@react-native-community/async-storage";
import { Icon } from "react-native-elements";
const { width, height } = Dimensions.get("window");
import { connect } from "react-redux";

class CartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      cartValueArr: this.props.cartValue
    };

    //  cartValue:cartValue
  }
  componentDidMount() {
    this.retrieveFromAsyncStorage("CART_VALUE");
  }

  retrieveFromAsyncStorage = async key => {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      const cartVal = JSON.parse(retrievedItem);
      this.setState({ cartValueArr: cartVal, isLoading: false });
    } catch (error) {
      // Error while retrieving data
    }
  };

  /*_getUniqueValue() {
    console.log("hello");
    let mymap = new Map();
    var that = this;
    unique = this.state.cartValueArr.filter(el => {
      const val = mymap.get(el.id);
      if (val) {
        return false;
      }
      else{
        mymap.set(el.name, el.id);
        return true;
      } 
    });
    this.setState({cartValueArr:unique})
    console.log(unique)
  }*/

  _updateCartValue = updatedVal => {
    this.setState({ cartValueArr: updatedVal, isLoading: false });
  };
  shouldComponentUpdate(props, state) {
    if (props.cartValue !== this.props.cartValue) {
      this._updateCartValue(props.cartValue);
      this.storeInAsyncStorage("CART_VALUE", JSON.stringify(props.cartValue));
    }
    return true;
  }
  storeInAsyncStorage = async (key, value) => {
    try {
      // console.log(`adding ${key} in cart aS`,value)
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
      // Error saving data
    }
  };

  _deleteFromCart(item) {
    this.props.dispatch({
      type: "DELETE_VALUE_FROM_STORE",
      payload: {
        item
      }
    });
    // this.setState({ isLoading: true });
  }

  _storeInCart(item) {
    this.props.dispatch({
      type: "ADD_VALUE_IN_STORE",
      payload: {
        item
      }
    });
  }
  deleteFromCart1(item) {
    var updatedVal = cartVar.filter(function(element) {
      return element.id != item.id;
    });
    this._updateInAsync(updatedVal);
    // cartVar = updatedVal;
    this.setState({ cartValue: updatedVal });
  }
  _updateInAsync(item) {
    cartVar = item;
    this._updateInAsyncStorage("CART_VALUE", JSON.stringify(cartVar));
    //console.log("upadted in async");
  }
  _updateInAsyncStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
      // Error saving data
    }
  };

  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.listViewStyle}>
        <View style={styles.IconViewStyle}>
          <Icon
            name={"md-beer"}
            type={"ionicon"}
            size={60}
            style={styles.IconStyle}
          />
        </View>
        <View style={styles.DetailsStyle}>
          <Text style={styles.TextStyle}>Name : {item.name}</Text>
          <Text style={styles.TextStyle}>Weight : {item.ounces}</Text>
          <Text style={styles.TextStyle}>Style : {item.style}</Text>
        </View>
        <View style={styles.PlusIconViewStyle}>
          <Icon
            name={"minus-circle"}
            type={"font-awesome"}
            size={20}
            style={styles.IconStyle}
            onPress={() => this._deleteFromCart(item)}
          />
          <Text style={styles.countStyle}>{item.count}</Text>
          <Icon
            name={"plus-circle"}
            type={"font-awesome"}
            size={20}
            style={styles.IconStyle}
            onPress={() => this._storeInCart(item)}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.OuterContainer}>
        <HeaderComponent headerTitle={"Cart"} />
        {this.state.isLoading ? (
          <View style={styles.indicatorViewStyle}>
            <ActivityIndicator
              color="#3973ad"
              size="large"
              style={styles.indicatorStyle}
            />
          </View>
        ) : (
          <FlatList
            style={styles.FlatListStyle}
            data={this.state.cartValueArr}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this._renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  OuterContainer: {
    flex: 1
  },
  indicatorStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  indicatorViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  ListOuterContainer: {},
  FlatListStyle: {},
  separator: {
    width: width,
    height: height / 50,
    backgroundColor: "#C0C0C0"
  },
  listViewStyle: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF"
  },
  DetailsStyle: {
    flex: 6.3,
    flexDirection: "column",
    paddingTop: 10,
    paddingBottom: 10
  },
  TextStyle: {
    fontSize: 16,
    fontWeight: "bold"
  },
  IconStyle: {},
  IconViewStyle: {
    flex: 2,
    padding: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  PlusIconViewStyle: {
    paddingRight:5,
    paddingTop: 10,
    flex: 1.7,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  countStyle: {
    borderRadius: 20,
    width: 20,
    height: 20,
    borderColor: "black",
    borderWidth: 0.5,
    textAlign: "center"
  }
});

function mapStateToProps(state) {
  return {
    cartValue: state.cartStore.cartValue
  };
}

export default connect(mapStateToProps)(CartComponent);
