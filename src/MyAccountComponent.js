import React from "react";
<<<<<<< HEAD
import { View, Text, StyleSheet } from "react-native";
import HeaderComponent from "./HeaderComponent"
=======
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import HeaderComponent from "./HeaderComponent";
import { TabView, SceneMap } from "react-native-tab-view";
import Animated from "react-native-reanimated";
const { height, width } = Dimensions.get("window");
import { Icon } from "react-native-elements";
import AboutComponent from "./profile/AboutComponent"

const WalletRoute = () => (
  <View style={[styles.scene, { backgroundColor: "red" }]} />
);

const OrderRoute = () => (
  <View style={[styles.scene, { backgroundColor: "green" }]} />
);

const OfferRoute = () => (
  <View style={[styles.scene, { backgroundColor: "blue" }]} />
);
>>>>>>> e9434a0a9692165f06b64d17eb1af383b21414f0

export default class MyAccountComponent extends React.Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD
  }
=======
    this.state = {
      index: 0,
      routes: [
        { key: "about", title: "About", tag: "user" },
        { key: "wallet", title: "Wallet", tag: "wallet" },
        { key: "order", title: "Order", tag: "basket" },
        { key: "offer", title: "Offer", tag: "present" }
      ]
    };
  }

  _handleIndexChange = index => {
    this.setState({ index });
  };

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = Animated.color(
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map(inputIndex =>
                  inputIndex === i ? 60 : 0
                )
              })
            ),
            0,
            0
          );

          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}
            >
              <Icon
                name={route.tag}
                type={"simple-line-icon"}
                size={18}
                style={styles.IconStyle}
              />
              <Animated.Text style={{ color }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

>>>>>>> e9434a0a9692165f06b64d17eb1af383b21414f0
  render() {
    return (
      <View style={styles.OuterContainer}>
        <HeaderComponent headerTitle={"My account page"} />
<<<<<<< HEAD
        <Text style={styles.TextStyle}>MyAccountComponent</Text>
=======
        <View style={styles.UpperViewContainer}>
          <View style={styles.IconRoundStyle}>
            <Image
              style={{ width: 80, height: 80 }}
              source={{
                uri:
                  "https://www.searchpng.com/wp-content/uploads/2019/02/Deafult-Profile-Pitcher.png"
              }}
            />
          </View>
          <View style={styles.TitleViewStyle}>
          <Text style={styles.TitleStyle}>user name</Text>
        </View>
        </View>
        <View style={styles.TabViewContainer}>
          <TabView
            navigationState={this.state}
            renderScene={SceneMap({
              about: AboutComponent,
              wallet: WalletRoute,
              order: OrderRoute,
              offer: OfferRoute
            })}
            renderTabBar={this._renderTabBar}
            onIndexChange={index => this._handleIndexChange(index)}
            initialLayout={{ width: Dimensions.get("window").width }}
          />
        </View>
>>>>>>> e9434a0a9692165f06b64d17eb1af383b21414f0
      </View>
    );
  }
}

<<<<<<< HEAD

const styles = StyleSheet.create({
  OuterContainer: {
    flex:1,
  },
  TextStyle: {
    fontSize: 20
=======
const styles = StyleSheet.create({
  OuterContainer: {
    flex: 1
  },
  TextStyle: {
    fontSize: 20
  },
  UpperViewContainer: {
    height: height / 5,
    backgroundColor: "#3993D5",
    justifyContent: "center",
    alignItems: "center"
  },
  TabViewContainer: {
    height: height
  },
  scene: {
    flex: 1
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 5
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: 5
  },
  IconRoundStyle: {
    width: 74,
    height: 74,
    borderRadius: 74,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  TitleViewStyle: {
    justifyContent: "center",
    alignItems: "center"
  },
  TitleStyle:{
    fontSize:20,
    color:"#fff"
>>>>>>> e9434a0a9692165f06b64d17eb1af383b21414f0
  }
});
