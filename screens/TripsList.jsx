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
import NewTripForm from "./NewTripForm";
import { NEW_TRIP_FORM, SELECTED_TRIP_ID } from "../state/actions/actionTypes";
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

  function Item({ store, time, name, request, id }) {
    return (
      <View style={styles.trip}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.store}>{store}</Text>
        <Text style={styles.time}>{time}</Text>
        <TouchableHighlight
          style={styles.request}
          onPress={() => { dispatch({type: SELECTED_TRIP_ID, payload: {selectedTripId: id}});
            navigation.navigate("Requests", { name: "Requests" });
          }}
        >
          <Text id="trip-button" style={styles.requestButtonText}>
            {request}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} className="trip-list">
      <LinearGradient
        colors={["#71b280", "#134e5e"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <Text className="trip-message" style={styles.tripNote}>
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
              store={item.store}
              time={item.time}
              request="Request Pong"
            />
          )}
          keyExtractor={item => item.id}
        />
        <NewTripForm />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  trip: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 2.0
  },
  time: {
    fontSize: 12
  },
  store: {
    fontSize: 12
  },
  name: {
    fontSize: 20,
    fontWeight: "bold"
  },
  tripNote: {
    fontSize: 25,
    color: "white",
    margin: 20,
    textAlign: "center"
  },
  button: {
    height: 60,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#71B280",
    margin: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "#black",
    fontSize: 20,
    fontWeight: "600"
  },
  request: {
    height: 30,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#71B280",
    marginTop: 15,
    margin: 5,
    paddingTop: 16,
    paddingBottom: 18,
    width: "40%",
    justifyContent: "center",
    alignItems: "center"
  },
  requestButtonText: {
    color: "#black",
    fontSize: 15
  }
});

export default TripsList;
