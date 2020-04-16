import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  StyleSheet,
  Text,
  FlatList
} from "react-native";
import { useSelector, useDispatch } from "react-redux";


const RequestList = () => {
  const dispatch = useDispatch()

  const userId = useSelector((state) => state.userId);
  const myPongs = useSelector((state) => state.myPongs)
  const myPongsMessage = useSelector((state) => state.myPongsMessage)

  function Item({ id, requesterName, requestedItemOne, requestedItemTwo, requestedItemThree, acceptButton, rejectButton }) {
    return (
      <View style={styles.pong}>

        <Text style={styles.name}>{requesterName}</Text>
        <Text style={styles.itemOne}>{requestedItemOne}</Text>
        <Text style={styles.itemTwo}>{requestedItemTwo}</Text>
        <Text style={styles.itemThree}>{requestedItemThree}</Text>
        <TouchableHighlight
          style={styles.request}
          onPress={() => {
            dispatch(acceptRequest(id))
          }}
        >
          <Text id="accept-button" style={styles.requestButtonText}>
            {acceptButton}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.request}
          onPress={() => {
            dispatch(rejectRequest(id))
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
        <FlatList
          data={myPongs}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              name={item.user_name}
              itemOne={item.itemOne}
              itemTwo={item.itemTwo}
              itemThree={item.itemThree}
              acceptButton="Of course!"
              rejectButton="Sorry, not this time"
            />
          )}
          keyExtractor={item => item.id}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  // trip: {
  //   padding: 10,
  //   margin: 10,
  //   borderRadius: 5,
  //   backgroundColor: "white",
  //   shadowColor: "black",
  //   shadowOpacity: 2.0
  // },
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
    alignItems: "center"
  },
  buttonText: {
    color: "#black",
    fontSize: 20,
    fontWeight: "600"
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
    alignItems: "center"
  },
  requestButtonText: {
    color: "#black",
    fontSize: 15
  }
});

export default RequestList;
