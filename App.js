import * as React from "react";
import { View, Text, Image, StyleSheet} from "react-native";
import Logo from "./assets/images/co_ping_Logo2.png";

const App = () => {
  return (
    <>
    <View style={styles.mainpage}>
    <Image style={styles.Logo} source={Logo} alt="where is my Logo!?!!!?!!"/>
      <Text>New Trip</Text>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainpage: {
    flex: 1,
    backgroundColor: '#134E5E',
  },
  logo: {
    width: 66,
    height: 58,
  }
});

export default App;

