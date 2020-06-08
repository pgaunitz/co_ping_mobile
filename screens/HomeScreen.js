import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../assets/images/co_ping_Logo2.png";
import LoginForm from "./LoginForm";
import {
  LogoutButton,
  LoginButton,
  SignUpButton,
  TripPingsButton,
  PingBoardButton,
  PongBoardButton,
  ProfileButton,
} from "../components/HomeScreenButtons";

const HomeScreen = () => {
  const authenticated = useSelector((state) => state.authenticated);
  const logoutMessage = useSelector((state) => state.logoutMessage);
  const loginMessage = useSelector((state) => state.loginMessage);
  const communityStatus = useSelector((state) => state.communityStatus);

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
        {authenticated && <LogoutButton />}
        {!authenticated && (
          <View style={styles.authContainer}>
            <LoginButton />
            <SignUpButton />
          </View>
        )}
        {communityStatus === "accepted" && <TripPingsButton />}
        {communityStatus === "accepted" && <PingBoardButton />}
        {communityStatus === "accepted" && <PongBoardButton />}
        {authenticated && <ProfileButton />}
        <LoginForm />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  mainpage: {
    flex: 1,
  },
  logo: {
    width: 250,
    height: 100,
    alignSelf: "center",
    marginTop: 50,
  },
  authMessage: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    fontWeight: "normal",
    marginVertical: 15,
  },
  authContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
