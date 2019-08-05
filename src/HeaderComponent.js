import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { Icon } from "react-native-elements";

export default class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerTitle: this.props.headerTitle
    };
  }
  _openMenu() {
    navVar.openDrawer();
    //this.state.scope.props.navigation.openDrawer();
  }
  render() {
    return (
      <View style={Styles.OuterContainer}>
        <Icon
          name="menu"
          type="material-community"
          size={40}
          onPress={() => this._openMenu()}
        />
        <Text>{this.state.headerTitle}</Text>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  OuterContainer: {
    height: height / 12,
    backgroundColor: "lightgrey",
    flexDirection: "row",
    padding: 10
  }
});
