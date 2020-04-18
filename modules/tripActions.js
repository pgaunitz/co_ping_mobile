import axios from "axios";
import {
  GET_TRIP_LIST,
  GET_TRIP_DETAILS,
  GET_TRIP_REQUEST_DETAILS,
  PONG_STATUS,
} from "../state/actions/actionTypes";

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

const getInformation = async (userId, dispatch) => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  let pingResponse = await axios.get(`https://co-ping.herokuapp.com/pings/${userId}`, {
    headers: headers,
  });
  if (pingResponse.data.ping) {
    dispatch({
      type: GET_TRIP_DETAILS,
      payload: {
        userTrip: pingResponse.data.ping,
        myPongs: pingResponse.data.ping.pongs,
        noPongsMessage: "",
      },
    });
  } else {
    dispatch({
      type: GET_TRIP_DETAILS,
      payload: {
        noPongsMessage: pingResponse.data.message,
      },
    });
  }
};

const acceptRequest = async (pingId, pong_id, dispatch) => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  let response = await axios.put(
    `https://co-ping.herokuapp.com/pongs/${pong_id}`,
    {
      pong: {
        ping_id: pingId,
        status: 'accepted',
      },
    },
    {
      headers: headers,
    }
  );
  dispatch({
    type: PONG_STATUS,
    payload: {
      myPongs: response.data.ping.pongs,
    },
  });
};

const rejectRequest = async (pingId, pong_id, dispatch) => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  let response = await axios.put(
    `https://co-ping.herokuapp.com/pongs/${pong_id}`,
    {
      pong: {
        ping_id: pingId,
        status: "rejected",
      },
    },
    {
      headers: headers,
    }
  );
  dispatch({
    type: PONG_STATUS,
    payload: {
      myPongs: response.data.ping.pongs,
    },
  });
};

export { fetchTrips, getInformation, acceptRequest, rejectRequest };
