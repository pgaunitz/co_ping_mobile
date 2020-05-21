import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { PONG_STATUS, GET_REQUEST_DETAILS } from "state/actions/actionTypes";

const storage = AsyncStorage;

const acceptRequest = async (pingId, pongId, dispatch) => {
  let headers = JSON.parse(await storage.getItem("auth-storage"));
  let response = await axios.put(
    `https://co-ping.herokuapp.com/pongs/${pongId}`,
    {
      pong: {
        ping_id: pingId,
        status: "accepted",
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

const rejectRequest = async (pingId, pongId, dispatch) => {
  let headers = JSON.parse(await storage.getItem("auth-storage"));
  let response = await axios.put(
    `https://co-ping.herokuapp.com/pongs/${pongId}`,
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

const getRequestInformation = async (userId, dispatch) => {
  let headers = JSON.parse(await storage.getItem("auth-storage"));
  let pongResponse = await axios.get(
    `https://co-ping.herokuapp.com/pongs/${userId}`,
    {
      headers: headers,
    }
  );
  if (pongResponse.data.pong) {
    dispatch({
      type: GET_REQUEST_DETAILS,
      payload: {
        myPong: pongResponse.data.pong,
        cancelledRequestResponse: "",
      },
    });
  } else {
    dispatch({
      type: GET_REQUEST_DETAILS,
      payload: {
        myPongMessage: pongResponse.data.message,
      },
    });
  }
};

const cancelRequest = async (pongId, dispatch) => {
  let headers = JSON.parse(await storage.getItem("auth-storage"));
  let response = await axios.delete(
    `https://co-ping.herokuapp.com/pongs/${pongId}`,
    {
      headers: headers,
    }
  );
  dispatch({
    type: PONG_STATUS,
    payload: {
      // myPongs: {},
      cancelledRequestResponse: response.data.message,
    },
  });
};
export { getRequestInformation, acceptRequest, rejectRequest, cancelRequest };
