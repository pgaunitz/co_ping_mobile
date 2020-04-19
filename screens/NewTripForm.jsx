import React from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TextInput,
  View
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  NEW_TRIP_FORM,
  CLOSE_NEW_TRIP_FORM
} from "../state/actions/actionTypes";

const NewTripForm = () => {
  const dispatch = useDispatch();
  const showTripForm = useSelector(state => state.showTripForm);
  const userId = useSelector(state => state.userId);
  const newTripCreatedMessage = useSelector(
    state => state.newTripCreatedMessage
  );

  const [timevalue, onChangeText] = React.useState("");
  const [storevalue, onChangeStore] = React.useState("");
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  const createNewTrip = async e => {
    e.preventDefault();
    let response = await axios.post(
      "https://co-ping.herokuapp.com/pings",
      {
        ping: {
          time: timevalue,
          store: storevalue,
          user_id: userId
        }
      },
      { headers: headers }
    );
    dispatch({
      type: NEW_TRIP_FORM,
      payload: { newTripCreatedMessage: response.data.message }
    });
  };

  return (
    <View>
      {showTripForm && (
        <Modal
          style={styles.formModal}
          presentationStyle="overFullScreen"
          animationType="fade"
          transparent={false}
          visible={true}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.modalView} id="trip-form">
            <Text style={styles.modalText}>New Shopping Trip Details</Text>
            <TextInput
              placeholder="Date and Time"
              style={styles.dateInput}
              id="time"
              type="time"
              value={timevalue}
              onChangeText={time => onChangeText(time)}
            />
            <TextInput
              placeholder="Store"
              style={styles.storeInput}
              id="store"
              value={storevalue}
              onChangeText={store => onChangeStore(store)}
            />
            <TouchableHighlight
              style={styles.button}
              onPress={e => {
                createNewTrip(e);
              }}
            >
              <Text id="create-trip-button" style={styles.buttonText}>
                Create
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={() => dispatch({ type: CLOSE_NEW_TRIP_FORM })}
            >
              <Text id="close-trip-form" style={styles.buttonText}>
                Close
              </Text>
            </TouchableHighlight>
            <Text id="new-trip-message" style={styles.modelText}>
              {newTripCreatedMessage}
            </Text>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formModal: {
    alignSelf: "center"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25
  },
  dateInput: {
    textAlign: "left",
    fontSize: 18,
    padding: 18,
    margin: 2,
    borderColor: "black",
    borderWidth: 2
  },
  storeInput: {
    textAlign: "left",
    fontSize: 18,
    padding: 18,
    margin: 2,
    borderColor: "black",
    borderWidth: 2
  },
  button: {
    borderRadius: 5,
    backgroundColor: "#71B280",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  buttonText: {
    color: "#black",
    fontSize: 18,
    fontWeight: "500"
  }
});

export default NewTripForm;
