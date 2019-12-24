import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./Component.style";
import { NavigationActions, DrawerActions } from "react-navigation";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";

class DrawerComponent extends Component {
  constructor(props) {
    super(props);
  }
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
  };

  _pressLogout() {
    // this.navigateToScreen("LoginScreen")
    this.props.navigation.navigate("LoginScreen");
  }
  isEmpty(val) {
    if (val == "") {
      return true;
    } else {
      return false;
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity style={styles.ProfilePicStyle}>
            <Icon type="font-awesome" name="user-circle-o" size={20} />
            <Text style={styles.ProfileTextStyle}>
              Hello,{" "}
              {this.props.profileDetails === null
                ? "Profile"
                : this.props.profileDetails.name === "undefined"
                ? "Profile"
                : this.props.profileDetails.name}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.NavHeaderStyle}
            onPress={this.navigateToScreen("HomeScreen")}
          >
            <Icon type="simple-line-icon" name="home" size={20} />
            <Text style={styles.NavHeaderTextStyle}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.NavHeaderStyle}
            onPress={this.navigateToScreen("MyAccScreen")}
          >
            <Icon
              type="material-community"
              name="account-circle-outline"
              size={23}
            />
            <Text style={styles.NavHeaderTextStyle}>My Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.NavHeaderStyle}
            onPress={this.navigateToScreen("CartScreen")}
          >
            <Icon type="evilicon" name="cart" size={25} />
            <Text style={styles.NavHeaderTextStyle}>Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.NavHeaderStyle}
            onPress={() => this._pressLogout()}
          >
            <Icon type="simple-line-icon" name="logout" size={20} />
            <Text style={styles.NavHeaderTextStyle}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

DrawerComponent.propTypes = {
  navigation: PropTypes.object
};

function mapStateToProps(state) {
  return {
    profileDetails: state.cartStore.profileDetails
  };
}

export default connect(mapStateToProps)(DrawerComponent);
