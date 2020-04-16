import axios from "axios";
import { GET_TRIP_DETAILS, GET_TRIP_REQUEST_DETAILS } from "../state/actions/actionTypes";

const fetchMyPing = async (dispatch) => {
  debugger
  const userId = useSelector((state) => state.userId);
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  let response = await axios.get(`https://co-ping.herokuapp.com/pings/${userId}`, 
  {
    headers: headers,
  });
  return dispatch({
    type: GET_TRIP_DETAILS,
    payload: { userTrip: response.data.pings, userTripMessage: response.data.message },
  });
  
}

const fetchPongsToMyPing = async (dispatch) => {
  debugger
  const userTrip = useSelector((state) => state.userTrip);
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  let response = await axios.get(`https://co-ping.herokuapp.com/pongs/${userTrip.id}`, 
  {
    headers: headers,
  });
  return dispatch({
    type: GET_TRIP_REQUEST_DETAILS,
    payload: { myPongs: response.data.pongs, myPongsMessage: response.data.message },
  });
}

export default {fetchMyPing, fetchPongsToMyPing}
