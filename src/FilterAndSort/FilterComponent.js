import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList
} from "react-native";
import { Icon } from "react-native-elements";
import Slider from "react-native-slider";
const { width, height } = Dimensions.get("window");

export default class FilterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showStyle: true,
      showSize: false,
      showPrice: false,
      sliderValue: 0,
      StyleList: [
        {
          name: "American Amber / Red Ale",
          selected: false
        },
        {
          name: "American Amber / Red Lager",
          selected: false
        },
        {
          name: "American Barleywine",
          selected: false
        },
        {
          name: "American Black Ale",
          selected: false
        },
        {
          name: "American Blonde Ale",
          selected: false
        },
        {
          name: "American Pale Ale (APA)",
          selected: false
        },
        {
          name: "American IPA",
          selected: false
        },
        {
          name: "American Double / Imperial IPA",
          selected: false
        },
        {
          name: "American Pale Lager",
          selected: false
        },
        {
          name: "American Pale Wheat Ale",
          selected: false
        },
        {
          name: "American Stout",
          selected: false
        },
        {
          name: "Baltic Porter",
          selected: false
        },
        {
          name: "Berliner Weissbier",
          selected: false
        },
        {
          name: "Belgian Strong Dark Ale",
          selected: false
        },
        {
          name: "Belgian IPA",
          selected: false
        },
        {
          name: "Belgian Dark Ale",
          selected: false
        },
        {
          name: "Cider",
          selected: false
        },
        {
          name: "English Strong Ale",
          selected: false
        },
        {
          name: "Fruit / Vegetable Beer",
          selected: false
        },
        {
          name: "Tripel",
          selected: false
        },
        {
          name: "Winter Warmer",
          selected: false
        }
      ],
      SizeList: [
        {
          name: "100",
          selected: false
        },
        {
          name: "200",
          selected: false
        },
        {
          name: "300",
          selected: false
        },
        {
          name: "400",
          selected: false
        },
        {
          name: "500",
          selected: false
        }
      ]
    };
  }

  _closeFilter() {
    this.props.navigation.goBack();
  }
  _applyFilter() {
    console.log("Filter Applied");
    this.props.navigation.goBack();
  }

  _selectedStyle(item, index) {
    this.state.StyleList[index].selected = !this.state.StyleList[index]
      .selected;
    this.setState({
      StyleList: this.state.StyleList
    });
  }
  _stylePressed() {
    this.setState({
      showStyle: true,
      showSize: false,
      showPrice: false
    });
  }

  _sizePressed() {
    this.setState({
      showStyle: false,
      showSize: true,
      showPrice: false
    });
  }

  _pricePressed() {
    this.setState({
      showStyle: false,
      showSize: false,
      showPrice: true
    });
  }

  _clearAllPressed() {
    console.log("clear all");
  }

  _renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity
          style={[Styles.ListBlockViewContainer]}
          onPress={() => this._selectedStyle(item, index)}
        >
          <Text
            style={[
              Styles.ItemTextStyle,
              item.selected ? Styles.SelectedItemStyle : null
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={Styles.OuterContainer}>
        <View style={Styles.HeaderOuterContainer}>
          <TouchableOpacity style={Styles.TitleViewStyle}>
            <Text style={Styles.TitleStyle}>Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.TitleViewStyle}
            onPress={() => this._clearAllPressed()}
          >
            <Text style={Styles.TitleStyle}>CLEAR ALL</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.FilterOuterContainer}>
          <View style={Styles.LeftSideContainer}>
            <TouchableOpacity
              style={Styles.BlockViewContainer}
              onPress={() => this._stylePressed()}
            >
              <Text style={Styles.BlockTextStyle}>Style</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.BlockViewContainer}
              onPress={() => this._sizePressed()}
            >
              <Text style={Styles.BlockTextStyle}>Size</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.BlockViewContainer}
              onPress={() => this._pricePressed()}
            >
              <Text style={Styles.BlockTextStyle}>Price Range</Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.RightSideContainer}>
            {this.state.showStyle ? (
              <View style={Styles.RightSideListContainer}>
                <FlatList
                  style={Styles.FlatListStyle}
                  contentContainerStyle={Styles.FlatListContainerStyle}
                  data={this.state.StyleList}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={this._renderItem}
                  ItemSeparatorComponent={() => (
                    <View style={Styles.separator} />
                  )}
                />
              </View>
            ) : (
              <View />
            )}
            {this.state.showSize ? (
              <View style={Styles.RightSideListContainer}>
                <FlatList
                  style={Styles.FlatListStyle}
                  contentContainerStyle={Styles.FlatListContainerStyle}
                  data={this.state.SizeList}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={this._renderItem}
                  ItemSeparatorComponent={() => (
                    <View style={Styles.separator} />
                  )}
                />
              </View>
            ) : (
              <View />
            )}
            {this.state.showPrice ? (
              <View style={Styles.RightSidePriceContainer}>
                <Text style={Styles.SelectedTextStyle}>
                  Selected Price range
                </Text>
                <Text style={Styles.PriceTextStyle}>
                  {" "}
                  ₹ {this.state.sliderValue}
                </Text>
                <Slider
                  step={1}
                  maximumValue={100}
                  thumbTintColor="#0966aa"
                  minimumTrackTintColor="#0966aa"
                  value={this.state.sliderValue}
                  onValueChange={sliderValue => this.setState({ sliderValue })}
                />
              </View>
            ) : (
              <View />
            )}
          </View>
        </View>
        <View style={Styles.FooterContainerStyle}>
          <TouchableOpacity onPress={() => this._closeFilter()}>
            <Text style={Styles.TitleStyle}>CLOSE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._applyFilter()}>
            <Text style={Styles.TitleStyle}>APPLY</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  HeaderOuterContainer: {
    height: 50,
    width: width,
    backgroundColor: "#0966aa",
    flexDirection: "row",
    padding: 12,
    justifyContent: "space-between"
  },
  FooterContainerStyle: {
    bottom: 0,
    height: 50,
    width: width,
    backgroundColor: "#0966aa",
    flexDirection: "row",
    padding: 12,
    justifyContent: "space-between",
    position: "absolute"
  },
  RightSideListContainer: {},
  RightSidePriceContainer: {
    margin: 14
  },
  SelectedItemStyle: {
    color: "#0966aa",
    fontWeight: "bold"
  },
  SelectedTextStyle: {
    padding: 5
  },
  PriceTextStyle: {
    padding: 5,
    paddingBottom: 15
  },
  IconViewStyle: {
    flex: 0.1
  },
  TitleStyle: {
    fontSize: 18,
    color: "#fff"
  },
  OuterContainer: {
    backgroundColor: "#fff",
    flex: 1
  },
  FilterOuterContainer: {
    flexDirection: "row"
  },
  LeftSideContainer: {
    flex: 0.35,
    backgroundColor: "#f5f5f6",
    height: height
  },
  ListBlockViewContainer: {
    height: 45,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaec"
  },
  BlockViewContainer: {
    height: 55,
    backgroundColor: "#f5f5f6",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaec"
  },
  BlockTextStyle: {
    fontSize: 18
  },
  RightSideContainer: {
    flex: 0.65
    // height:height
  }
});
