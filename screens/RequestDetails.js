import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getRequestInformation } from "modules/requestActions";
import ActivePongs from "screens/ActivePongs";

const RequestDetails = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    getRequestInformation(userId, dispatch);
  }, []);

  const myPongMessage = useSelector((state) => state.myPongMessage);

  return (
    <View style={styles.container} nativeID="request-form">
      <LinearGradient
        colors={["#71b280", "#134e5e"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.title}>My Current Pong</Text>
        {myPongMessage ? (
          <Text style={styles.trip}>{myPongMessage}</Text>
        ) : (
          <ActivePongs />
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  trip: {
    color: "white",
    margin: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
  },
});

export default RequestDetails;
