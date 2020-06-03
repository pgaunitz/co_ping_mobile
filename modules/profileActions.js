import axios from "axios"
import { AUTHENTICATE, PROFILE_INFO } from "state/actions/actionTypes"
import AsyncStorage from '@react-native-community/async-storage';

const storage = AsyncStorage

const updateProfileInformation = async (
  name,
  address,
  telephone,
  about,
  userId,
  dispatch
) => {
  let headers = JSON.parse(await storage.getItem("auth-storage"));
  let response = await axios.put(
    `https://co-ping.herokuapp.com/profiles/${userId}`,
    {
      profile: {
        name: name,
        phone_number: telephone,
        address: address,
        about_me: about,
      },
    },
    {
      headers: headers,
    }
  )
  dispatch({
    type: AUTHENTICATE,
    payload: {
      userName: response.data.name,
      phone: response.data.phone_number,
      userAddress: response.data.address,
      aboutMe: response.data.about_me,
      updateProfileMessage: "Your profile has been updated",
    },
  })
}

const getProfileInformation = async (userId, dispatch) => {
  let headers = JSON.parse(await storage.getItem("auth-storage"));
  let response = await axios.get(
    `https://co-ping.herokuapp.com/profiles/${userId}`,
    {
      headers: headers,
    }
  )
  dispatch({
    type: PROFILE_INFO,
    payload: {
      userName: response.data.user.name,
      phone: response.data.user.phone_number,
      userAddress: response.data.user.address,
      aboutMe: response.data.user.about_me
    },
  })
}

export { updateProfileInformation, getProfileInformation }
