import JtockAuth from "j-tockauth";
import { AUTHENTICATE } from "../state/actions/actionTypes";
import {useDispatch} from "react-redux"

const auth = new JtockAuth({
  host: "https://co-ping.herokuapp.com/"
});

const onLogin = async (email, password) => {
  const dispatch = useDispatch()
  try {
    event.preventDefault();
    let response = await auth.signIn(
      event.target.email.value,
      event.target.password.value
    );
    dispatch({
      type: AUTHENTICATE,
      payload: {
        authenticated: true,
        userEmail: response.data.email,
        userName: response.data.name,
        loginMessage: `Welcome back ${response.data.name}`,
        showLoginForm: false
      }
    });
  } catch (error) {
    let errorMessage = error.response.data.errors[0];
    dispatch({ type: AUTHENTICATE, payload: { loginMessage: errorMessage } });
  }
};

const onLogout = dispatch => {
  auth.signOut().then(() => {
    dispatch({
      type: AUTHENTICATE,
      payload: {
        authenticated: false,
        userEmail: null,
        userName: null,
        logoutMessage: "Hasta la vista!",
        loginMessage: ""
      }
    });
  });
};

export { onLogin, onLogout };