import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
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
        <TouchableOpacity
          onPress={() => this._openMenu()}
          style={Styles.IconViewStyle}
        >
          <Icon name="menu" type="material-community" size={40} />
        </TouchableOpacity>
        <View style={Styles.TitleViewStyle}>
          <Text style={Styles.TitleStyle}>{this.state.headerTitle}</Text>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  OuterContainer: {
    height: height / 12,
    width: width,
    backgroundColor: "lightgrey",
    flexDirection: "row",
    padding: 10
  },
  IconViewStyle: {
    flex: 0.1
  },
  TitleViewStyle: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center"
  },
  TitleStyle:{
    fontSize:25
  }
});
