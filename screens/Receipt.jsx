import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { View, Text, StyleSheet } from "react-native"

const Receipt = () => {
  const dispatch = useDispatch()
  const myPong = useSelector((state) => state.myPong)
  return (
    <View style={styles.costContainer}>
      <Text style={styles.totalCost}>Total cost:</Text>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
