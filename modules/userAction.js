import axios from "axios";
import { AUTHENTICATE } from "../state/actions/actionTypes";

const updateProfileInformation = async (
  name,
  address,
  telephone,
  about,
  userId,
  dispatch
) => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  let response = await axios.put(
    `https://co-ping.herokuapp.com/profiles/${userId}`,
    {
      profile: {
        user_id: userId,
        name: name,
        phone_number: telephone,
        address: address,
        about_me: about
      }
    },
    {
      headers: headers
    }
  );
  dispatch({
    type: AUTHENTICATE,
    payload: {
      userName: response.data.name,
      phone: response.data.phone_number,
      userAddress: response.data.address,
      aboutMe: response.data.about_me,
      updateProfileMessage: "Your profile has been updated"
    }
  });
};

export { updateProfileInformation };
