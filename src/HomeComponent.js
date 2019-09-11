import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Image
} from "react-native";
import HeaderComponent from "./HeaderComponent";
const { height, width } = Dimensions.get("window");
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
import InputSpinner from "react-native-number-spinner";
import { connect } from "react-redux";
import ShimmerComponent from "./ShimmerComponent";
import { getBeerList } from "./BeerSaga";

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      listValue: [],
      countVal: 0,
      showSpinner: false
    };
    navVar = this.props.navigation;
  }
  componentDidMount() {
    this.getStoredCartValue("CART_VALUE");
    if (this.props.beerList <= 0) {
      this.props.dispatch(getBeerList({}));
    } else {
      this.setState({ listValue: this.props.beerList, isLoading: false });
    }
  }
  getStoredCartValue = async key => {
    try {
      const storedItems = await AsyncStorage.getItem(key);
      const storedVal = JSON.parse(storedItems);
      // console.log("reading first time from storage",storedVal)
      if (storedVal) {
        this.props.dispatch({
          type: "ADD_CART_VALUE_FROM_STORAGE",
          payload: storedVal
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  _storeInCart1(item) {
    item.count = item.count + 1;
    this.setState({ showSpinner: true, countVal: item.count });
    cartVar.push(item);
    this.storeInAsyncStorage("CART_VALUE", JSON.stringify(cartVar));
    // console.log("added in cart");
  }
  _storeInCart(item) {
    this.props.dispatch({
      type: "ADD_VALUE_IN_STORE",
      payload: {
        item
      }
    });
  }

  _deleteFromCart(item) {
    this.props.dispatch({
      type: "DELETE_VALUE_FROM_STORE",
      payload: {
        item
      }
    });
  }

  shouldComponentUpdate(props, state) {
    //  console.log("props are",props)
    if (props.cartValue !== this.props.cartValue) {
      this.storeInAsyncStorage("CART_VALUE", JSON.stringify(props.cartValue));
    }

    if (props.beerList && props.beerList !== this.props.beerList) {
      this.setState({ listValue: props.beerList, isLoading: false });
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

  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.listViewStyle}>
        <View style={styles.IconViewStyle}>
          <Icon
            name={"md-beer"}
            type={"ionicon"}
            size={75}
            style={styles.IconStyle}
          />
        </View>
        <View style={styles.DetailsStyle}>
          <Text style={styles.TextStyle}>Name : {item.name}</Text>
          <Text style={styles.TextStyle}>ABV : {item.abv}</Text>
          <Text style={styles.TextStyle}>IBU : {item.ibu}</Text>
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
        <HeaderComponent headerTitle={"Home page"} />
        {this.state.isLoading ? (
          /*  <View style={styles.indicatorViewStyle}>
            <ActivityIndicator
              color="#3973ad"
              size="large"
              style={styles.indicatorStyle}
            />
          </View>*/
          <ShimmerComponent />
        ) : (
          <FlatList
            style={styles.FlatListStyle}
            data={this.state.listValue}
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
  ListOuterContainer: {},
  FlatListStyle: {},
  TextStyle: {
    fontSize: 20
  },
  separator: {
    width: width,
    height: height / 50,
    backgroundColor: "#C0C0C0"
  },
  indicatorViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  indicatorStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  listViewStyle: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF"
  },
  TextStyle: {
    fontSize: 16,
    fontWeight: "bold"
  },
  IconStyle: {},
  countStyle: {
    borderRadius: 20,
    width: 20,
    height: 20,
    borderColor: "black",
    borderWidth: 0.5,
    textAlign: "center"
  },
  IconViewStyle: {
    flex: 2,
    padding: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  DetailsStyle: {
    flex: 6.3,
    flexDirection: "column",
    paddingTop: 10,
    paddingBottom: 10
  },
  PlusIconViewStyle: {
    paddingRight: 5,
    paddingTop: 10,
    flex: 1.7,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

function mapStateToProps(state) {
  // console.log("state is",state)
  return {
    cartValue: state.cartStore.cartValue,
    beerList: state.cartStore.beerList
  };
}

export default connect(mapStateToProps)(HomeComponent);
