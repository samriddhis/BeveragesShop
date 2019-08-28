import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Switch,
  Animated,
  Alert
} from "react-native";
import { Avatar } from "react-native-elements";
import { NavigationActions, StackActions } from "react-navigation";
const { height, width } = Dimensions.get("window");

export default class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      passWord: "",
      switchValue: true
    };
  }

  checkLogin(username, password) {
    return new Promise(function(resolve, reject) {
      fetch("http://192.168.1.41:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
        .then(res => res.json().then(response => resolve(response)))
        .catch(error => {
          console.log("rejecting error", error);
          reject(error);
        });
    });
  }
  async _loginPress() {
    try {
      response = await this.checkLogin(
        this.state.userName,
        this.state.passWord
      );
      console.log("response is", response);
      if (response.success === 0) {
        console.log("unable to login");
        Alert.alert(response.message);
      } else {
       //this.props.navigation.navigate("HomeScreen")
        this.props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "DrawerNavigator" })]
          })
        );
        this.setState({
          userName: "",
          passWord: ""
        });
      }
    } catch (error) {
      console.log("unable to login", error);
    }
  }

  checkSignUp(username, password) {
    return new Promise(function(resolve, reject) {
      fetch("http://192.168.1.41:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
        .then(res => res.json().then(response => resolve(response)))
        .catch(error => {
          console.log("rejecting error", error);
          reject(error);
        });
    });
  }
  async _signupPress() {
    try {
      response = await this.checkSignUp(
        this.state.userName,
        this.state.passWord
      );
      console.log("response is", response);
      if (response.success === 0) {
        console.log("unable to login");
        Alert.alert(response.message);
      } else {
        Alert.alert(response.message);
        this.setState({
          switchValue: !this.state.switchValue,
          userName: "",
          passWord: ""
        });
      }
    } catch (error) {
      console.log("unable to login", error);
    }
  }

  _toggleSwitch() {
    this.setState({
      switchValue: !this.state.switchValue,
      userName: "",
      passWord: ""
    });
  }
  render() {
    return (
      <View style={styles.ImageOuterContainer}>
        <ImageBackground
          style={styles.imageStyle}
          source={require("../images/background.jpg")}
        >
          <View style={styles.AccViewStyle}>
            <Text style={styles.AccTextStyle}>{"My Account"}</Text>
          </View>

          <View style={styles.OuterContainer}>
            <TextInput
              style={styles.LoginStyle}
              underlineColorAndroid="#D3D3D3"
              placeholder="User name"
              onChangeText={userName => this.setState({ userName })}
              value={this.state.userName}
            />
            <TextInput
              secureTextEntry={true}
              style={styles.PasswordStyle}
              underlineColorAndroid="#D3D3D3"
              placeholder="Password"
              onChangeText={passWord => this.setState({ passWord })}
              value={this.state.passWord}
            />
            <Text style={styles.ForgotTextStyle}>{"Forgot Password?"}</Text>
            <Switch
              style={styles.SwitchStyle}
              value={this.state.switchValue}
              onValueChange={() => this._toggleSwitch()}
            />
            <Text style={styles.CurrentPageTextStyle}>
              {this.state.switchValue ? "Login" : "SignUp"}
            </Text>
            {this.state.switchValue ? (
              <TouchableOpacity
                style={styles.ButtonStyle}
                color="#0966aa"
                onPress={() => this._loginPress()}
              >
                <Text style={{ color: "#fff" }}>{"Log in"}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.ButtonStyle}
                color="#0966aa"
                onPress={() => this._signupPress()}
              >
                <Text style={{ color: "#fff" }}>{"Sign up"}</Text>
              </TouchableOpacity>
            )}

            <View style={styles.IconStyle}>
              <View style={styles.IconRoundStyle}>
                <Avatar
                  rounded
                  size="medium"
                  icon={{ name: "user", type: "entypo", size: 50 }}
                  overlayContainerStyle={{ backgroundColor: "#00cc66" }}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  AccViewStyle: {
    width: width / 2,
    height: height / 10,
    alignItems: "center"
  },
  AccTextStyle: {
    color: "#fff",
    fontSize: 25
  },
  IconStyle: {
    width: width / 5,
    height: height / 10,
    borderRadius: 40,
    backgroundColor: "#00cc66",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -40
  },
  IconRoundStyle: {
    width: width / 7,
    height: height / 14,
    borderRadius: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  imageStyle: {
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center"
  },
  OuterContainer: {
    width: width / 1.3,
    height: height / 2.3,
    backgroundColor: "white",
    borderRadius: 10,
    shadowOpacity: 2.0,
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  LoginStyle: { width: width / 1.8 },
  PasswordStyle: { marginTop: 10, width: width / 1.8 },
  ForgotTextStyle: { marginLeft: 100, marginTop: 10 },
  ButtonStyle: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    width: width / 1.5,
    height: height / 16,
    borderRadius: 3,
    backgroundColor: "#0966aa"
  },
  SwitchStyle: {
    marginLeft: 200
  },
  CurrentPageTextStyle: {
    marginLeft: 200
  }
});