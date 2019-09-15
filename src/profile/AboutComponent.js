import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
const { width, height } = Dimensions.get("window");

export default class AboutComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollView style={[styles.scene, { backgroundColor: "lightgray" }]}>
        <View style={styles.OuterViewContainer}>
          <View style={styles.BasicInfoViewStyle}>
            <Text style={styles.BasicInfoTxtStyle}>Basic Info</Text>
          </View>
          <View style={styles.InfoViewStyle}>
            <Icon name="user" type="simple-line-icon" color="gray" size={16} />
            <Text style={styles.InfoTxtStyle}>First Name:</Text>
            <Text style={styles.BasicInfoTxtStyle}>Samriddhi</Text>
          </View>
          <View style={styles.InfoViewStyle}>
            <Icon name="user" type="simple-line-icon" color="gray" size={16} />
            <Text style={styles.InfoTxtStyle}>Last name:</Text>
            <Text style={styles.BasicInfoTxtStyle}>Shukla</Text>
          </View>
          <View style={styles.InfoViewStyle}>
            <Icon
              name="email-outline"
              type="material-community"
              color="gray"
              size={18}
            />
            <Text style={styles.InfoTxtStyle}>Email:</Text>
            <Text style={styles.BasicInfoTxtStyle}>samrishukla@gmail.com</Text>
          </View>
          <View style={styles.InfoViewStyle}>
            <Icon
              name="calendar"
              type="simple-line-icon"
              color="gray"
              size={16}
            />
            <Text style={styles.InfoTxtStyle}>DOB:</Text>
            <Text style={styles.BasicInfoTxtStyle}>17/02/1995</Text>
          </View>
          <View style={styles.InfoViewStyle}>
            <Icon name="mobile" type="font-awesome" color="gray" size={22} />
            <Text style={styles.InfoTxtStyle}>Mobile Number:</Text>
            <Text style={styles.BasicInfoTxtStyle}>9839311331</Text>
          </View>
          <View style={styles.InfoViewStyle}>
            <Icon name="home" type="simple-line-icon" color="gray" size={16} />
            <Text style={styles.InfoTxtStyle}>Address:</Text>
            <Text style={styles.BasicInfoTxtStyle}>Radiance Ivy Chennai</Text>
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
    height: 255
  },
  BasicInfoViewStyle: {
    borderBottomColor: "silver",
    borderBottomWidth: 1
  },
  InfoViewStyle: {
    padding: 2,
    paddingLeft: 5,
    borderBottomColor: "silver",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  BasicInfoTxtStyle: {
    color: "#000",
    padding: 5,
    fontSize: 16,
    fontWeight:"bold"
  },
  InfoTxtStyle: {
    color: "gray",
    padding: 3,
    fontSize: 16
  }
});
