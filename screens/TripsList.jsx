import React from 'react';
import { useSelector } from "react-redux"
import { View, Text, StyleSheet } from "react-native"

const TripsList = () => {

  const trips = useSelector(state => state.trips)
  let tripsDisplay
  if (Array.isArray(trips)) {
    tripsDisplay = trips.map(trip => {
      return (
        <View id="trip-list" key={trip.id}>
          <Text >{trip.time}</Text>
          <Text >{trip.name}</Text>
          <Text >{trip.store}</Text>
          <Text>{trip.id}</Text>
        </ View >
      )
    })
  }

  return (
    <>
      {tripsDisplay}
    </>
  )
}

const styles = StyleSheet.create({
  
})

export default TripsList
