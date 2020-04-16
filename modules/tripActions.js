import axios from "axios";
import { GET_TRIP_LIST } from "../state/actions/actionTypes";

const fetchTrips = async (dispatch) => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  let response = await axios.get("http://localhost:3000/pings", {
    headers: headers,
  });
  return dispatch({
    type: GET_TRIP_LIST,
    payload: { trips: response.data.pings, tripMessage: response.data.message },
  });
};

export { fetchTrips };
