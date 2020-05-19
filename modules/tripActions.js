import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';

import {
  GET_TRIP_LIST,
  GET_TRIP_DETAILS,
  PONG_STATUS,
  GET_REQUEST_DETAILS
} from "state/actions/actionTypes";

const storage = AsyncStorage

const fetchTrips = async dispatch => {
  let headers = JSON.parse(await storage.getItem("auth-storage"));
  let response = await axios.get("https://co-ping.herokuapp.com/pings", {
    headers: headers
  });
  return dispatch({
    type: GET_TRIP_LIST,
    payload: { trips: response.data.pings, tripMessage: response.data.message }
  });
};

const getTripInformation = async (userId, dispatch) => {
  let headers = JSON.parse(await storage.getItem("auth-storage"));
  let pingResponse = await axios.get(
    `https://co-ping.herokuapp.com/pings/${userId}`,
    {
      headers: headers
    }
  );
 if (pingResponse.data.ping) {
    dispatch({
      type: GET_TRIP_DETAILS,
      payload: {
        userTrip: pingResponse.data.ping,
        myPongs: pingResponse.data.ping.pongs,
        noPongsMessage: ""
      }
    });
  } else {
    dispatch({
      type: GET_TRIP_DETAILS,
      payload: {
        emptyPingId: pingResponse.data.ping_id,
        noPongsMessage: pingResponse.data.message
      }
    });
  }
};

const acceptRequest = async (pingId, pongId, dispatch) => {
  let headers = JSON.parse(await storage.getItem("auth-storage"));
  let response = await axios.put(
    `https://co-ping.herokuapp.com/pongs/${pongId}`,
    {
      pong: {
        ping_id: pingId,
        status: "accepted"
      }
    },
    {
      headers: headers
    }
  );
  dispatch({
    type: PONG_STATUS,
    payload: {
      myPongs: response.data.ping.pongs
    }
  });
};

const rejectRequest = async (pingId, pongId, dispatch) => {
  let headers = JSON.parse(await storage.getItem("auth-storage"));
  let response = await axios.put(
    `https://co-ping.herokuapp.com/pongs/${pongId}`,
    {
      pong: {
        ping_id: pingId,
        status: "rejected"
      }
    },
    {
      headers: headers
    }
  );
  dispatch({
    type: PONG_STATUS,
    payload: {
      myPongs: response.data.ping.pongs
    }
  });
};

const getRequestInformation = async (userId, dispatch) => {
  let headers = JSON.parse(await storage.getItem("auth-storage"));
  let pongResponse = await axios.get(
    `https://co-ping.herokuapp.com/pongs/${userId}`,
    {
      headers: headers
    }
  );
  if (pongResponse.data.pong) {
  dispatch({
    type: GET_REQUEST_DETAILS,
    payload: {
      myPong: pongResponse.data.pong,
      cancelledRequestResponse: ""
    }
  });
} else {
  dispatch({
    type: GET_REQUEST_DETAILS,
    payload: {
      myPongMessage: pongResponse.data.message
    }
  });
}
};

const cancelRequest = async (pongId, dispatch) => {
  let headers = JSON.parse(await storage.getItem("auth-storage"));
  let response = await axios.delete(
    `https://co-ping.herokuapp.com/pongs/${pongId}`,
    {
      headers: headers
    }
  );
  dispatch({
    type: PONG_STATUS,
    payload: {
      // myPongs: {},
      cancelledRequestResponse: response.data.message
    }
  });
};

const closeTrip = async (pingId, userId, dispatch) => {
  let headers = JSON.parse(await storage.getItem("auth-storage"));
  let response = await axios.put(
    `https://co-ping.herokuapp.com/pings/${pingId}`,
    {
      ping: {
        active: false,
        user_id: userId
      }
    },
    {
      headers: headers
    }
  );
  dispatch({
    type: GET_TRIP_DETAILS,
    payload: {
      closeTripMessage: response.data.message
    }
  });
};

const completeTrip = async (pingId, dispatch) => {
  let headers = JSON.parse(await storage.getItem("auth-storage"));
  let response = await axios.put(
    `https://co-ping.herokuapp.com/pings/${pingId}`,
    {
      ping: {
        completed: true
      }
    },
    {
      headers: headers
    }
  );
  dispatch({
    type: GET_TRIP_DETAILS,
    payload: {
      completeTripMessage: response.data.message
    }
  });
};

export {
  fetchTrips,
  getTripInformation,
  getRequestInformation,
  acceptRequest,
  rejectRequest,
  cancelRequest,
  closeTrip,
  completeTrip
};
