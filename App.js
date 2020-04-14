import * as React from "react";
import { View, Image, StyleSheet } from "react-native";
import Logo from "./assets/images/co_ping_Logo2.png";
import HomeScreen from "./screens/HomeScreen.jsx";
import { Provider } from "react-redux";
import configureStore from "./state/store/configureStore";
import NewTripForm from "./screens/NewTripForm";
import axios from "axios";
import LoginForm from "./screens/LoginForm";
import { LinearGradient } from "expo-linear-gradient";
import TripsList from "./screens/TripsList";


 axios.default.baseURL = "http://localhost:3000";
//axios.defaults.baseURL = "https://co-ping.herokuapp.com";

const styles = StyleSheet.create({
  mainpage: {
    flex: 1
  },
  logo: {
    width: 250,
    height: 100,
    alignSelf: "center",
    marginTop: 40
  }
});
const store = configureStore();
window.store = store;
const App = () => {

  return (
    <Provider store={store}>
      <View style={styles.mainpage}>
        <LinearGradient
          colors={["#71b280", "#134e5e"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          <Image style={styles.logo} source={Logo} alt="Co-Ping logo" />
          <HomeScreen />
          <LoginForm />
          <NewTripForm />
          <TripsList/>
        </LinearGradient>
      </View>
    </Provider>
  );
};
export default App;
