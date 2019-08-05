import React from "react";
import { View, Text, StyleSheet } from "react-native";
import HeaderComponent from "./HeaderComponent"

export default class LogoutComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.OuterContainer}>
      <HeaderComponent headerTitle={"Logout page"} />
        <Text style={styles.TextStyle}>LogoutComponent</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  OuterContainer: {
    flex:1,
  },
  TextStyle: {
    fontSize: 20
  }
});
