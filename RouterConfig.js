import { DrawerNavigator } from "react-navigation";
import HomeComponent from "./src/HomeComponent";
import LoginComponent from "./src/LoginComponent";
import MyAccountComponent from "./src/MyAccountComponent";
import CartComponent from "./src/CartComponent";
import LogoutComponent from "./src/LogoutComponent";
import DrawerComponent from "./src/DrawerComponent/DrawerComponent";
import HeaderComponent from "./src/HeaderComponent";

export default DrawerNavigator(
  {
    LoginScreen: {
      screen: LoginComponent
    },
    HomeScreen: {
      screen: HomeComponent
    },
    MyAccScreen: {
      screen: MyAccountComponent
    },
    CartScreen: {
      screen: CartComponent
    },
    LogoutScreen: {
      screen: LogoutComponent
    }
  },
  {
    contentComponent: DrawerComponent,
    drawerWidth: 300
  }
);
