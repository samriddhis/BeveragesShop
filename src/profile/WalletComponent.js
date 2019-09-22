import React from "react";
import { View, Text, Dimensions,StyleSheet,ScrollView } from "react-native";
import { Icon } from "react-native-elements";
const { width, height } = Dimensions.get("window");

export default class WalletComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollView style={[styles.scene, { backgroundColor: "lightgray" }]}>
        <View style={styles.OuterViewContainer}>
          <Icon name="wallet" type="simple-line-icon" color="gray" size={30} />
          <View style={styles.WalletSummaryViewStyle}>
            <Text style={styles.WalletSummaryTxt}>Wallet Summary</Text>
            <Text style={styles.CurrentBalanceTxt}>
              Current Balance Rs. 124
            </Text>
          </View>
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
    borderWidth: 1,
    borderColor: "silver",
    height: height/10,
    borderRadius:6,
    flexDirection:"row",
    padding:20,
    backgroundColor:"#fff"
  },
  WalletSummaryViewStyle:{
      marginLeft:10
  },
  WalletSummaryTxt:{
      fontSize:18,
      fontWeight:"bold"
  }
});
