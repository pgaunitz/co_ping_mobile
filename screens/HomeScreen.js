import * as React from "react";
import { TouchableHighlight, View, StyleSheet, Text } from "react-native";

const HomeScreen = () => {
  return (
    <View>
      <TouchableHighlight
        style={styles.button}
      >
        <Text
        style={styles.buttonText}>
        New Trip
          </Text>
          </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    borderColor:'green',
    borderRadius:10,
    backgroundColor:'#71B280',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center'

  },
  buttonText: {
    color: '#black',
    fontSize: 20,
    fontWeight: '600'

  }
});

export default HomeScreen;
