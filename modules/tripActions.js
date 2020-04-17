import axios from "axios";
import { GET_TRIP_LIST, GET_TRIP_DETAILS, GET_TRIP_REQUEST_DETAILS } from "../state/actions/actionTypes";

const fetchTrips = async (dispatch) => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  let response = await axios.get("https://co-ping.herokuapp.com/pings", {
    headers: headers,
  });
  return dispatch({
    type: GET_TRIP_LIST,
    payload: { trips: response.data.pings, tripMessage: response.data.message },
  });
};

let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
const getInformation = async (userId, dispatch) => {
  let pingResponse = await axios.get(
    `https://co-ping.herokuapp.com/pings/${userId}`,
    {
      headers: headers,
    }
  );
  dispatch({
    type: GET_TRIP_DETAILS,
    payload: {
      userTrip: pingResponse.data.pings,
      userTripMessage: pingResponse.data.message,
    },
  });
  debugger
  let pongResponse = await axios.get(
    `https://co-ping.herokuapp.com/pongs/${pingResponse.data.pings.ping_id}`,
    {
      headers: headers,
    }
  );
  dispatch({
    type: GET_TRIP_REQUEST_DETAILS,
    payload: {
      myPongs: pongResponse.data.pongs,
      myPongsMessage: pongResponse.data.message,
    },
  });
};

export { fetchTrips, getInformation };
