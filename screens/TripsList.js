import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableHighlight
} from "react-native";
import {
  NEW_TRIP_FORM,
  SELECTED_TRIP_ID,
} from "../state/actions/actionTypes"

import NewTripForm from "screens/NewTripForm";
import { LinearGradient } from "expo-linear-gradient";

const TripsList = ({ navigation }) => {
  const dispatch = useDispatch();
  const authenticated = useSelector(state => state.authenticated);
  const trips = useSelector(state => state.trips);
  const tripMessage = useSelector(state => state.tripMessage);
  const newTrip = () => {
    dispatch({ type: NEW_TRIP_FORM });
  };
  let tripsDisplay;
  if (Array.isArray(trips)) {
    tripsDisplay = trips;
  }

  const Item = ({ store, time, name, phone, requestButton, id }) => {
    return (
      <View style={styles.trip}>
        <View style={styles.itemContainer}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.store}>Phone: {phone}</Text>
            <Text style={styles.store}>{store}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>
          <TouchableHighlight
            style={styles.request}
            onPress={() => {
              dispatch({
                type: SELECTED_TRIP_ID,
                payload: { selectedTripId: id },
              })
              navigation.navigate("Requests", {
                name: "Requests",
              })
            }}>
            <Text
              nativeID="trip-button"
              style={styles.requestButtonText}>
              {requestButton}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  };

  return (
    <View style={styles.container} nativeID="trip-list">
      <LinearGradient
        colors={["#71b280", "#134e5e"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <Text nativeID="trip-message" style={styles.tripNote}>
          {tripMessage}
        </Text>
        {authenticated && (
          <TouchableHighlight style={styles.button} onPress={newTrip}>
            <Text id="new-trip-button" style={styles.buttonText}>
              New Ping
            </Text>
          </TouchableHighlight>
        )}
        <FlatList
          data={tripsDisplay}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              name={item.user_name}
              phone={item.phone_number}
              store={item.store}
              time={item.time}
              requestButton="Request Pong"
            />
          )}
          keyExtractor={item => item.id}
        />
        <NewTripForm />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  trip: {
    padding: 5,
    margin: 15,
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "#134e5e",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  time: {
    fontSize: 16,
    fontFamily: "Futura-Medium",
  },
  store: {
    fontSize: 16,
    fontFamily: "Futura-Medium",
  },
  name: {
    fontSize: 20,
    fontFamily: "Futura-Medium",
  },
  tripNote: {
    fontSize: 25,
    color: "white",
    margin: 20,
    textAlign: "center",
    fontFamily: "Futura-Medium",
  },
  button: {
    height: 60,
    borderRadius: 10,
    backgroundColor: "#71B280",
    margin: 5,
    marginTop: 50,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#134e5e",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Futura-Medium",
  },
  request: {
    height: 90,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#71B280",
    marginBottom: "auto",
    paddingTop: 16,
    paddingBottom: 18,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    alignSelf: "center"
  },
  requestButtonText: {
    color: "#fff",
    fontSize: 18,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: "auto",
    fontWeight: "400",
    fontFamily: "Futura-Medium",
  },
  itemContainer: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginVertical: 10,
    justifyContent: "center"
  },
})

export default TripsList;
