import * as React from "react";
import { View, Image, StyleSheet } from "react-native";
import Logo from "./assets/images/co_ping_Logo2.png";
import HomeScreen from "./screens/HomeScreen.jsx";
import { Provider } from "react-redux";
import configureStore from "./state/store/configureStore";
import NewTripForm from "./screens/NewTripForm";
import axios from "axios"

// axios.default.baseURL = "http://localhost:3000"
axios.defaults.baseURL = "https://co-ping.herokuapp.com"

const styles = StyleSheet.create({
  mainpage: {
    flex: 1,
    backgroundColor: "#134E5E",
  },
  logo: {
    width: 250,
    height: 100,
    alignSelf: "center",
    margin: 20,
  },
});

const store = configureStore()
window.store = store

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.mainpage}>
        <Image
          style={styles.logo}
          source={Logo}
          alt="Co-Ping logo"
        />
        <HomeScreen />
        <NewTripForm />
      </View>
    </Provider>
  );
};

export default App;
