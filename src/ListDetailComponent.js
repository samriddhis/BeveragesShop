import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
const { width, height } = Dimensions.get("window");

class ListDetailComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemDetails: this.props.navigation.getParam("item"),
      showAll: false
    };
  }

  showMore = () => this.setState({ showAll: true });
  showLess = () => this.setState({ showAll: false });

  _backButtonPress() {
    this.props.navigation.goBack();
  }

  _storeInCart(item) {
    this.props.dispatch({
      type: "ADD_VALUE_IN_STORE",
      payload: {
        item
      }
    });
  }
  _deleteFromCart(item) {
    this.props.dispatch({
      type: "DELETE_VALUE_FROM_STORE",
      payload: {
        item
      }
    });
  }

  render() {
    const limit = 220;
    const toShow =
      this.state.itemDetails.description.substring(0, limit) + "...";
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
        <View style={styles.DetailsContainerStyle}>
          <View style={styles.UpperContainerStyle}>
            <View style={styles.ImageContainerStyle}>
              <Image
                style={styles.ImageStyle}
                source={{
                  uri: this.state.itemDetails.image
                }}
              />
            </View>
            <View style={styles.DetailContainerStyle}>
              <Text style={styles.NameTxtStyle}>
                {this.state.itemDetails.name}
              </Text>
              <Text style={styles.StyleTxtStyle}>
                {this.state.itemDetails.style}
              </Text>
              <Text style={styles.SizeTxtStyle}>
                Abv :{this.state.itemDetails.abv}
              </Text>
              <Text style={styles.SizeTxtStyle}>
                Ounces :{this.state.itemDetails.ounces}
              </Text>
              <Text style={styles.SizeTxtStyle}>
                Size : {this.state.itemDetails.quantity}{" "}
                {this.state.itemDetails.unit}
              </Text>
              <Text style={styles.SizeTxtStyle}>
                Price :{this.state.itemDetails.price}
              </Text>

              <View style={styles.PlusIconViewStyle}>
                <Icon
                  name={"minus-circle"}
                  type={"font-awesome"}
                  size={24}
                  style={styles.IconStyle}
                  color="#33809a"
                  onPress={() => this._deleteFromCart(this.state.itemDetails)}
                />
                <Text style={styles.countStyle}>
                  {this.state.itemDetails.count}
                </Text>
                <Icon
                  name={"plus-circle"}
                  type={"font-awesome"}
                  size={24}
                  style={styles.IconStyle}
                  color="#33809a"
                  onPress={() => this._storeInCart(this.state.itemDetails)}
                />
              </View>
            </View>
          </View>
          <View style={styles.BottomContainerStyle}>
            <Text style={styles.AboutTxtStyle}>About : </Text>
            {this.state.showAll ? (
              <View>
                <Text style={styles.DescriptionTxtStyle}>
                  {this.state.itemDetails.description}
                </Text>
                <Text
                  style={styles.moreLessStyle}
                  onPress={() => this.showLess()}
                >
                  show less
                </Text>
              </View>
            ) : (
              <View>
                {this.state.itemDetails.description.length <= limit ? (
                  <Text style={styles.DescriptionTxtStyle}>
                    {" "}
                    {this.state.itemDetails.description}
                  </Text>
                ) : (
                  <View>
                    <Text style={styles.DescriptionTxtStyle}>{toShow}</Text>
                    <Text
                      style={styles.moreLessStyle}
                      onPress={() => this.showMore()}
                    >
                      show more
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
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
    backgroundColor: "#33809a",
    elevation: 20
  },
  headerTextStyle: {
    marginLeft: 10,
    fontSize: 25,
    color: "#fff"
  },
  DetailsContainerStyle: {
    flex: 1,
    backgroundColor: "#EFF0F1"
  },
  UpperContainerStyle: {
    flex: 0.3,
    flexDirection: "row",
    margin: 10
  },
  ImageContainerStyle: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center"
  },
  ImageStyle: {
    width: 130,
    height: 200,
    borderRadius: 20
  },
  NameTxtStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray"
  },
  StyleTxtStyle: {
    fontSize: 16,
    fontWeight: "200",
    color: "darkgray"
  },
  SizeTxtStyle: {
    fontSize: 16,
    fontWeight: "200",
    color: "#909090"
  },
  DetailContainerStyle: {
    flex: 0.6,
    padding: 10
  },
  moreLessStyle: {
    color: "#33809a"
  },
  BottomContainerStyle: {
    flex: 0.7,
    margin: 15
  },
  AboutTxtStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray"
  },
  DescriptionTxtStyle: {
    fontSize: 14,
    color: "gray"
  },
  PlusIconViewStyle: {
    paddingRight: 5,
    paddingTop: 10,
    flex: 1.7,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80
  },
  countStyle: {
    borderRadius: 20,
    width: 20,
    height: 20,
    borderColor: "black",
    borderWidth: 0.5,
    textAlign: "center"
  }
});

function mapStateToProps(state) {
  return {
    loginResponse: state.cartStore.loginResponse,
    beerList: state.cartStore.beerList
  };
}

export default connect(mapStateToProps)(ListDetailComponent);
