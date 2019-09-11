import {Dimensions} from "react-native"
const { width, height } = Dimensions.get("window");
export default {
  container: {
    flex: 1
  },
  ProfilePicStyle:{
    backgroundColor: 'lightgrey',
    flexDirection:'row',
    padding:22
  },
  ProfileTextStyle:{
    marginLeft:20,
    fontSize:15,
    fontWeight: 'bold'
  },
  NavHeaderStyle:{
    flexDirection:'row',
    padding:20
  },
  NavHeaderTextStyle:{
    marginLeft:20,
    fontSize:13
  }
};
