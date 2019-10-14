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
import ImagePicker from "react-native-image-picker";
import AboutComponent from "./profile/AboutComponent";
import WalletComponent from "./profile/WalletComponent";
import OrderComponent from "./profile/OrderComponent";
import OfferComponent from "./profile/OfferComponent";
import { connect } from "react-redux";
import Api from "./Api/index";
import { updateProfile } from "./BeerSaga";

const options = {
  title: "Select Avatar",
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

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
  componentDidMount() {
    if (this.props.profileDetails != null) {
      if (this.props.profileDetails.url) {
        this.setState({
          imageUrl: this.props.profileDetails.url
        });
      }
    }
  }

  _handleIndexChange = index => {
    this.setState({ index });
  };

  async uploadImage(response) {
    try {
      const resp = await Api.uploadImage({
        image: response
      });
      updateObj = {
        username: this.props.loginResponse.user,
        url: resp.secure_url
      };
      this.props.dispatch(updateProfile({ updateObj }));
      this.setState({ imageUrl: resp.secure_url });
      console.log("response of file upload is", resp);
    } catch (error) {
      console.log("error is", error);
    }
  }

  async _pressPictureUpload() {
    await ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };
        this.uploadImage(response);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
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
    console.log("state is", this.state);
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
              about: () => <AboutComponent imageUrl={this.state.imageUrl} />,
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
    profileDetails: state.cartStore.profileDetails,
    loginResponse: state.cartStore.loginResponse
  };
}

export default connect(mapStateToProps)(MyAccountComponent);
