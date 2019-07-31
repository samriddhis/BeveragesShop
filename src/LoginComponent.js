import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.OuterContainer}>
        <Text style={styles.TextStyle}>LoginComponent</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  OuterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  TextStyle: {
    fontSize: 20
  }
});
