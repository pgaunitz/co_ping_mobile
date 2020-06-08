import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import SignUpForm from "../components/SignUpForm";
import SignUpCommunityCode from "../components/SignUpCommunityCode";

const SignUpDisplay = ({ navigation }) => {
  const communityId = useSelector((state) => state.communityId);
  const codeErrorMessage = useSelector((state) => state.codeErrorMessage);

  return (
    <View style={styles.mainpage}>
      <LinearGradient
        colors={["#71b280", "#134e5e"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.title}>Sign up</Text>
        {!communityId && (
          <Text style={styles.trip} id="community-code-message">
            {codeErrorMessage}
          </Text>
        )}
        {communityId ? <SignUpForm /> : <SignUpCommunityCode />}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  mainpage: {
    flex: 1,
  },
  trip: {
    color: "white",
    margin: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    marginBottom: 20,
    marginTop: 50,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
  },
});

export default SignUpDisplay;
