import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { sendRequest } from "modules/requestActions";

const RequestForm = () => {
  const dispatch = useDispatch();
  const selectedTripId = useSelector((state) => state.selectedTripId);
  const userId = useSelector((state) => state.userId);

  const [itemOne, onChangeItemOne] = useState("");
  const [itemTwo, onChangeItemTwo] = useState("");
  const [itemThree, onChangeItemThree] = useState("");

  return (
    <View style={styles.requestPage} nativeID="request-form">
      <TextInput
        placeholder="First item..."
        style={styles.itemInput}
        id="item-one"
        value={itemOne}
        onChangeText={(itemOne) => onChangeItemOne(itemOne)}
      />
      <TextInput
        placeholder="Second item..."
        style={styles.itemInput}
        id="item-two"
        value={itemTwo}
        onChangeText={(itemTwo) => onChangeItemTwo(itemTwo)}
      />
      <TextInput
        placeholder="Third item..."
        style={styles.itemInput}
        id="item-three"
        value={itemThree}
        onChangeText={(itemThree) => onChangeItemThree(itemThree)}
      />
      <TouchableHighlight
        style={styles.button}
        onPress={(e) => {
          sendRequest(
            e,
            itemOne,
            itemTwo,
            itemThree,
            selectedTripId,
            userId,
            dispatch
          );
        }}
      >
        <Text id="submit-request" style={styles.buttonText}>
          Submit
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  itemInput: {
    textAlign: "left",
    width: "80%",
    fontSize: 18,
    padding: 18,
    margin: 2,
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
  },
  responseMessage: {
    color: "white",
    fontSize: 20,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
  },
  button: {
    width: "80%",
    borderRadius: 10,
    backgroundColor: "#71B280",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    shadowColor: "#134e5e",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
  },
  requestPage: {
    alignItems: "center",
  },
});

export default RequestForm;
