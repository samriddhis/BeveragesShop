import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Icon, Button } from "react-native-elements";
import { connect } from "react-redux";
import { updateProfile } from "../BeerSaga";
const { width, height } = Dimensions.get("window");

class AboutComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:
        this.props.profileDetails == null ? "" : this.props.profileDetails.name,
      emailId:
        this.props.profileDetails == null
          ? ""
          : this.props.profileDetails.emailId,
      contact:
        this.props.profileDetails == null
          ? ""
          : this.props.profileDetails.contact,
      address:
        this.props.profileDetails == null
          ? ""
          : this.props.profileDetails.address,
      dob:
        this.props.profileDetails == null ? "" : this.props.profileDetails.dob,
      isLoading: false
    };
  }

  shouldComponentUpdate(props, state) {
    if (this.props.updateProfileRes !== props.updateProfileRes) {
      this.setState({
        isLoading: false
      });
      alert(props.updateProfileRes.message);
    }
    return true;
  }

  _pressUpdateProfile() {
    this.setState({
      isLoading: true
    });
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
      <ScrollView
        style={[styles.scene, { backgroundColor: "lightgray" }]}
      >
        {this.state.isLoading ? (
          <View style={styles.indicatorViewStyle}>
            <ActivityIndicator
              color="#33809a"
              size="large"
              style={styles.indicatorStyle}
            />
          </View>
        ) : (
          <View style={styles.OuterViewContainer}>
            <View style={styles.BasicInfoViewStyle}>
              <Text style={styles.BasicInfoStyle}>Basic Info</Text>
            </View>
            <View style={styles.InfoViewStyle}>
              <Icon
                name="user"
                type="simple-line-icon"
                color="gray"
                size={16}
              />
              <Text style={styles.InfoTxtStyle}>First Name:</Text>
              <TextInput
                style={styles.BasicInfoTxtStyle}
                placeholder="Name"
                onChangeText={text => this.setState({ name: text })}
              >
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
              <TextInput
                style={styles.BasicInfoTxtStyle}
                placeholder="Email"
                onChangeText={text => this.setState({ emailId: text })}
              >
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
              <TextInput
                style={styles.BasicInfoTxtStyle}
                placeholder="Dob"
                onChangeText={text => this.setState({ dob: text })}
              >
                {this.state.dob}
              </TextInput>
            </View>
            <View style={styles.InfoViewStyle}>
              <Icon name="mobile" type="font-awesome" color="gray" size={22} />
              <Text style={styles.InfoTxtStyle}>Mobile Number:</Text>
              <TextInput
                style={styles.BasicInfoTxtStyle}
                placeholder="Number"
                onChangeText={text => this.setState({ contact: text })}
              >
                {this.state.contact}
              </TextInput>
            </View>
            <View style={styles.InfoViewStyle}>
              <Icon
                name="home"
                type="simple-line-icon"
                color="gray"
                size={16}
              />
              <Text style={styles.InfoTxtStyle}>Address:</Text>
              <TextInput
                style={styles.BasicInfoTxtStyle}
                placeholder="Address"
                onChangeText={text => this.setState({ address: text })}
              >
                {this.state.address}
              </TextInput>
            </View>
            <View style={styles.SaveButtonStyle}>
              <Button
                title="SAVE"
                onPress={() => this._pressUpdateProfile()}
                buttonStyle={{ backgroundColor: "#33809a" }}
              ></Button>
            </View>
          </View>
        )}
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
    height: 400
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
  BasicInfoStyle: {
    color: "#000",
    padding: 5,
    fontSize: 16,
    fontWeight: "bold"
  },
  BasicInfoTxtStyle: {
    color: "#000",
    padding: 3,
    fontSize: 14,
    fontWeight: "bold"
  },
  InfoTxtStyle: {
    color: "gray",
    padding: 1,
    fontSize: 14
  },
  SaveButtonStyle: {
    marginTop: 80
  },
  indicatorStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

function mapStateToProps(state) {
  return {
    profileDetails: state.cartStore.profileDetails,
    loginResponse: state.cartStore.loginResponse,
    updateProfileRes: state.cartStore.updateProfileRes
  };
}

export default connect(mapStateToProps)(AboutComponent);
