import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../assets/images/co_ping_Logo2.png";
import { Image, StyleSheet, View } from "react-native";

const Background = () => {
  return (
    <View style={styles.mainpage}>
      <LinearGradient
        colors={["#71b280", "#134e5e"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <Image style={styles.logo} source={Logo} alt="Co-Ping logo" />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  mainpage: {
    position: "relative",
    zIndex: -1,
    flex: 1,
  },
  logo: {
    width: 250,
    height: 100,
    alignSelf: "center",
    marginTop: 60,
  },
});

export default Background;
