import axios from "axios";
import { GET_TRIP_LIST, GET_TRIP_DETAILS, GET_TRIP_REQUEST_DETAILS, PONG_STATUS } from "../state/actions/actionTypes";

let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));

const fetchTrips = async (dispatch) => {
  // let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  let response = await axios.get("https://co-ping.herokuapp.com/pings", {
    headers: headers,
  });
  return dispatch({
    type: GET_TRIP_LIST,
    payload: { trips: response.data.pings, tripMessage: response.data.message },
  });
};

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

const acceptRequest = async (id, dispatch) => {
  let response = await axios.put("https://co-ping.herokuapp.com/pongs",
  {
    params: {
      ping_id: id,
      status: "accepted"
    }
  },
  {
    headers: headers,
  });
  dispatch({
    type: PONG_STATUS,
    payload: {
      myPongs: response.data.pongs,
    },
  });
}

export { fetchTrips, getInformation, acceptRequest };
