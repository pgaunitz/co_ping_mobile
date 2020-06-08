import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, CheckBox } from "react-native-elements";
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { acceptRequest, rejectRequest } from "modules/requestActions";
import { sendCostInformation } from "modules/tripActions";

const PongToPingDetails = (
  pongId,
  name,
  phone,
  itemOne,
  itemTwo,
  itemThree,
  acceptButton,
  rejectButton,
  status
) => {
  let pong;
  const pingId = useSelector((state) => state.userTrip.id);
  const costSentMessage = useSelector((state) => state.costSentMessage);
  const dispatch = useDispatch();
  const [totalCost, setTotalCost] = useState();
  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);
  const [checkedThree, setCheckedThree] = useState(false);

  switch (status) {
    case "pending":
      return (
        <View style={styles.pong}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.phone}>Phone: {phone}</Text>
          <View style={styles.itemContainer}>
            <Icon name="ios-cart" type="ionicon" />
            <Text style={styles.item}>{itemOne}</Text>
          </View>
          <View style={styles.itemContainer}>
            {itemTwo !== "" && <Icon name="ios-cart" type="ionicon" />}
            <Text style={styles.item}>{itemTwo}</Text>
          </View>
          <View style={styles.itemContainer}>
            {itemThree !== "" && <Icon name="ios-cart" type="ionicon" />}
            <Text style={styles.item}>{itemThree}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={styles.acceptButton}
              onPress={() => {
                acceptRequest(pingId, pongId, dispatch);
              }}
            >
              <Text
                nativeID={`accept-button-${pongId}`}
                style={styles.requestButtonText}
              >
                {acceptButton}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.rejectButton}
              onPress={() => {
                rejectRequest(pingId, pongId, dispatch);
              }}
            >
              <Text
                nativeID={`reject-button-${pongId}`}
                style={styles.requestButtonText}
              >
                {rejectButton}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    case "accepted":
      return (
        <View style={styles.pong}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.phone}>Phone: {phone}</Text>
          <CheckBox
            style={styles.item}
            title={itemOne}
            onPress={() => {
              setCheckedOne(checkedOne === true ? false : true);
            }}
            checked={checkedOne}
          />
          {itemTwo !== "" && (
            <CheckBox
              style={styles.item}
              title={itemTwo}
              onPress={() => {
                setCheckedTwo(checkedTwo === true ? false : true);
              }}
              checked={checkedTwo}
            />
          )}
          {itemThree !== "" && (
            <CheckBox
              style={styles.item}
              title={itemThree}
              onPress={() => {
                setCheckedThree(checkedThree === true ? false : true);
              }}
              checked={checkedThree}
            />
          )}
          <View
            id={`total-cost-container-${pongId}`}
            style={styles.costContainer}
          >
            <Text style={styles.item}>Total cost: </Text>
            <TextInput
              style={styles.costInput}
              id={`total-cost-${pongId}`}
              value={totalCost}
              onChangeText={(cost) => setTotalCost(cost)}
            />
            <TouchableHighlight
              style={styles.sendButton}
              onPress={(event) => {
                sendCostInformation(event, pongId, pingId, totalCost, dispatch);
              }}
            >
              <Text style={styles.buttonText} id={`send-cost-button-${pongId}`}>
                Send
              </Text>
            </TouchableHighlight>
          </View>
          {totalCost && (
            <Text nativeID="cost-confirmation-message">{costSentMessage}</Text>
          )}
        </View>
      );
    case "rejected":
      return (pong = <View></View>);
  }
  return { pong };
};
const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    margin: 10,
  },
  pong: {
    padding: 10,
    margin: 15,
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 2.0,
  },
  item: {
    fontSize: 18,
    margin: 10,
    fontSize: 18,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    fontSize: 18,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  acceptButton: {
    height: 40,
    borderRadius: 10,
    backgroundColor: "#71B280",
    marginTop: 15,
    margin: 5,
    paddingTop: 10,
    paddingBottom: 10,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  rejectButton: {
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
  requestButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
  },
  trip: {
    color: "white",
    margin: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
  },
  costContainer: {
    flex: 1,
    flexDirection: "row",
  },
  costInput: {
    width: 90,
    fontWeight: "300",
    fontFamily: "Futura-Medium",
  },
  sendButton: {
    height: 35,
    width: 80,
    marginLeft: 15,
    borderRadius: 10,
    backgroundColor: "#71B280",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginTop: 5,
  },
});

export { PongToPingDetails };
