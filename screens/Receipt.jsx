import React from "react"
import { useSelector } from "react-redux"
import { View, Text, StyleSheet } from "react-native"

const Receipt = () => {
  const myPong = useSelector((state) => state.myPong)
  return (
    <View style={styles.costContainer}>
      <Text style={styles.totalCost}>Total cozt:</Text>
      <Text id="total-cost" style={styles.totalSum}>
        {" "}
        {myPong.total_cost}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  CostContainer: {
    flex: 1,
  },
  totalSum: {
    fontSize: 18,
    margin: 2,
  },
  totalCost: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 2,
  },
})

export default Receipt
