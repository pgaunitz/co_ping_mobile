import React from 'react';
import { useSelector } from "react-redux"
import { View, Text, StyleSheet, SafeAreaView, FlatList, Item, TouchableHighlight } from "react-native"
import NewTripForm from "./NewTripForm";
import { NEW_TRIP_FORM, SHOW_LOGIN_FORM } from "../state/actions/actionTypes";



const TripsList = () => {
  const authenticated = useSelector(state => state.authenticated);
  const trips = useSelector(state => state.trips)
  const tripMessage = useSelector(state => state.tripMessage)
  const newTrip = () => {
    dispatch({ type: NEW_TRIP_FORM });
  };
  let tripsDisplay
  if (Array.isArray(trips)) {
    tripsDisplay = trips
  }

  function Item({ store, time, name }) {
    return (
      <>
        <Text style={styles.store}>{store}</Text>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.name}>{name}</Text>
      </>
    );
  }

  return (
    <SafeAreaView style={styles.container} className="trip-list">
      <Text className="trip-message">{tripMessage}</Text>
      {authenticated && (
          <TouchableHighlight style={styles.button} onPress={newTrip}>
            <Text id="new-trip-button" style={styles.buttonText}>
              New Trip
          </Text>
          </TouchableHighlight>
        )}
      <FlatList
        data={tripsDisplay}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            store={item.store}
            time={item.time}
            name={item.name}
          />
        )}
        keyExtractor={item => item.id}
      />
     < NewTripForm />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  store: {
    fontSize: 20,
  },
  time: {
    fontSize: 20,
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
  }
});

export default TripsList
