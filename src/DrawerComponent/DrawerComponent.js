import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./Component.style";
import { NavigationActions } from "react-navigation";
import { ScrollView, Text, View } from "react-native";

class DrawerComponent extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.sectionHeadingStyle}>Section 1</Text>
            <View style={styles.navSectionStyle}>
              <Text
                style={styles.navItemStyle}
                onPress={this.navigateToScreen("HomeScreen")}
              >
                Home
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>Section 2</Text>
            <View style={styles.navSectionStyle}>
              <Text
                style={styles.navItemStyle}
                onPress={this.navigateToScreen("LoginScreen")}
              >
                Login
              </Text>
              <Text
                style={styles.navItemStyle}
                onPress={this.navigateToScreen("MyAccountComponent")}
              >
                My Account
              </Text>
              <Text
                style={styles.navItemStyle}
                onPress={this.navigateToScreen("CartComponent")}
              >
                Cart
              </Text>
              <Text
                style={styles.navItemStyle}
                onPress={this.navigateToScreen("LogoutComponent")}
              >
                Logout
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text>This is my fixed footer</Text>
        </View>
      </View>
    );
  }
}

DrawerComponent.propTypes = {
  navigation: PropTypes.object
};

export default DrawerComponent;
