import JtockAuth from "j-tockauth";
import { AUTHENTICATE } from "../state/actions/actionTypes";

const auth = new JtockAuth({
  host: "http://localhost:3000",
});

const onLogin = async (email, password, dispatch) => {
  try {
    event.preventDefault();
    let response = await auth.signIn(email, password);
    debugger
    dispatch({
      type: AUTHENTICATE,
      payload: {
        authenticated: true,
        userEmail: response.data.email,
        userName: response.data.name,
        userId: response.data.id,
        loginMessage: `Welcome back ${response.data.name}`,
        logoutMessage: "",
      },
    });
  } catch (error) {
    debugger
    let errorMessage = error.response.data.errors[0];

    dispatch({ type: AUTHENTICATE, payload: { loginMessage: errorMessage } });
  }
};

const onLogout = (dispatch) => {
  auth.signOut().then(() => {
    dispatch({
      type: AUTHENTICATE,
      payload: {
        authenticated: false,
        userEmail: null,
        userName: null,
        logoutMessage: "Hasta la vista!",
        loginMessage: "",
      },
    });
  });
};

export { onLogin, onLogout };
