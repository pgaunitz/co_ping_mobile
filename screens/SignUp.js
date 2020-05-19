import React, { useState } from "react"
import { LinearGradient } from "expo-linear-gradient"
import {
  TouchableHighlight,
  View,
  StyleSheet,
  Text,
  TextInput,
} from "react-native"
import {
  sendCommunityCode,
  sendSignUp,
} from "modules/signUp"
import { useSelector, useDispatch } from "react-redux"

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch()
  const communityId = useSelector(
    (state) => state.communityId
  )
  const codeErrorMessage = useSelector(
    (state) => state.codeErrorMessage
  )
  const loginMessage = useSelector(
    (state) => state.loginMessage
  )
  const [code, onChangeCode] = useState()
  const [name, onChangeName] = useState()
  const [email, onChangeEmail] = useState()
  const [password, onChangePassword] = useState()
  const [
    passwordConfirmation,
    onChangePasswordConfirmation,
  ] = useState()
  const [phoneNumber, onChangePhoneNumber] = useState()
  const [address, onChangeAddress] = useState()

  return (
    <View style={styles.mainpage}>
      <LinearGradient
        colors={["#71b280", "#134e5e"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}>
        <Text style={styles.title}>Sign up</Text>
        {!communityId && (
          <Text
            style={styles.trip}
            id="community-code-message">
            {codeErrorMessage}
          </Text>
        )}
        {communityId ? (
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
              onChangeText={(password) =>
                onChangePassword(password)
              }
            />
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={true}
              id="password-confirmation"
              style={styles.dataInput}
              value={passwordConfirmation}
              onChangeText={(passwordConfirmation) =>
                onChangePasswordConfirmation(
                  passwordConfirmation
                )
              }
            />
            <TextInput
              placeholder="Phone Number"
              id="phone-number"
              style={styles.dataInput}
              value={phoneNumber}
              onChangeText={(phoneNumber) =>
                onChangePhoneNumber(phoneNumber)
              }
            />
            <TextInput
              placeholder="Address"
              id="address"
              style={styles.dataInputText}
              value={address}
              multiline={true}
              maxLength={250}
              onChangeText={(address) =>
                onChangeAddress(address)
              }
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
                )
              }}>
              <Text style={styles.requestButtonText}>
                Sign up
              </Text>
            </TouchableHighlight>
          </View>
        ) : (
          <>
            <TextInput
              placeholder="Enter community code here"
              id="secret-code"
              style={styles.dataInput}
              value={code}
              onChangeText={(code) => onChangeCode(code)}
            />
            <TouchableHighlight
              style={styles.request}
              onPress={() => {
                sendCommunityCode(code, dispatch)
                onChangeCode("")
              }}>
              <Text
                id="code-submit-button"
                style={styles.requestButtonText}>
                Submit code
              </Text>
            </TouchableHighlight>
          </>
        )}
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  mainpage: {
    flex: 1,
  },
  trip: {
    color: "white",
    margin: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    marginBottom: 20,
    marginTop: 50,
    fontWeight: "normal",
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
})

export default SignUp
