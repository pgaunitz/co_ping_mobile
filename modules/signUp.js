import axios from "axios";
import Auth from 'modules/authenticationHelpers'
import AsyncStorage from "@react-native-community/async-storage"

import { SIGN_UP, AUTHENTICATE } from "state/actions/actionTypes";

const auth = new Auth({
  host: "https://co-ping.herokuapp.com",
});
const storage = AsyncStorage

const sendCommunityCode = async (code, dispatch) => {
  let response = await axios.get("https://co-ping.herokuapp.com/communities/", {
    params: {
      q: code,
    },
  });
  if (response.data.community_id) {
    dispatch({
      type: SIGN_UP,
      payload: {
        communityId: response.data.community_id,
      },
    });
  } else {
    dispatch({
      type: SIGN_UP,
      payload: {
        codeErrorMessage: response.data.message,
      },
    });
  }
};

const sendSignUp = async (
  name,
  email,
  password,
  passwordConfirmation,
  communityId,
  phoneNumber,
  address,
  dispatch,
  navigate
) => {
  try {
    let response = await auth.signUp(
      {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
        community_id: communityId,
        phone_number: phoneNumber,
        address: address,
        name: name,
      },
    );
  
    await storage.setItem("auth-storage", JSON.stringify(response.headers));
    dispatch({
      type: AUTHENTICATE,
      payload: {
        authenticated: true,
        userEmail: response.data.data.email,
        userName: response.data.data.name,
        userId: response.data.data.id,
        loginMessage: `Welcome ${response.data.data.name}`,
        logoutMessage: "",
        showLoginForm: false,
        communityId: response.data.data.community_id,
        communityStatus: response.data.data.community_status,
      },
    });
    navigate("Home", { name: "Home" });
  } catch (error) {
    let errorMessage = error.response.data.errors[0];
    dispatch({ type: AUTHENTICATE, payload: { signupMessage: errorMessage } });
  }
};

export { sendCommunityCode, sendSignUp };
