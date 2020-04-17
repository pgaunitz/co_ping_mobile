import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Text, FlatList, TouchableHighlight } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { GET_TRIP_DETAILS, GET_TRIP_REQUEST_DETAILS } from "../state/actions/actionTypes";
import { getInformation } from "../modules/tripActions"

const RequestList = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userId);

  // const [userTripState, setUserTrip] = useState({})
  // const [userTripMessage, setUserTripMessage] = useState("")
  // const [myPongs, setMyPongs] = useState([])
  // const [myPongsMessage, setMyPongsMessage] = useState("")


  useEffect(() => {
    getInformation(userId,  dispatch);
  }, []);

  const myPongs = useSelector((state) => state.myPongs);
  const myPongsMessage = useSelector((state) => state.myPongsMessage);
  const userTrip = useSelector((state) => state.userTrip);

  function Item({
    id,
    name,
    itemOne,
    itemTwo,
    itemThree,
    acceptButton,
    rejectButton,
  }) {
    return (
      <View style={styles.pong}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.item}>{itemOne}</Text>
        <Text style={styles.item}>{itemTwo}</Text>
        <Text style={styles.item}>{itemThree}</Text>
        <TouchableHighlight
          style={styles.request}
          onPress={() => {
            dispatch(acceptRequest(id));
          }}
        >
          <Text id="accept-button" style={styles.requestButtonText}>
            {acceptButton}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.request}
          onPress={() => {
            dispatch(rejectRequest(id));
          }}
        >
          <Text id="reject-button" style={styles.requestButtonText}>
            {rejectButton}
          </Text>
          
        </TouchableHighlight>
      </View>
    );
  }

  return (
    <View style={styles.container} className="request-form">
      <LinearGradient
        colors={["#71b280", "#134e5e"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        {/* <Text style={styles.title}>My Current Trip</Text>
        <Text>{userTrip.store}: {userTrip.time}</Text> */}
        <FlatList
          data={myPongs}
          renderItem={({ item }) => (
            <Item
              id={item.ping_id}
              name={item.user_name}
              itemOne={item.item1}
              itemTwo={item.item2}
              itemThree={item.item3}
              acceptButton="Of course!"
              rejectButton="Sorry, not this time"
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    margin: 10
  },
  pong: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 2.0
  },
  // tripNote: {
  //   fontSize: 25,
  //   color: "white",
  //   margin: 20,
  //   textAlign: "center"
  // },
  button: {
    height: 60,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#71B280",
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#black",
    fontSize: 20,
    fontWeight: "600",
  },
  request: {
    height: 30,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#71B280",
    marginTop: 15,
    margin: 5,
    paddingTop: 16,
    paddingBottom: 18,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  requestButtonText: {
    color: "#black",
    fontSize: 15,
  },
});

export default RequestList;
