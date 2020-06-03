import React, { useState } from "react";
import { TouchableHighlight, StyleSheet, Text, TextInput } from "react-native";
import { sendCommunityCode } from "modules/signUp";
import { useDispatch } from "react-redux";

const SignUpCommunityCode = () => {
  const dispatch = useDispatch();
  const [code, onChangeCode] = useState();

  return (
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
          sendCommunityCode(code, dispatch);
          onChangeCode("");
        }}
      >
        <Text id="code-submit-button" style={styles.requestButtonText}>
          Submit code
        </Text>
      </TouchableHighlight>
    </>
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
});

export default SignUpCommunityCode;
