import React from "react";
import { View, Text ,StyleSheet} from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";

export default class ShimmerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfShimmer: 16
    };
  }
  _renderShimmer() {
    var viewShimmer = [];
    for (let i = 0; i < this.state.numberOfShimmer; i++) {
      viewShimmer.push(
        <ShimmerPlaceHolder
          key={i}
          autoRun={true}
          visible={false}
          style={{ width: "90%" }}
        />
      );
    }
    return viewShimmer;
  }
  render() {
    return <View style={styles.shimmerView_style}>{this._renderShimmer()}</View>;
  }
}

const styles = StyleSheet.create({
    shimmerView_style:{
        flex:1,
        alignItems:"center",
        justifyContent:"space-evenly"
        
    }
})
