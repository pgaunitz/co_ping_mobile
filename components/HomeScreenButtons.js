import React from "react";
import { onLogout } from "../modules/authentication";
import { useDispatch, useSelector } from "react-redux";
import { TouchableHighlight, StyleSheet, Text } from "react-native";
import {
  SHOW_LOGIN_FORM,
  SIGN_UP,
  AUTHENTICATE,
} from "../state/actions/actionTypes";
import { useNavigation } from "@react-navigation/native";
import { fetchTrips } from "../modules/tripActions";
import { getRequestInformation } from "../modules/requestActions";
import { getProfileInformation } from "../modules/profileActions";

const LogoutButton = () => {
  const dispatch = useDispatch();
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={() => onLogout(dispatch)}
    >
      <Text id="logout-button" style={styles.buttonText}>
        Logout
      </Text>
    </TouchableHighlight>
  );
};

const LoginButton = () => {
  const dispatch = useDispatch();
  const login = () => {
    dispatch({ type: SHOW_LOGIN_FORM });
  };
  return (
    <TouchableHighlight style={styles.authButton} onPress={login}>
      <Text id="login-button" style={styles.buttonText}>
        Login
      </Text>
    </TouchableHighlight>
  );
};

const SignUpButton = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <TouchableHighlight
      style={styles.authButton}
      onPress={() => {
        navigation.navigate("Sign up", {
          name: "Sign up",
        });
        dispatch({
          type: SIGN_UP,
          payload: { communityId: undefined },
        });
      }}
    >
      <Text id="sign-up-button" style={styles.buttonText}>
        Sign up
      </Text>
    </TouchableHighlight>
  );
};

const TripPingsButton = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={() => {
        fetchTrips(dispatch);
        navigation.navigate("Trips", {
          name: "Trips",
        });
      }}
    >
      <Text id="trip-list-button" style={styles.buttonText}>
        Trip Pings
      </Text>
    </TouchableHighlight>
  );
};

const PingBoardButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={() => {
        navigation.navigate("My Ping Board", {
          name: "My Ping Board",
        });
      }}
    >
      <Text id="request-list-button" style={styles.buttonText}>
        My Ping Board
      </Text>
    </TouchableHighlight>
  );
};

const PongBoardButton = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  const navigation = useNavigation();
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={() => {
        navigation.navigate("My Pong Board", {
          name: "My Pong Board",
        });
        getRequestInformation(userId, dispatch);
      }}
    >
      <Text id="request-button" style={styles.buttonText}>
        My Pong Board
      </Text>
    </TouchableHighlight>
  );
};

const ProfileButton = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  const navigation = useNavigation();
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={() => {
        navigation.navigate("My Profile", {
          name: "My Profile",
        });
        dispatch({
          type: AUTHENTICATE,
          payload: { updateProfileMessage: "" },
        });
        getProfileInformation(userId, dispatch);
      }}
    >
      <Text id="profile-button" style={styles.buttonText}>
        My Profile
      </Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 20,
    fontWeight: "600",
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
});

export {
  LogoutButton,
  LoginButton,
  SignUpButton,
  TripPingsButton,
  PingBoardButton,
  PongBoardButton,
  ProfileButton,
};
