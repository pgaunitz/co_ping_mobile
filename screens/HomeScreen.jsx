import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TouchableHighlight,
  View,
  StyleSheet,
  Text,
  Image
} from "react-native";
import { SHOW_LOGIN_FORM, AUTHENTICATE, SIGN_UP } from "../state/actions/actionTypes";
import { onLogout } from "../modules/authentication";
import { fetchTrips, getRequestInformation } from "../modules/tripActions";
import { getProfileInformation } from "../modules/userAction"
import LoginForm from "./LoginForm";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../assets/images/co_ping_Logo2.png";

const HomeScreen = ({ navigation }) => {
  const authenticated = useSelector(state => state.authenticated);
  const logoutMessage = useSelector(state => state.logoutMessage);
  const loginMessage = useSelector(state => state.loginMessage);
  const communityStatus = useSelector(state => state.communityStatus)
  const userId = useSelector(state => state.userId)
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
        end={{ x: 1, y: 0 }}>
        <Image
          style={styles.logo}
          source={Logo}
          alt="Co-Ping logo"
        />
        <Text
          style={styles.authMessage}
          nativeID="auth-message">
          {authenticated ? loginMessage : logoutMessage}
        </Text>
        {authenticated && (
          <TouchableHighlight
            style={styles.button}
            onPress={() => onLogout(dispatch)}>
            <Text
              id="logout-button"
              style={styles.buttonText}>
              Logout
            </Text>
          </TouchableHighlight>
        )}
        {!authenticated && (
          <View style={styles.authContainer}>
            <TouchableHighlight
              style={styles.authButton}
              onPress={login}>
              <Text
                id="login-button"
                style={styles.buttonText}>
                Login
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.authButton}
              onPress={() => {
                navigation.navigate("Sign up", {
                  name: "Sign up",
                });
                dispatch({type: SIGN_UP, payload: {communityId: undefined}})
              }}>
              <Text
                id="sign-up-button"
                style={styles.buttonText}>
                Sign up
              </Text>
            </TouchableHighlight>
          </View>
        )}
        {communityStatus === "accepted" && (
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              fetchTrips(dispatch)
              navigation.navigate("Trips", {
                name: "Trips",
              })
            }}>
            <Text
              id="trip-list-button"
              style={styles.buttonText}>
              Trip Pings
            </Text>
          </TouchableHighlight>
        )}
        {communityStatus === "accepted" && (
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              navigation.navigate("My Ping Board", {
                name: "My Ping Board",
              })
            }}>
            <Text
              id="request-list-button"
              style={styles.buttonText}>
              My Ping Board
            </Text>
          </TouchableHighlight>
        )}
        {communityStatus === "accepted" && (
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              navigation.navigate("My Pong Board", {
                name: "My Pong Board",
              });
              getRequestInformation(userId, dispatch)
            }}>
            <Text
              id="request-button"
              style={styles.buttonText}>
              My Pong Board
            </Text>
          </TouchableHighlight>
        )}
        {authenticated && (
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              navigation.navigate("My Profile", {
                name: "My Profile",
              })
              dispatch({
                type: AUTHENTICATE,
                payload: { updateProfileMessage: "" },
              })
              getProfileInformation(userId, dispatch)
            }}>
            <Text
              id="profile-button"
              style={styles.buttonText}>
              My Profile
            </Text>
          </TouchableHighlight>
        )}
        <LoginForm />
      </LinearGradient>
    </View>
  )
};

const styles = StyleSheet.create({
  mainpage: {
    flex: 1,
  },
  logo: {
    width: 250,
    height: 100,
    alignSelf: "center",
    marginTop: 40,
  },
  button: {
    height: 60,
    borderRadius: 10,
    backgroundColor: "#71B280",
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#134e5e",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4.65,
  },
  buttonText: {
    color: "white",
    fontFamily: "Futura-Medium",
    fontSize: 20,
    fontWeight: "600",
  },
  authMessage: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    fontWeight: "thin",
    fontFamily: "Futura-Medium",
  },
  authContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  authButton: {
    height: 60,
    width: "40%",
    borderRadius: 10,
    backgroundColor: "#71B280",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#134e5e",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
})

export default HomeScreen;
