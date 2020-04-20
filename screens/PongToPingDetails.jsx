import React, { useState } from "react";
import { GET_TRIP_DETAILS } from "../state/actions/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import { Icon, CheckBox } from "react-native-elements";
import axios from "axios";
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  TextInput
} from "react-native";
import { acceptRequest, rejectRequest } from "../modules/tripActions";

const PongToPingDetails = (
  pongId,
  name,
  itemOne,
  itemTwo,
  itemThree,
  acceptButton,
  rejectButton,
  status
) => {
  // let pong;
  const pingId = useSelector(state => state.userTrip.id);
  const costSentMessage = useSelector(state => state.costSentMessage);
  const dispatch = useDispatch();
  const [totalCost, setTotalCost] = useState();

  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  const sendCostInformation = async (event, pongId) => {
    event.preventDefault();
    let response = await axios.put(
      `https://co-ping.herokuapp.com/pongs/${pongId}`,
      {
        pong: {
          ping_id: pingId,
          total_cost: totalCost
        }
      },
      {
        headers: headers
      }
    );
    dispatch({
      type: GET_TRIP_DETAILS,
      payload: {
        costSentMessage: response.data.message
      }
    });
  };

  switch (status) {
    case "pending":
      return (
        <View style={styles.pong}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.itemContainer}>
            <Icon name="ios-cart" type="ionicon" />
            <Text style={styles.item}>{itemOne}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Icon name="ios-cart" type="ionicon" />
            <Text style={styles.item}>{itemTwo}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Icon name="ios-cart" type="ionicon" />
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
                id={`accept-button-${pongId}`}
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
                id={`reject-button-${pongId}`}
                style={styles.requestButtonText}
              >
                {rejectButton}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      )
    case "accepted":
      return (
        <View style={styles.pong}>
         <Text style={styles.name}>{name}</Text>
            <CheckBox
            style={styles.item}
            title={itemOne}
            onPress={() => {
              isChecked();
            }}
          />
          {itemTwo !== "" && <CheckBox style={styles.item} title={itemTwo} />}
          {itemThree !== "" && <CheckBox style={styles.item} title={itemThree} />}
          <View
            id={`total-cost-container-${pongId}`}
            style={styles.costContainer}
          >
            <Text style={styles.item}>Total cost: </Text>
            <TextInput
              style={styles.costInput}
              id={`total-cost-${pongId}`}
              value={totalCost}
              onChangeText={cost => setTotalCost(cost)}
            />
            <TouchableHighlight
              style={styles.sendButton}
              onPress={event => {
                sendCostInformation(event, pongId);
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
      return  <View></View>;
  }
}
const styles = StyleSheet.create({
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
    fontSize: 18,
    margin: 10
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "left",
    marginLeft: 15
  },
  name: {
    fontSize: 18,
    fontWeight: "bold"
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  acceptButton: {
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
  rejectButton: {
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
    alignItems: "center"
  },
  requestButtonText: {
    color: "white",
    fontSize: 12
  },
  trip: {
    color: "white",
    margin: 10,
    textAlign: "center",
    fontSize: 18
  },
  buttonText: {
    color: "#black",
    fontSize: 18
  },
  costContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "left"
  },
  costInput: {
    width: 70
  },
  sendButton: {
    height: 30,
    width: 70,
    marginLeft: 15,
    borderRadius: 10,
    backgroundColor: "#71B280",
    justifyContent: "center",
    alignItems: "center"
  }
});

export { PongToPingDetails };
