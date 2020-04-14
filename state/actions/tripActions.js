import axios from "axios"
import { GET_TRIP_LIST } from "./actionTypes"

const fetchTrips = (dispatch) => {
  return async () => {
    debugger
    let response = await axios.get("http://localhost:3000/pings")
    debugger
    return dispatch(dispatchTrips(response.data))
  }
}

const dispatchTrips = json => {
  debugger
  return { type: GET_TRIP_LIST, payload: {trips: json } };
};

export { fetchTrips }