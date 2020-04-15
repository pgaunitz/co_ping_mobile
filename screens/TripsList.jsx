import React from 'react';
import { useSelector } from "react-redux"
import { View, Text, StyleSheet, SafeAreaView, FlatList, Item } from "react-native"




const TripsList = () => {

  const trips = useSelector(state => state.trips)
  const tripMessage = useSelector(state => state.tripMessage)
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
  }
});

export default TripsList
