import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet } from "react-native";

const Receipt = () => {
  const myPong = useSelector((state) => state.myPong);
  return (
    <View style={styles.costContainer}>
      <Text style={styles.totalCost}>Total cost:</Text>
      <Text id="total-cost" style={styles.totalSum}>
        {" "}
        {myPong.total_cost}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  costContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  totalSum: {
    fontSize: 18,
    margin: 2,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
  },
  totalCost: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 2,
    fontFamily: "Futura-Medium",
  },
});

export default Receipt;
