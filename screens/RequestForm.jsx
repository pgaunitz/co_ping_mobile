import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios"
import {NEW_REQUEST} from "../state/actions/actionTypes"

const RequestForm = () => {
  const dispatch = useDispatch()
  const selectedTripId = useSelector((state) => state.selectedTripId);
  const userId = useSelector((state) => state.userId);
  const newRequestCreatedMessage = useSelector(
    (state) => state.newRequestCreatedMessage
  );
  const [itemOne, onChangeItemOne] = useState("");
  const [itemTwo, onChangeItemTwo] = useState("");
  const [itemThree, onChangeItemThree] = useState("");
  let tripId = selectedTripId;
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  const sendRequest = async (e) => {
    e.preventDefault();
    let response = await axios.post(
      "http://localhost:3000/pongs",
      {
        pong: {
          item1: itemOne,
          item2: itemTwo,
          item3: itemThree,
          ping_id: selectedTripId,
          user_id: userId,
        },
      },
      { headers: headers }
    );
    debugger
    if (response.status == 200){
    dispatch({
      type: NEW_REQUEST,
      payload: { newRequestCreatedMessage: response.data.message },
    })
  } else {
    dispatch({
      type: NEW_REQUEST,
      payload: { newRequestCreatedMessage: response.data.message },
    })
    debugger
  }
  };
  return (
    <View style={styles.requestPage} className="request-form">
      <LinearGradient
        colors={["#71b280", "#134e5e"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <Text>Trip Request</Text>
        <Text id="request-message">{newRequestCreatedMessage}</Text>
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
            sendRequest(e);
          }}
        >
          <Text id="submit-request" style={styles.buttonText}>
            Submit
          </Text>
        </TouchableHighlight>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  requestPage: {
    flex: 1,
  },
  itemInput: {
    textAlign: "left",
    fontSize: 18,
    padding: 18,
    margin: 2,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
  },
});

export default RequestForm;
