import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TextInput,
  View,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { CLOSE_NEW_TRIP_FORM } from "state/actions/actionTypes";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { createNewTrip } from "modules/tripActions";

const NewTripForm = () => {
  const dispatch = useDispatch();
  const showTripForm = useSelector((state) => state.showTripForm);
  const newTripCreatedMessage = useSelector(
    (state) => state.newTripCreatedMessage
  );
  const userId = useSelector((state) => state.userId);
  const [date, setDate] = useState("");
  const [dateMessage, setDateMessage] = useState("");
  const [storevalue, onChangeStore] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(`${date}`);
    setDateMessage(`You're shopping on: ${date}`);
    hideDatePicker();
  };

  return (
    <>
      <View>
        {showTripForm && (
          <Modal
            style={styles.formModal}
            presentationStyle="overFullScreen"
            animationType="fade"
            transparent={true}
            visible={true}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.modalView} id="trip-form">
              <Text style={styles.modalText}>Shopping Trip Details</Text>
              <TextInput
                placeholder="Store"
                style={styles.storeInput}
                id="store"
                value={storevalue}
                onChangeText={(store) => onChangeStore(store)}
              />
              <Button
                title="Set the Shopping Time"
                style={styles.button}
                onPress={showDatePicker}
              />
              <TextInput style={styles.dateInput} id="date" value={date} />
              <View style={styles.buttonContainer}>
                <TouchableHighlight
                  style={styles.button}
                  onPress={(e) => {
                    createNewTrip(e, userId, storevalue, date, dispatch);
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
              </View>
              <Text id="new-trip-message" style={styles.messageText}>
                {newTripCreatedMessage}
              </Text>
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              locale="en_GB"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </Modal>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  formModal: {
    alignSelf: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    height: "43%",
    marginTop: "50%",
    alignItems: "center",
    shadowColor: "#134e5e",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 50,
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Futura-Medium",
  },
  modalText: {
    marginBottom: 25,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    paddingTop: 35,
    paddingHorizontal: 35,
    fontFamily: "Futura-Medium",
  },
  dateInput: {
    textAlign: "left",
    fontSize: 18,
    paddingHorizontal: 25,
    marginTop: 10,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
  },
  storeInput: {
    textAlign: "left",
    fontSize: 18,
    padding: 15,
    margin: 2,
    fontWeight: "300",
    fontFamily: "Futura-Medium",
  },
  button: {
    borderRadius: 5,
    backgroundColor: "#71B280",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: 90,
    height: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Futura-Medium",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 40,
  },
  messageText: {
    fontFamily: "Futura-Medium",
    marginTop: 45,
    padding: 10,
    textAlign: "center",
    color: "#B27183",
  },
});

export default NewTripForm;
