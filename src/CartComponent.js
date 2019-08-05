import React from "react";
import { View, Text, StyleSheet } from "react-native";
import HeaderComponent from "./HeaderComponent"

export default class CartComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.OuterContainer}>
        <HeaderComponent headerTitle={"Cart page"} />
        <Text style={styles.TextStyle}>CartComponent</Text>
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
