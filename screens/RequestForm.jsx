import React, { useState } from "react"
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
} from "react-native"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { NEW_REQUEST } from "../state/actions/actionTypes"

const RequestForm = () => {
  const dispatch = useDispatch()
  const selectedTripId = useSelector(
    (state) => state.selectedTripId
  )
  const userId = useSelector((state) => state.userId)
  const newRequestCreatedMessage = useSelector(
    (state) => state.newRequestCreatedMessage
  )
  const [itemOne, onChangeItemOne] = useState("")
  const [itemTwo, onChangeItemTwo] = useState("")
  const [itemThree, onChangeItemThree] = useState("")

  let headers = JSON.parse(
    localStorage.getItem("J-tockAuth-Storage")
  )
  const sendRequest = async (e) => {
    e.preventDefault()
    let response = await axios.post(
      "https://co-ping.herokuapp.com/pongs",
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
    )
    dispatch({
      type: NEW_REQUEST,
      payload: {
        newRequestCreatedMessage: response.data.message,
      },
    })
  }

  return (
    <View
      style={styles.requestPage}
      className="request-form">
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
        onChangeText={(itemThree) =>
          onChangeItemThree(itemThree)
        }
      />
      <TouchableHighlight
        style={styles.button}
        onPress={(e) => {
          sendRequest(e)
        }}>
        <Text id="submit-request" style={styles.buttonText}>
          Submit
        </Text>
      </TouchableHighlight>
    </View>
  )
}

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
    fontWeight: "thin",
    fontFamily: "Futura-Medium",
  },
  responseMessage: {
    color: "white",
    fontSize: 20,
    fontWeight: "thin",
    fontFamily: "Futura-Medium",
  },
  button: {
    width: "80%",
    borderRadius: 10
    ,
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
    fontWeight: "thin",
    fontFamily: "Futura-Medium",
  },
  requestPage: {
    alignItems: "center"
  }
})

export default RequestForm
