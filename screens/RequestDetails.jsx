import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getRequestInformation } from "../modules/tripActions";
import { Icon } from "react-native-elements";

const RequestDetails = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    getRequestInformation(userId, dispatch);
  }, []);

  const myPong = useSelector((state) => state.myPong);

  return (
    <View style={styles.container} className="request-form">
      <LinearGradient
        colors={["#71b280", "#134e5e"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.title}>My Current Pong</Text>
        <View style={styles.pong}>
          <Text style={styles.status}>Your request is {myPong.status}</Text>
          <View style={styles.itemContainer}>
            <Icon name="ios-cart" type="ionicon" />
            <Text style={styles.item}>{myPong.item1}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Icon name="ios-cart" type="ionicon" />
            <Text style={styles.item}>{myPong.item2}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Icon name="ios-cart" type="ionicon" />
            <Text style={styles.item}>{myPong.item3}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={styles.cancelButton}
              onPress={() => {
                cancelRequest(myPong.id, dispatch);
              }}
            >
              <Text
                id={"cancel-button"}
                style={styles.requestButtonText}
              >
                Cancel Pong Request
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    margin: 10,
  },
  pong: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 2.0,
  },
  item: {
    fontSize: 18,
    margin: 10,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "left",
    marginLeft: 15,
  },
  status: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    height: 30,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#B27183",
    marginTop: 15,
    margin: 5,
    paddingTop: 16,
    paddingBottom: 18,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  requestButtonText: {
    color: "white",
    fontSize: 12,
  },
  // trip: {
  //   color: "white",
  //   margin: 10,
  //   textAlign: "center",
  //   fontSize: 18,
  // },
});

export default RequestDetails
