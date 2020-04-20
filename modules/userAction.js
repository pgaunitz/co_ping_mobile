import axios from "axios";
import { USER_PROFILE } from "../state/actions/actionTypes";

const getProfileInformation = async (userId, dispatch) => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  debugger
  let response = await axios.get(
    `https://co-ping.herokuapp.com/user/${userId}`,
    {
      headers: headers
    }
  );
  debugger
  dispatch({
    type: USER_PROFILE,
    payload: {
      userName: response.data.user.name,
      userPhone: response.data.user.phone
    }
  });
};

export { getProfileInformation }