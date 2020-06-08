import React, { useEffect } from "react";
import { Text, TouchableHighlight, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { closeTrip, getTripInformation } from "modules/tripActions";

const TripDetailsHeader = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    getTripInformation(userId, dispatch);
  }, []);

  const noPongsMessage = useSelector((state) => state.noPongsMessage);
  const closeTripMessage = useSelector((state) => state.closeTripMessage);
  const userTrip = useSelector((state) => state.userTrip);
  const pingId = useSelector((state) => state.userTrip.id);

  let pingBoardMessage;
  if (noPongsMessage === "") {
    pingBoardMessage = `You're going to ${userTrip.store} at ${userTrip.time}.`;
  } else {
    pingBoardMessage = `${noPongsMessage}`;
  }
  let closeTripInformation;
  if (closeTripMessage) {
    closeTripInformation = (
      <Text id="close-trip-message" style={styles.trip}>
        {closeTripMessage}
      </Text>
    );
  } else {
    closeTripInformation = (
      <TouchableHighlight
        style={styles.closeButton}
        onPress={() => {
          closeTrip(pingId, userId, dispatch);
        }}
      >
        <Text style={styles.buttonText} id="close-trip-button">
          Stop Incoming Pongs
        </Text>
      </TouchableHighlight>
    );
  }

  return (
    <View>
      <Text style={styles.trip}>{pingBoardMessage}</Text>
      {pingId && closeTripInformation}
    </View>
  );
};

const styles = StyleSheet.create({
  trip: {
    color: "white",
    margin: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
  },
  closeButton: {
    height: 35,
    borderRadius: 10,
    backgroundColor: "#71B280",
    marginVertical: 10,
    marginHorizontal: 30,
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
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
  },
});

export default TripDetailsHeader;
