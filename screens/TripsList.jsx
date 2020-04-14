import React, { useEffect } from 'react';
import axios from "axios";
import { GET_TRIP_LIST } from "../state/actions/actionTypes"
import { useSelector, useDispatch } from "react-redux"
import { View, Text } from "react-native"
import { fetchTrips } from "../state/actions/tripActions"


const TripsList = () => {
  // const dispatch = useDispatch()
  // useEffect( async => {

  //   let response = await axios.get("/pings");
  //   // return dispatch(dispatchTrips(response.data))
  //    dispatch({ type: GET_TRIP_LIST, payload: { trips: response.data } })
  //    debugger
  // })

  // const dispatchTrips = json => {
  //   return { type: GET_TRIP_LIST, payload: { trips: json } }
  // }
  useEffect(() => {
    debugger
   fetchTrips()
  })

   const trips = useSelector(state => state.trips)

  // let tripsDisplay = trips.map(trip => {
  //   return (
  //     trip.time,
  //     trip.store,
  //     trip.id
  //   )
  // })

  return (
    <View><Text>Hi</Text></View>
  )
}

export default TripsList
