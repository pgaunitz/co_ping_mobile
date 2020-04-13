import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { useSelector } from "react-redux";

const NewTripForm = () => {
  // const [modalVisible, setModalVisible] = useState(false);
  const showTripForm = useSelector((state) => state.showTripForm);
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
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Hello World!Hello World!Hello World!Hello World!
            </Text>
          </View>
        </Modal>
      )}
    </View>
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
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default NewTripForm;
