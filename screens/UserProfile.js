import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfileInformation } from "modules/profileActions";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const UserProfile = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  const userName = useSelector((state) => state.userName);
  const communityStatus = useSelector((state) => state.communityStatus);
  const phone = useSelector((state) => state.phone);
  const userAddress = useSelector((state) => state.userAddress);
  const aboutMe = useSelector((state) => state.aboutMe);
  const updateProfileMessage = useSelector(
    (state) => state.updateProfileMessage
  );

  const [name, onChangeName] = useState();
  const [address, onChangeAddress] = useState();
  const [telephone, onChangeTelephone] = useState();
  const [about, onChangeAbout] = useState("");

  let statusColor;
  if (communityStatus === "pending") {
    statusColor = (
      <>
        <Text style={styles.status}>Community Status: </Text>
        <Text style={styles.pending}>{communityStatus}</Text>
      </>
    );
  } else if (communityStatus === "accepted") {
    statusColor = (
      <>
        <Text style={styles.status}>Community Status: </Text>
        <Text style={styles.accepted}>{communityStatus}</Text>
      </>
    );
  } else {
    statusColor = (
      <>
        <Text style={styles.status}>Community Status: </Text>
        <Text style={styles.rejected}>{communityStatus}</Text>
      </>
    );
  }

  return (
    <View style={styles.container} nativeID="request-form">
      <LinearGradient
        colors={["#71b280", "#134e5e"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.title}>Profile Details</Text>
        <Text style={styles.updateNote} id="profile-update-message">
          {updateProfileMessage}
        </Text>
        <View style={styles.profile}>
          <TextInput
            style={styles.dataNameInput}
            nativeID="user-name"
            textContentType="name"
            value={userName}
            onChangeText={(name) => onChangeName(name)}
          />
          <View style={styles.statusContainer}>{statusColor}</View>
          <View style={styles.itemContainer}>
            <Text style={styles.profileItem}>Phone: </Text>
            <TextInput
              style={styles.dataInput}
              nativeID="user-phone"
              textContentType="telephoneNumber"
              value={phone}
              onChangeText={(telephone) => onChangeTelephone(telephone)}
            />
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.profileItem}>Address: </Text>
            <TextInput
              style={styles.dataInputAddress}
              nativeID="user-address"
              textContentType="fullStreetAddress"
              multiline={true}
              maxLength={100}
              value={userAddress}
              onChangeText={(address) => onChangeAddress(address)}
            />
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.profileItem}>About: </Text>
            <TextInput
              style={styles.dataInputText}
              nativeID="user-about"
              multiline={true}
              maxLength={250}
              value={aboutMe}
              onChangeText={(about) => onChangeAbout(about)}
            />
          </View>
          <TouchableHighlight
            style={styles.request}
            onPress={() => {
              updateProfileInformation(
                name,
                address,
                telephone,
                about,
                userId,
                dispatch
              );
            }}
          >
            <Text id="update-profile-button" style={styles.requestButtonText}>
              Save my updates
            </Text>
          </TouchableHighlight>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    margin: 10,
    marginTop: 50,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
  },
  itemContainer: {
    flexDirection: "row",
    margin: 10,
  },
  profile: {
    padding: 10,
    margin: 15,
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 2.0,
  },
  dataInput: {
    borderColor: "grey",
    width: 265,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
    backgroundColor: "#f0f4f7",
    borderRadius: 5,
  },
  dataInputText: {
    borderColor: "grey",
    height: 90,
    width: 266,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
    backgroundColor: "#f0f4f7",
    borderRadius: 5,
  },
  dataInputAddress: {
    borderColor: "grey",
    height: 60,
    width: 250,
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
    backgroundColor: "#f0f4f7",
    borderRadius: 5,
  },
  dataNameInput: {
    fontWeight: "bold",
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 20,
    margin: 5,
    fontFamily: "Futura-Medium",
    backgroundColor: "#f0f4f7",
    borderRadius: 5,
  },
  profileItem: {
    fontWeight: "bold",
    fontFamily: "Futura-Medium",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    padding: 5,
  },
  pending: {
    color: "#d27300",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 18,
    fontFamily: "Futura-Medium",
  },
  accepted: {
    color: "#71b280",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 18,
    fontFamily: "Futura-Medium",
  },
  rejected: {
    color: "#B27183",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 18,
    fontFamily: "Futura-Medium",
  },
  status: {
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
    fontFamily: "Futura-Medium",
  },
  request: {
    borderRadius: 10,
    backgroundColor: "#71B280",
    marginTop: 15,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  requestButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Futura-Medium",
  },
  updateNote: {
    fontSize: 18,
    color: "white",
    margin: 10,
    textAlign: "center",
    fontWeight: "normal",
    fontFamily: "Futura-Medium",
  },
});

export default UserProfile;
