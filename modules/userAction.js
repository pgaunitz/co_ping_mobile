import axios from "axios";
import { USER_PROFILE } from "../state/actions/actionTypes";

const updateProfileInformation = async (
  name,
  address,
  telephone,
  about,
  userId,
  dispatch
) => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  debugger
  let response = await axios.put(
    `https://co-ping.herokuapp.com/user/${userId}`,
    {
      user: {
        user_id: userId,
        name: name,
        phone_number: telephone,
        adress: address,
        about_me: about
      }
    },
    {
      headers: headers
    }
  );
  debugger
  dispatch({
    type: AUTHENTICATE,
    payload: {
      userName: response.data.name,
      phone: response.data.phone_number,
      userAddress: response.data.adress,
      aboutMe: response.data.about_me
    }
  });
};

export { updateProfileInformation };
