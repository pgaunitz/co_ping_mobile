import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Text, FlatList, TouchableHighlight } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getInformation, acceptRequest, rejectRequest  } from "../modules/tripActions"
import { CheckBox } from 'react-native-elements'


const RequestList = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    getInformation(userId, dispatch);
  }, []);

  const myPongs = useSelector((state) => state.myPongs);
  const userTrip = useSelector((state) => state.userTrip);
  const pingId = useSelector((state) => state.userTrip.id);

  function Item({
    pong_id,
    name,
    itemOne,
    itemTwo,
    itemThree,
    acceptButton,
    rejectButton,
    status
  }) {
    let pongStatus;
    if (status === "pending") {
      pongStatus = true
    } else {
      pongStatus = false
    }
    debugger
    return (
      <View style={styles.pong}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.item}>{itemOne}</Text>
        <Text style={styles.item}>{itemTwo}</Text>
        <Text style={styles.item}>{itemThree}</Text>
        <Text style={styles.item}>{status}</Text>
        {pongStatus ?
          (
            <>
              <TouchableHighlight
                style={styles.request}
                onPress={() => {
                  acceptRequest(pingId, pong_id, dispatch);
                }}>
                <Text id={`accept-button-${pong_id}`} style={styles.requestButtonText}>
                  {acceptButton}
                </Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.request}
                onPress={() => {
                  rejectRequest(pingId, pong_id, dispatch);
                }}>
                <Text id={`reject-button-${pong_id}`} style={styles.requestButtonText}>
                  {rejectButton}
                </Text>
              </TouchableHighlight>

            </>
          )
          : <Text id="accepted-action">Will do something later here</Text>
        }
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
        <Text style={styles.title}>My Current Trip</Text>
        <Text style={styles.trip}>
          Don't forget to go to {userTrip.store} at {userTrip.time}.</Text>
        <FlatList
          data={myPongs}
          renderItem={({ item }) => (
            <Item
              pong_id={item.id}
              name={item.user_name}
              itemOne={item.item1}
              itemTwo={item.item2}
              itemThree={item.item3}
              status={item.status}
              acceptButton="Of course!"
              rejectButton="Sorry, not this time"
            />
          )}
          keyExtractor={(item) => item.id}
          id="request"
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
  item: {
    fontSize: 12
  },
  name: {
    fontSize: 18,
    fontWeight: "bold"
  },
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
  trip: {
    color: "white",
    margin: 10,
    textAlign: "center",
    fontSize: 18
  }
});

export default RequestList;
