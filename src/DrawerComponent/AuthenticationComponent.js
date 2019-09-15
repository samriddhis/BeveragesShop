import React from "react";
import { Text, View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";

export default class AuthenticationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authLoader: true,
      navLoader: true
    };
  }
  componentDidMount() {
    this.getFromAsyncStorage("VALID_USER");
  }

  getFromAsyncStorage = async key => {
    try {
      const validUser = await AsyncStorage.getItem(key);
      const validVal = JSON.parse(validUser);
      if (validVal == null) {
        this.props.navigation.navigate("LoginScreen");
        this.setState({ authLoader: false });
      } else if (validVal.userName != null && validVal.passWord) {
        this.setState({ authLoader: false });
        this.props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: "DrawerNavigator"
              })
            ]
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.ContainerStyle}>
        {this.state.authLoader ? (
          <ActivityIndicator
            size="large"
            color="#000"
            style={styles.IndicatorStyle}
          />
        ) : (
          <View></View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  IndicatorStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
