import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  getInformation,
  acceptRequest,
  rejectRequest,
} from "../modules/tripActions";
import { CheckBox, Icon } from "react-native-elements";

const RequestList = () => {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);

  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    getInformation(userId, dispatch);
  }, []);

  const checkBoy = () => {
    switch (checked) {
      case false:
        return setChecked(true);
      case true:
        return setChecked(false);
      default:
        return checked;
    }
  };

  const myPongs = useSelector((state) => state.myPongs);
  const userTrip = useSelector((state) => state.userTrip);
  const pingId = useSelector((state) => state.userTrip.id);
  const noPongsMessage = useSelector((state) => state.noPongsMessage);

  function Item({
    pong_id,
    name,
    itemOne,
    itemTwo,
    itemThree,
    acceptButton,
    rejectButton,
    status,
  }) {
    let pong;
    switch (status) {
      case "pending":
        return (pong = (
          <>
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
                    acceptRequest(pingId, pong_id, dispatch);
                  }}
                >
                  <Text
                    id={`accept-button-${pong_id}`}
                    style={styles.requestButtonText}
                  >
                    {acceptButton}
                  </Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={styles.rejectButton}
                  onPress={() => {
                    rejectRequest(pingId, pong_id, dispatch);
                  }}
                >
                  <Text
                    id={`reject-button-${pong_id}`}
                    style={styles.requestButtonText}
                  >
                    {rejectButton}
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </>
        ));
      case "accepted":
        return (pong = (
          <>
            <View style={styles.pong}>
              <Text style={styles.name}>{name}</Text>
              <CheckBox
                onPress={() => checkBoy()}
                checked={checked}
                style={styles.item}
                title={itemOne}
              />
              <CheckBox style={styles.item} title={itemTwo} />
              <CheckBox style={styles.item} title={itemThree} />
            </View>
          </>
        ));
      case "rejected":
        return (pong = <View></View>);
    }

    return <View>{pong}</View>;
  }

  let pingBoardMessage;
  if (noPongsMessage === "") {
    pingBoardMessage = (
      <Text style={styles.trip}>
        Don't forget to go to {userTrip.store} at {userTrip.time}.
      </Text>
    );
  } else {
    pingBoardMessage = <Text style={styles.trip}>{noPongsMessage}</Text>;
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

        {pingBoardMessage}

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
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    alignItems: "center",
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
    alignItems: "center",
  },
  requestButtonText: {
    color: "white",
    fontSize: 12,
  },
  trip: {
    color: "white",
    margin: 10,
    textAlign: "center",
    fontSize: 18,
  },
});

export default RequestList;
