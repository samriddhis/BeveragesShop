import React from "react";
import { View, Text, Dimensions,StyleSheet,ScrollView } from "react-native";
import { Icon } from "react-native-elements";
const { width, height } = Dimensions.get("window");

export default class OrderComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollView style={[styles.scene, { backgroundColor: "lightgray" }]}>
        <View style={styles.OuterViewContainer}>
        <Text>Empty cart.....</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1
  },
  OuterViewContainer: {
    margin: 10,
    padding:20,
    borderWidth: 1,
    borderRadius:6,
    borderColor: "silver",
    height: 500,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  }
});
