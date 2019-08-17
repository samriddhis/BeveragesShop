import { DrawerNavigator,createStackNavigator ,createDrawerNavigator} from "react-navigation";
import HomeComponent from "./src/HomeComponent";
import LoginComponent from "./src/LoginComponent";
import MyAccountComponent from "./src/MyAccountComponent";
import CartComponent from "./src/CartComponent";
import LogoutComponent from "./src/LogoutComponent";
import DrawerComponent from "./src/DrawerComponent/DrawerComponent";
import HeaderComponent from "./src/HeaderComponent";

const drawerNav = createDrawerNavigator(
  {
    LoginScreen:LoginComponent,
    HomeScreen: HomeComponent,
    MyAccScreen:MyAccountComponent,
    CartScreen:CartComponent,
    LogoutScreen: LogoutComponent,
    loginScreen:LoginComponent
  },
  {
    contentComponent :DrawerComponent,
    drawerWidth: 300
  }
);

/*const stackNav = createStackNavigator(
  {
    LoginScreen:LoginComponent,
    HomeScreen: HomeComponent,
    DrawerNavigator: drawerNav
  },
  {
    initialRouteName:"LoginScreen",
    headerMode: "none"
  } 
)*/

export default drawerNav