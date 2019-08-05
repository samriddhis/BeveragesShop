import React from "react";
import { View, Text, StyleSheet } from "react-native";
import HeaderComponent from "./HeaderComponent"

export default class MyAccountComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.OuterContainer}>
        <HeaderComponent headerTitle={"My account page"} />
        <Text style={styles.TextStyle}>MyAccountComponent</Text>
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
