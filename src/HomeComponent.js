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

export default class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      listValue: []
    };
    navVar = this.props.navigation;
  }
  componentDidMount() {
    this.getListMetaData();
    this.getStoredCartValue("CART_VALUE");
  }
  getStoredCartValue = async key => {
    try {
      const storedItems = await AsyncStorage.getItem(key);
      const storedVal = JSON.parse(storedItems);
      if (storedVal) {
        cartVar = storedVal;
      }
    } catch (error) {
      console.log(error);
    }
  };
  getListMetaData() {
    fetch("http://starlord.hackerearth.com/beercraft")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          listValue: responseJson
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  _storeInCart(item) {
    cartVar.push(item);
    this.storeInAsyncStorage("CART_VALUE", JSON.stringify(cartVar));
    console.log("added in cart");
  }
  storeInAsyncStorage = async (key, value) => {
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
            size={80}
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
            name={"plus-circle"}
            type={"font-awesome"}
            size={25}
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
    backgroundColor: "#FFFFFF",
    padding: width / 20
  },
  DetailsStyle: {
    width: width / 1.5,
    flexDirection: "column",
    padding: 10
  },
  TextStyle: {
    fontSize: 16,
    fontWeight: "bold"
  },
  IconStyle: {},
  IconViewStyle: {
    marginTop: 20,
    marginLeft: 3
  }
});
