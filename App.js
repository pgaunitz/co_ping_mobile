import * as React from "react";
import { View, Text, Image, StyleSheet} from "react-native";
import co_ping_Logo2 from "./assets/images/co_ping_Logo2.png";

const App = () => {
  return (
    <View style={styles.mainpage}>
      <Image source={co_ping_Logo2} />
      <Text>New Trip</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainpage: {
    flex: 1,
    backgroundColor: '#134E5E',
  },
});

export default App;

