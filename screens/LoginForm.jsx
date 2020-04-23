import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_LOGIN_FORM, LOADING } from "../state/actions/actionTypes";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { onLogin } from "../modules/authentication";
import SignUp from "./SignUp";
import LoadingLittleGuy from "./LoadingLittleGuy";

const Stack = createStackNavigator();

const LoginForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const showLoginForm = useSelector((state) => state.showLoginForm);
  const loginMessage = useSelector((state) => state.loginMessage);
  const userId = useSelector((state) => state.userId);
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  return (
    <View>
      {showLoginForm && (
        <Modal
          style={styles.formModal}
          fullScreen={true}
          animationType="fade"
          transparent={true}
          visible={true}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.modalView} id="login-form">
            <Text style={styles.modalText}>Login</Text>
            <TextInput
              placeholder="Email"
              style={styles.loginInput}
              id="email"
              value={email}
              onChangeText={(email) => onChangeEmail(email)}
            />
            <TextInput
              secureTextEntry={true}
              placeholder="Password"
              style={styles.loginInput}
              id="password"
              value={password}
              onChangeText={(password) => onChangePassword(password)}
            />
            <View style={styles.itemContainer}>
              <TouchableHighlight
                style={styles.button}
                onPress={(e) => {
                  onLogin(email, password, dispatch);
                  dispatch({ type: LOADING, payload: { loading: "true" } });
                }}
              >
                <Text id="submit-login" style={styles.buttonText}>
                  Log in
                </Text>
              </TouchableHighlight>
            </View>
            <TouchableHighlight
              style={styles.closeButton}
              onPress={() => dispatch({ type: CLOSE_LOGIN_FORM })}
            >
              <Text id="close-login-form" style={styles.buttonText}>
                Close
              </Text>
            </TouchableHighlight>
            {!userId && <LoadingLittleGuy />}
            <Text id="login-error-message">{loginMessage}</Text>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formModal: {
    alignSelf: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Futura-Medium",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "thin",
    fontFamily: "Futura-Medium",
  },
  loginInput: {
    textAlign: "left",
    fontSize: 18,
    padding: 18,
    margin: 2,
    fontWeight: "thin",
    fontFamily: "Futura-Medium",
  },
  closeButton: {
    borderRadius: 5,
    backgroundColor: "#134e5e",
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 35,
  },
  button: {
    borderRadius: 5,
    backgroundColor: "#71B280",
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 35,
    marginRight: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Futura-Medium",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
});

export default LoginForm;
