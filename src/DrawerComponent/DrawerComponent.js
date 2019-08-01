import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./Component.style";
import { NavigationActions ,DrawerActions} from "react-navigation";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

class DrawerComponent extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity style={styles.ProfilePicStyle}>
          <Icon type="font-awesome" name="user-circle-o" size={20}/>
            <Text style={styles.ProfileTextStyle}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity  style={styles.NavHeaderStyle} onPress={this.navigateToScreen("HomeScreen")}>
          <Icon type="simple-line-icon" name="home" size={20}/>
            <Text style={styles.NavHeaderTextStyle}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.NavHeaderStyle} onPress={this.navigateToScreen("LoginScreen")}>
          <Icon type="simple-line-icon" name="login" size={20} reverseColor="red"/>
            <Text style={styles.NavHeaderTextStyle}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.NavHeaderStyle} onPress={this.navigateToScreen("MyAccScreen")}>
          <Icon type="material-community" name="account-circle-outline" size={23}/>
            <Text style={styles.NavHeaderTextStyle}>My Account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.NavHeaderStyle} onPress={this.navigateToScreen("CartScreen")}>
          <Icon type="evilicon" name="cart" size={25}/>
            <Text style={styles.NavHeaderTextStyle}>Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.NavHeaderStyle} onPress={this.navigateToScreen("LogoutScreen")}>
          <Icon type="simple-line-icon" name="logout" size={20}/>
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

export default DrawerComponent;
