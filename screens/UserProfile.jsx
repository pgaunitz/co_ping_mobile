import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../modules/userAction"
import { View, Text, StyleSheet, TouchableHighlight, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const UserProfile = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userId);
  const userName = useSelector(state => state.userName);
  const communityStatus = useSelector(state => state.communityStatus);
  const phone = useSelector(state => state.phone);
  const address = useSelector(state => state.address);
  const aboutMe = useSelector(state => state.aboutMe);

  const [name, onChangeName] = React.useState({ userName });

  // useEffect(() => {
  //   getProfileInformation(userId, dispatch);
  // }, []);

  return (
    <View style={styles.container} className="request-form">
      <LinearGradient
        colors={["#71b280", "#134e5e"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.title}>Profile Details</Text>
        <View style={styles.profile}>
          <View style={styles.itemContainer}>
            <Text>Name: </Text>
            <TextInput
              style={styles.dataInput}
              id="user-name"
              type="name"
              value={userName}
              onChangeText={(name) => onChangeName({name})}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    margin: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "left",
    marginLeft: 15,
  },
  profile: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 2.0,
  },
  dataInput: {
    border: 1,
    borderColor: "grey"
  }
})

export default UserProfile
