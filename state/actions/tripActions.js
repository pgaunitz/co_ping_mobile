import axios from "axios"
import { GET_TRIP_LIST } from "./actionTypes"

const fetchTrips = () => {
  return async dispatch => {
    let response = await axios.get("/pings")
    debugger
    return dispatch(dispatchTrips(response.data))
  }
}

const dispatchTrips = json => {
  debugger
  return { type: GET_TRIP_LIST, payload: {trips: json } };
};

export { fetchTrips }