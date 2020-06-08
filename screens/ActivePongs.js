import React from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { cancelRequest } from "modules/requestActions";
import { Icon } from "react-native-elements";
import Receipt from "../components/Receipt";

const ActivePongs = () => {
  const dispatch = useDispatch();
  const myPong = useSelector((state) => state.myPong);
  const cancelledRequestResponse = useSelector(
    (state) => state.cancelledRequestResponse
  );

  const pongStatus = myPong.status;

  let statusColor;
  if (pongStatus === "pending") {
    statusColor = <Text style={styles.pending}>{pongStatus}</Text>;
  } else if (pongStatus === "accepted") {
    statusColor = <Text style={styles.accepted}>{pongStatus}</Text>;
  } else {
    statusColor = <Text style={styles.rejected}>{pongStatus}</Text>;
  }

  return (
    <View style={styles.pong}>
      <View style={styles.statusContainer}>
        <Text style={styles.status}>Your request is </Text>
        {statusColor}
      </View>
      <Text>Your neighbours number: {myPong.ping_phone}</Text>
      <View style={styles.itemContainer}>
        <Icon name="ios-cart" type="ionicon" />
        <Text style={styles.item}>{myPong.item1}</Text>
      </View>
      <View style={styles.itemContainer}>
        {myPong.item2 !== "" && <Icon name="ios-cart" type="ionicon" />}
        <Text style={styles.item}>{myPong.item2}</Text>
      </View>
      <View style={styles.itemContainer}>
        {myPong.item3 !== "" && <Icon name="ios-cart" type="ionicon" />}
        <Text style={styles.item}>{myPong.item3}</Text>
      </View>
      <Receipt />
      <View style={styles.buttonContainer}>
        {cancelledRequestResponse ? (
          <Text id="cancel-message">{cancelledRequestResponse}</Text>
        ) : (
          pongStatus !== "accepted" && (
            <TouchableHighlight
              style={styles.cancelButton}
              onPress={() => {
                cancelRequest(myPong.id, dispatch);
              }}
            >
              <Text id={"cancel-button"} style={styles.cancelButtonText}>
                Cancel Pong Request
              </Text>
            </TouchableHighlight>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pong: {
    padding: 15,
    margin: 15,
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 2.0,
    height: 350,
  },
  item: {
    fontSize: 18,
    margin: 10,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    height: 40,
    borderRadius: 10,
    backgroundColor: "#B27183",
    marginTop: 15,
    margin: 5,
    paddingTop: 10,
    paddingBottom: 10,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
  },
  statusContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pending: {
    color: "#d27300",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 18,
    fontFamily: "Futura-Medium",
  },
  accepted: {
    color: "#71b280",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 18,
    fontFamily: "Futura-Medium",
  },
  rejected: {
    color: "#B27183",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 18,
    fontFamily: "Futura-Medium",
  },
  status: {
    fontSize: 18,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
  },
});

export default ActivePongs;
