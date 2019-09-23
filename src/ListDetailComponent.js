import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import {Icon} from "react-native-elements"
const { width, height } = Dimensions.get("window");

export default class ListDetailComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  _backButtonPress() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.filterContainerStyle}>
        <View style={[styles.headerStyle]}>
          <Icon
            color="#fff"
            style={styles.filterStyle}
            name="arrowleft"
            type="antdesign"
            onPress={() => this._backButtonPress()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  filterContainerStyle: {
    flex: 1,
    backgroundColor: "#F6F6F6"
  },
  headerStyle: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    width: width,
    backgroundColor: "#3973ad"
  },
  headerTextStyle: {
    marginLeft: 10,
    fontSize: 25,
    color: "#fff"
  }
});
