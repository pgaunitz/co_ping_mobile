import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { GET_TRIP_LIST, GET_TRIP_DETAILS, NEW_TRIP_FORM } from "state/actions/actionTypes";

const storage = AsyncStorage;

const fetchTrips = async (dispatch) => {
  let headers = JSON.parse(await storage.getItem("auth-storage"));
  let response = await axios.get("https://co-ping.herokuapp.com/pings", {
    headers: headers,
  });
  return dispatch({
    type: GET_TRIP_LIST,
    payload: { trips: response.data.pings, tripMessage: response.data.message },
  });
};

const getTripInformation = async (userId, dispatch) => {
  let headers = JSON.parse(await storage.getItem("auth-storage"));
  let pingResponse = await axios.get(
    `https://co-ping.herokuapp.com/pings/${userId}`,
    {
      headers: headers,
    }
  );
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
        emptyPingId: pingResponse.data.ping_id,
        noPongsMessage: pingResponse.data.message,
      },
    });
  }
};

const createNewTrip = async (e, userId, storevalue, date, dispatch) => {
  let headers = JSON.parse(await storage.getItem("auth-storage"));
  e.persist();
  let response = await axios.post(
    "https://co-ping.herokuapp.com/pings",
    {
      ping: {
        time: `${new Date(date)}`,
        store: storevalue,
        user_id: userId,
      },
    },
    { headers: headers }
  );
  dispatch({
    type: NEW_TRIP_FORM,
    payload: {
      newTripCreatedMessage: response.data.message,
    },
  });
};

const closeTrip = async (pingId, userId, dispatch) => {
  let headers = JSON.parse(await storage.getItem("auth-storage"));
  let response = await axios.put(
    `https://co-ping.herokuapp.com/pings/${pingId}`,
    {
      ping: {
        active: false,
        user_id: userId,
      },
    },
    {
      headers: headers,
    }
  );
  dispatch({
    type: GET_TRIP_DETAILS,
    payload: {
      closeTripMessage: response.data.message,
    },
  });
};

const completeTrip = async (pingId, dispatch) => {
  let headers = JSON.parse(await storage.getItem("auth-storage"));
  let response = await axios.put(
    `https://co-ping.herokuapp.com/pings/${pingId}`,
    {
      ping: {
        completed: true,
      },
    },
    {
      headers: headers,
    }
  );
  dispatch({
    type: GET_TRIP_DETAILS,
    payload: {
      completeTripMessage: response.data.message,
    },
  });
};

 const sendCostInformation = async (event, pongId, pingId, totalCost, dispatch) => {
   let headers = JSON.parse(await storage.getItem("auth-storage"));
   event.persist();
   let response = await axios.put(
     `https://co-ping.herokuapp.com/pongs/${pongId}`,
     {
       pong: {
         ping_id: pingId,
         total_cost: totalCost,
       },
     },
     {
       headers: headers,
     }
   );
   dispatch({
     type: GET_TRIP_DETAILS,
     payload: {
       costSentMessage: response.data.message,
     },
   });
 };

export {
  fetchTrips,
  getTripInformation,
  createNewTrip,
  closeTrip,
  completeTrip,
  sendCostInformation,
};
