import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TouchableHighlight, View, StyleSheet, Text, Image } from "react-native";
import { SHOW_LOGIN_FORM } from "../state/actions/actionTypes";
import { onLogout } from "../modules/authentication";
import { fetchTrips } from "../modules/tripActions"
import LoginForm from "./LoginForm";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../assets/images/co_ping_Logo2.png";

const HomeScreen = ({ navigation }) => {
  const authenticated = useSelector(state => state.authenticated);
  const logoutMessage = useSelector(state => state.logoutMessage);
  const loginMessage = useSelector(state => state.loginMessage);
  const dispatch = useDispatch();
  const login = () => {
    dispatch({ type: SHOW_LOGIN_FORM });
  };

  return (
    <View style={styles.mainpage}>
      <LinearGradient
        colors={["#71b280", "#134e5e"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <Image style={styles.logo} source={Logo} alt="Co-Ping logo" />

        <Text style={styles.authMessage} nativeID="auth-message">
          {authenticated ? loginMessage : logoutMessage}
        </Text>

        {authenticated && (
          <TouchableHighlight
            style={styles.button}
            onPress={() => onLogout(dispatch)}
          >
            <Text id="logout-button" style={styles.buttonText}>
              Logout
          </Text>
          </TouchableHighlight>
        )}

        {!authenticated && (
          <TouchableHighlight style={styles.button} onPress={login}>
            <Text id="login-button" style={styles.buttonText}>
              Login
          </Text>
          </TouchableHighlight>
        )}

        {authenticated && (
          <TouchableHighlight
            style={styles.button}
            onPress={() => { fetchTrips(dispatch); navigation.navigate('Trips', { name: "Trips" }) }}
          >
            <Text id="trip-list-button" style={styles.buttonText}>
              Trip Pings
          </Text>
          </TouchableHighlight>
        )}

        < LoginForm />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  mainpage: {
    flex: 1
  },
  logo: {
    width: 250,
    height: 100,
    alignSelf: "center",
    marginTop: 40
  },
  button: {
    height: 60,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#71B280",
    margin: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "#black",
    fontSize: 20,
    fontWeight: "600"
  },
  authMessage: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    color: "white"
  }
});

export default HomeScreen;
