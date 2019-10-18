import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  SafeAreaView
} from "react-native";
import HeaderComponent from "./HeaderComponent";
const { height, width } = Dimensions.get("window");
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import ShimmerComponent from "./ShimmerComponent";
import { getBeerList, GetProfileDetails } from "./BeerSaga";

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
    user = this.props.loginResponse.user;
    this.props.dispatch(GetProfileDetails({ user }));
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
      var that = this;
      if (this.props.cartValue.length == 0) {
        updatedList = props.beerList;
      } else {
        for (var i = 0; i < this.props.cartValue.length; i++) {
          updatedList = props.beerList.map(function(item) {
            if (item.id == that.props.cartValue[i].id) {
              item.count = that.props.cartValue[i].count;
            }
            return item;
          });
        }
      }
      this.setState({ listValue: props.beerList, isLoading: false });
    }

    if (props.filterData !== this.props.filterData) {
      var that = this;
      listArray = props.beerList;
      if (props.filterData.length > 0) {
        updatedList = listArray.filter(function(itemVal) {
          presentVal = false;
          props.filterData.forEach(function(item) {
            if (itemVal.style === item.name) {
              presentVal = true;
            }
          });
          return presentVal === true;
        });
      } else {
        updatedList = listArray;
      }

      this.setState({
        listValue: updatedList
      });
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

  _pressListItems(item) {
    this.props.navigation.navigate("ListDetailScreen", {
      scope: this,
      item: item
    });
  }

  _pressFilter() {
    this.props.navigation.navigate("FilterScreen");
  }

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.listViewStyle}
        onPress={() => this._pressListItems(item)}
      >
        <View style={styles.IconViewStyle}>
          <Image
            style={{ width: 72, height: 90, borderRadius: 10 }}
            source={{ uri: item.image }}
          />
        </View>
        <View style={styles.DetailsStyle}>
          <View style={styles.TextViewStyle}>
            <Text style={styles.TitleTextStyle}>Name : </Text>
            <Text style={styles.TextStyle}>{item.name}</Text>
          </View>
          <View style={styles.TextViewStyle}>
            <Text style={styles.TitleTextStyle}>ABV : </Text>
            <Text style={styles.TextStyle}>{item.abv}</Text>
          </View>
          <View style={styles.TextViewStyle}>
            <Text style={styles.TitleTextStyle}>IBU : </Text>
            <Text style={styles.TextStyle}>{item.ibu}</Text>
          </View>
          <View style={styles.TextViewStyle}>
            <Text style={styles.TitleTextStyle}>Ounces : </Text>
            <Text style={styles.TextStyle}>{item.ounces}</Text>
          </View>
          <View style={styles.TextViewStyle}>
            <Text style={styles.TitleTextStyle}>Style : </Text>
            <Text style={styles.TextStyle}>{item.style}</Text>
          </View>
        </View>
        <View style={styles.PlusIconViewStyle}>
          <Icon
            name={"minus-circle"}
            type={"font-awesome"}
            size={22}
            style={styles.IconStyle}
            color="#33809a"
            onPress={() => this._deleteFromCart(item)}
          />
          <Text style={styles.countStyle}>{item.count}</Text>
          <Icon
            name={"plus-circle"}
            type={"font-awesome"}
            size={22}
            style={styles.IconStyle}
            color="#33809a"
            onPress={() => this._storeInCart(item)}
          />
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <SafeAreaView style={styles.OuterContainer}>
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
          <SafeAreaView>
            <FlatList
              style={styles.FlatListStyle}
              contentContainerStyle={styles.FlatListContainerStyle}
              data={this.state.listValue}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this._renderItem}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
            <TouchableOpacity
              onPress={() => this._pressFilter()}
              style={styles.filterViewStyle}
            >
              <Icon
                name={"filter"}
                type={"antdesign"}
                size={26}
                color="white"
              />
            </TouchableOpacity>
          </SafeAreaView>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  OuterContainer: {
    flex: 1
  },
  ListOuterContainer: {},
  FlatListStyle: {},
  //FlatListContainerStyle: {
  //  width: width,
  //  justifyContent: "center",
  //  alignItems: "center",
  //  backgroundColor: "#F0F0F0"
  // },
  separator: {
    width: width,
    backgroundColor: "#F0F0F0"
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
    margin: 10,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    width: width / 1.05,
    borderRadius: 20,
    elevation: 10
  },
  TextViewStyle: {
    flexDirection: "row"
  },
  TitleTextStyle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "gray"
  },
  TextStyle: {
    fontSize: 14,
    fontWeight: "100"
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
    marginLeft: 10,
    padding: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  DetailsStyle: {
    flex: 6.3,
    flexDirection: "column",
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10
  },
  PlusIconViewStyle: {
    paddingRight: 5,
    paddingTop: 10,
    flex: 1.7,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  filterViewStyle: {
    width: 60,
    height: 60,
    borderRadius: 60,
    bottom: 60,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#33809a", //"#0966aa"
    position: "absolute"
  }
});

function mapStateToProps(state) {
  // console.log("state is",state)
  return {
    cartValue: state.cartStore.cartValue,
    beerList: state.cartStore.beerList,
    loginResponse: state.cartStore.loginResponse,
    filterData: state.cartStore.filterData
  };
}

export default connect(mapStateToProps)(HomeComponent);
