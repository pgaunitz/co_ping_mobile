import * as React from "react";
import { View, Image, StyleSheet} from "react-native";
import Logo from "./assets/images/co_ping_Logo2.png";
import HomeScreen from "./screens/HomeScreen"

const styles = StyleSheet.create({
  mainpage: {
    flex: 1,
    backgroundColor: '#134E5E',
  },
  logo: {
    width: 250,
    height: 100,
    alignSelf: 'center',
    margin: 20 
  }
});

const App = () => {
  return (
    <>
    <View style={styles.mainpage}>
    <Image style={styles.logo} source={Logo} alt="where is my Logo!?!!!?!!"/>
    <HomeScreen/>
    </View>
    </>
  );
};

export default App;

