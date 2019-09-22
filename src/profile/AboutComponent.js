import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Icon, Button } from "react-native-elements";
import { connect } from "react-redux";
import { updateProfile } from "../BeerSaga";
const { width, height } = Dimensions.get("window");

class AboutComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.profileDetails.name,
      emailId: this.props.profileDetails.emailId,
      contact: this.props.profileDetails.contact,
      address: this.props.profileDetails.address,
      dob: this.props.profileDetails.dob
    };
  }
  _pressUpdateProfile() {
    updateObj = {
      username: this.props.loginResponse.user,
      name: this.state.name,
      emailId: this.state.emailId,
      contact: this.state.contact,
      address: this.state.address,
      dob: this.state.dob
    };
    this.props.dispatch(updateProfile({ updateObj }));
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
            <TextInput style={styles.BasicInfoTxtStyle} placeholder="Name">
              {this.state.name}
            </TextInput>
          </View>
          <View style={styles.InfoViewStyle}>
            <Icon name="user" type="simple-line-icon" color="gray" size={16} />
            <Text style={styles.InfoTxtStyle}>Last name:</Text>
            <TextInput style={styles.BasicInfoTxtStyle} placeholder="Name">
              {this.state.name}
            </TextInput>
          </View>
          <View style={styles.InfoViewStyle}>
            <Icon
              name="email-outline"
              type="material-community"
              color="gray"
              size={18}
            />
            <Text style={styles.InfoTxtStyle}>Email:</Text>
            <TextInput style={styles.BasicInfoTxtStyle} placeholder="Email">
              {this.state.emailId}
            </TextInput>
          </View>
          <View style={styles.InfoViewStyle}>
            <Icon
              name="calendar"
              type="simple-line-icon"
              color="gray"
              size={16}
            />
            <Text style={styles.InfoTxtStyle}>DOB:</Text>
            <TextInput style={styles.BasicInfoTxtStyle} placeholder="Dob">
              {this.state.dob}
            </TextInput>
          </View>
          <View style={styles.InfoViewStyle}>
            <Icon name="mobile" type="font-awesome" color="gray" size={22} />
            <Text style={styles.InfoTxtStyle} placeholder="Number">
              Mobile Number:
            </Text>
            <TextInput style={styles.BasicInfoTxtStyle}>
              {this.state.contact}
            </TextInput>
          </View>
          <View style={styles.InfoViewStyle}>
            <Icon name="home" type="simple-line-icon" color="gray" size={16} />
            <Text style={styles.InfoTxtStyle} placeholder="Address">
              Address:
            </Text>
            <TextInput style={styles.BasicInfoTxtStyle}>
              {this.state.address}
            </TextInput>
          </View>
          <View style={styles.SaveButtonStyle}>
            <Button
              title="SAVE"
              onPress={() => this._pressUpdateProfile()}
            ></Button>
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
    height: 500
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
    fontWeight: "bold"
  },
  InfoTxtStyle: {
    color: "gray",
    padding: 3,
    fontSize: 16
  },
  SaveButtonStyle: {
    marginTop: 150
  }
});

function mapStateToProps(state) {
  return {
    profileDetails: state.cartStore.profileDetails,
    loginResponse: state.cartStore.loginResponse
  };
}

export default connect(mapStateToProps)(AboutComponent);
