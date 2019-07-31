/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import RouterConfig from "./RouterConfig";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <RouterConfig />
    );
  }
}

const styles = StyleSheet.create({});
