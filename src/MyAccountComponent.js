import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import HeaderComponent from "./HeaderComponent";
import { TabView, SceneMap } from "react-native-tab-view";
import Animated from "react-native-reanimated";
const { height, width } = Dimensions.get("window");
import { Icon } from "react-native-elements";
import ImagePicker from "react-native-image-crop-picker";
import AboutComponent from "./profile/AboutComponent";
import WalletComponent from "./profile/WalletComponent";
import OrderComponent from "./profile/OrderComponent";
import OfferComponent from "./profile/OfferComponent";
import { connect } from "react-redux";

class MyAccountComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "about", title: "About", tag: "user" },
        { key: "wallet", title: "Wallet", tag: "wallet" },
        { key: "order", title: "Order", tag: "basket" },
        { key: "offer", title: "Offer", tag: "present" }
      ],
      imageUrl: "http://getdrawings.com/free-icon/blank-avatar-icon-75.png"
    };
  }

  _handleIndexChange = index => {
    this.setState({ index });
  };
  _pressPictureUpload() {
    ImagePicker.openPicker({
      width: 72,
      height: 72,
      cropping: true
    }).then(image => {
      this.setState({ imageUrl: image.path });
      console.log(image);
    });
  }

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

  render() {
    return (
      <View style={styles.OuterContainer}>
        <HeaderComponent headerTitle={"My account page"} />
        <View style={styles.UpperViewContainer}>
          <View style={styles.IconRoundStyle}>
            <Image
              style={{ width: 72, height: 72, borderRadius: 72 }}
              source={{
                uri: this.state.imageUrl
              }}
            />
          </View>
          <TouchableOpacity style={styles.PencilOuterStyle}>
            <View style={styles.PencilInnerStyle}>
              <Icon
                name={"pencil"}
                type={"evilicon"}
                size={18}
                style={styles.PencilIconStyle}
                onPress={() => this._pressPictureUpload()}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.TitleViewStyle}>
            <Text style={styles.TitleStyle}>user name</Text>
          </View>
        </View>
        <ScrollView style={styles.TabViewContainer}>
          <TabView
            navigationState={this.state}
            renderScene={SceneMap({
              about: AboutComponent,
              wallet: WalletComponent,
              order: OrderComponent,
              offer: OfferComponent
            })}
            renderTabBar={this._renderTabBar}
            onIndexChange={index => this._handleIndexChange(index)}
            initialLayout={{ width: Dimensions.get("window").width }}
          />
        </ScrollView>
      </View>
    );
  }
}

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
  TitleStyle: {
    fontSize: 20,
    color: "#fff"
  },
  PencilOuterStyle: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: height / 50
  },
  PencilInnerStyle: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: "#3993D5"
  },
  PencilIconStyle: {}
});

function mapStateToProps(state) {
  return {
    profileDetails: state.cartStore.profileDetails
  };
}

export default connect(mapStateToProps)(MyAccountComponent);
