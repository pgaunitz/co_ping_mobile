import * as React from "react";
import { useDispatch } from "react-redux";
import { TouchableHighlight, View, StyleSheet, Text } from "react-native";
import {NEW_TRIP_FORM} from "../state/actions/actionTypes"

const HomeScreen = () => {
  const dispatch = useDispatch()
  const newTrip = () => {
    dispatch({type: NEW_TRIP_FORM})
  };

  return (
    <View>
      <TouchableHighlight style={styles.button} onPress={newTrip}>
        <Text id="new-trip-button" style={styles.buttonText}>
          New Trip
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#71B280",
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#black",
    fontSize: 20,
    fontWeight: "600",
  },
});

export default HomeScreen;
