import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";



const RequestForm = () => {
  return (
    <View style={styles.requestPage}>
      <LinearGradient
        colors={["#71b280", "#134e5e"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      ></LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  requestPage: {
  flex: 1
  }
})

export default RequestForm
