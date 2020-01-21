/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import bgMessaging from './src/notification/bgMessaging'; 

console.disableYellowBox = true;
navVar = global.navVar;
global.cartVar = []
deviceToken = global.deviceToken;
global.deviceToken = "";
AppRegistry.registerComponent(appName, () => App);

// New task registration
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging); 
