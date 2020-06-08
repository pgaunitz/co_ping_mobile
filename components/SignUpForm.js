import React, { useState } from "react";
import {
  TouchableHighlight,
  View,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { sendSignUp } from "modules/signUp";

const SignUpForm = () => {
  const communityId = useSelector((state) => state.communityId);
  const [name, onChangeName] = useState();
  const [email, onChangeEmail] = useState();
  const [password, onChangePassword] = useState();
  const [passwordConfirmation, onChangePasswordConfirmation] = useState();
  const [phoneNumber, onChangePhoneNumber] = useState();
  const [address, onChangeAddress] = useState();

  return (
    <View style={styles.dataInputContainer}>
      <TextInput
        placeholder="Name"
        id="name"
        style={styles.dataInput}
        value={name}
        onChangeText={(name) => onChangeName(name)}
      />
      <TextInput
        placeholder="Email"
        id="email"
        style={styles.dataInput}
        value={email}
        onChangeText={(email) => onChangeEmail(email)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        id="password"
        style={styles.dataInput}
        value={password}
        onChangeText={(password) => onChangePassword(password)}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry={true}
        id="password-confirmation"
        style={styles.dataInput}
        value={passwordConfirmation}
        onChangeText={(passwordConfirmation) =>
          onChangePasswordConfirmation(passwordConfirmation)
        }
      />
      <TextInput
        placeholder="Phone Number"
        id="phone-number"
        style={styles.dataInput}
        value={phoneNumber}
        onChangeText={(phoneNumber) => onChangePhoneNumber(phoneNumber)}
      />
      <TextInput
        placeholder="Address"
        id="address"
        style={styles.dataInputText}
        value={address}
        multiline={true}
        maxLength={250}
        onChangeText={(address) => onChangeAddress(address)}
      />
      <TouchableHighlight
        id="sign-up-button"
        style={styles.request}
        onPress={(event) => {
          sendSignUp(
            name,
            email,
            password,
            passwordConfirmation,
            communityId,
            phoneNumber,
            address,
            dispatch,
            navigation.navigate
          );
        }}
      >
        <Text style={styles.requestButtonText}>Sign up</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  request: {
    borderRadius: 10,
    backgroundColor: "#71B280",
    marginTop: 15,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 6,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Futura-Medium",
    shadowColor: "#134e5e",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  requestButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Futura-Medium",
  },
  dataInput: {
    backgroundColor: "white",
    color: "black",
    borderRadius: 5,
    marginLeft: "auto",
    marginRight: "auto",
    width: 200,
    padding: 10,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
  },
  dataInputText: {
    backgroundColor: "white",
    color: "black",
    marginLeft: "auto",
    marginRight: "auto",
    width: 200,
    padding: 10,
    height: 90,
  },
  dataInputContainer: {
    backgroundColor: "white",
    borderRadius: 3,
    padding: 1,
    width: "70%",
    alignSelf: "center",
    paddingVertical: 15,
  },
});

export default SignUpForm;
