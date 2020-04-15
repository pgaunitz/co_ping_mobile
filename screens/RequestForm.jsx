import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { useSelector } from "react-redux";

const RequestForm = () => {
  const selectedTripId = useSelector((state) => state.selectedTripId);
  let tripId = selectedTripId;
  return (
    <View style={styles.requestPage} className="request-form">
      <LinearGradient
        colors={["#71b280", "#134e5e"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <Text>Trip Request</Text>
        <TextInput
              placeholder="First item..."
              style={styles.itemInput}
              id="item-one"
            />
            <TextInput
              placeholder="Second item..."
              style={styles.itemInput}
              id="item-two"
            />
            <TextInput
              placeholder="Third item..."
              style={styles.itemInput}
              id="item-three"
            />
        <Text>{tripId}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  requestPage: {
    flex: 1,
  },
  itemInput: {
    textAlign: "left",
    fontSize: 18,
    padding: 18,
    margin: 2,
    borderColor: "black",
    borderWidth: 2
  },
});

export default RequestForm;
