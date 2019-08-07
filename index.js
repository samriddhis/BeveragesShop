/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

console.disableYellowBox = true;
navVar = global.navVar;
global.cartVar = []
AppRegistry.registerComponent(appName, () => App);
