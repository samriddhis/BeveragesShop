import {
  DrawerNavigator,
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";
import HomeComponent from "./src/HomeComponent";
import LoginComponent from "./src/LoginComponent";
import MyAccountComponent from "./src/MyAccountComponent";
import CartComponent from "./src/CartComponent";
import LogoutComponent from "./src/LogoutComponent";
import DrawerComponent from "./src/DrawerComponent/DrawerComponent";
import AuthenticationComponent from "./src/DrawerComponent/AuthenticationComponent";
import ListDetailComponent from "./src/ListDetailComponent";
import FilterComponent from "./src/FilterAndSort/FilterComponent";
import HeaderComponent from "./src/HeaderComponent";

const drawerNav = createDrawerNavigator(
  {
    HomeScreen: HomeComponent,
    MyAccScreen: MyAccountComponent,
    CartScreen: CartComponent,
    LogoutScreen: LogoutComponent,
    loginScreen: LoginComponent
  },
  {
    contentComponent: DrawerComponent,
    drawerWidth: 300
  }
);

const stackNav = createStackNavigator(
  {
    AuthScreen: AuthenticationComponent,
    LoginScreen: LoginComponent,
    DrawerNavigator: drawerNav,
    ListDetailScreen: ListDetailComponent,
    FilterScreen: FilterComponent
  },
  {
    initialRouteName: "AuthScreen",
    headerMode: "none"
  }
);

export default stackNav;
