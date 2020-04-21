import React, { useState } from "react"
import { LinearGradient } from "expo-linear-gradient"
import { TouchableHighlight, View, StyleSheet, Text, TextInput } from "react-native"
import { sendCommunityCode } from "../modules/signUp"
import { useSelector, useDispatch } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();
  const [code, onChangeCode] = useState();

  return (
    <View style={styles.mainpage}>
      <LinearGradient
        colors={["#71b280", "#134e5e"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.title}>Sign up</Text>

        <TextInput
          placeholder="Enter community code here"
          id="secret-code"
          style={styles.dataInput}
          value={code}
          onChangeText={code => onChangeCode(code)}
        />
        <TouchableHighlight
          style={styles.request}
          onPress={() => {
            sendCommunityCode(code, dispatch);
          }}
        >
          <Text id="code-submit-button" style={styles.requestButtonText}>
            Submit code
            </Text>
        </TouchableHighlight>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  mainpage: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    marginBottom: 20,
    marginTop: 50
  },
  dataInput: {
    border: 1,
    backgroundColor: "white",
    color: "black",
    marginLeft: "auto",
    marginRight: "auto",
    width: 200,
    padding: 10,
    borderRadius: 3
  },
  request: {
    borderRadius: 10,
    backgroundColor: "#71B280",
    marginTop: 15,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    width: "40%",
    justifyContent: "center",
    alignItems: "center"
  },
})

export default SignUp
