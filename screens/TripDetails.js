import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getTripInformation, completeTrip } from "../modules/tripActions";
import { PongToPingDetails } from "./PongToPingDetails";
import TripDetailsHeader from "../components/TripDetailsHeader";

const TripDetails = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    getTripInformation(userId, dispatch);
  }, []);

  const myPongs = useSelector((state) => state.myPongs);
  const pingId = useSelector((state) => state.userTrip.id);
  const emptyPingId = useSelector((state) => state.emptyPingId);
  const completeTripMessage = useSelector((state) => state.completeTripMessage);

  const Item = ({
    pongId,
    name,
    phone,
    itemOne,
    itemTwo,
    itemThree,
    acceptButton,
    rejectButton,
    status,
  }) => {
    return PongToPingDetails(
      pongId,
      name,
      phone,
      itemOne,
      itemTwo,
      itemThree,
      acceptButton,
      rejectButton,
      status
    );
  };

  return (
    <View style={styles.container} nativeID="request-form">
      <LinearGradient
        colors={["#71b280", "#134e5e"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.title}>My Current Trip</Text>
        {completeTripMessage ? (
          <Text style={styles.trip} id="completion-message">
            {completeTripMessage}
          </Text>
        ) : (
          <TripDetailsHeader />
        )}
        <FlatList
          data={myPongs}
          renderItem={({ item, index }) => (
            <Item
              pongId={item.id}
              name={item.user_name}
              phone={item.phone_number}
              itemOne={item.item1}
              itemTwo={item.item2}
              itemThree={item.item3}
              status={item.status}
              acceptButton="Of course!"
              rejectButton="Sorry, not this time"
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          id="request"
        />
        {completeTripMessage !== "Your trip is completed" && (
          <TouchableHighlight
            style={styles.completeButton}
            onPress={() => {
              completeTrip(pingId || emptyPingId, dispatch);
            }}
          >
            <Text style={styles.buttonText} id="complete-button">
              Complete Trip
            </Text>
          </TouchableHighlight>
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
  closeButton: {
    height: 30,
    borderRadius: 10,
    backgroundColor: "#71B280",
    margin: 10,
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
    fontFamily: "Futura-Medium",
  },
  completeButton: {
    height: 35,
    borderRadius: 10,
    backgroundColor: "#B27183",
    margin: 30,
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

export default TripDetails;
