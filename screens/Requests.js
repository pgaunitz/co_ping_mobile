import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import RequestForm from "./RequestForm";

const Requests = () => {
  const newRequestCreatedMessage = useSelector(
    (state) => state.newRequestCreatedMessage
  );

  let showForm;
  if (newRequestCreatedMessage !== "Your request was added to this trip") {
    showForm = true;
  } else showForm = undefined;

  return (
    <View style={styles.requestPage} nativeID="request-form">
      <LinearGradient
        colors={["#71b280", "#134e5e"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.title}>Trip Request</Text>
        <Text id="request-message" style={styles.responseMessage}>
          {newRequestCreatedMessage}
        </Text>
        {showForm && <RequestForm />}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  requestPage: {
    flex: 1,
  },
  responseMessage: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    margin: 10,
    marginTop: 40,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
  },
});

export default Requests;
