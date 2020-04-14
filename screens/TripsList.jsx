import React, { useEffect } from 'react';
import axios from "axios";
import { GET_TRIP_LIST } from "../state/actions/actionTypes"
import { useSelector, useDispatch } from "react-redux"
import { View, Text } from "react-native"



const TripsList = () => {


   const trips = useSelector(state => state.trips)

  // let tripsDisplay = trips.map(trip => {
  //   return (
  //     trip.time,
  //     trip.store,
  //     trip.id
  //   )
  // })

  return (
    <View><Text>{trips}</Text></View>
  )
}

export default TripsList
