import React from "react"
import { LinearGradient } from "expo-linear-gradient"
import { TouchableHighlight, View, StyleSheet, Text, Image } from "react-native"

const SignUp = () => {
  return (
    <View style={styles.mainpage}>
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
  mainpage: {
    flex: 1,
  },
})

export default SignUp
