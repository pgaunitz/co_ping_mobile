import "react-native-gesture-handler"
import * as React from "react"
import HomeScreen from "./screens/HomeScreen.jsx"
import { Provider } from "react-redux"
import configureStore from "./state/store/configureStore"
import axios from "axios"
import TripsList from "./screens/TripsList"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Requests from "./screens/Requests"
import TripDetails from "./screens/TripDetails"
import RequestDetails from "./screens/RequestDetails"
import SignUp from "./screens/SignUp"
import UserProfile from "./screens/UserProfile"
import Device from 'react-native-device-detection'
import Storage from 'react-native-storage';

import AsyncStorage from '@react-native-community/async-storage';

axios.defaults.baseURL = "https://co-ping.herokuapp.com"

const store = configureStore()
window.store = store

// if (Device.isIos) {
//   console.error("HELLO!!!!")
//   localStorage = AsyncStorage
// }

const storage = new Storage({
  // maximum capacity, default 1000
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: 1000 * 3600 * 24,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // we'll talk about the details later.
  }
});

// for web
// window.storage = storage;

// for react native
localStorage = storage;

const Stack = createStackNavigator()
const invisibleHeader = {
  headerTransparent: true,
  headerStyle: { borderBottomWidth: 0 },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "thin",
  },
  title: ""
}

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            nativeID="home"
            component={HomeScreen}
            path=""
            options={invisibleHeader}
          />
          <Stack.Screen
            name="Trips"
            component={TripsList}
            options={invisibleHeader}
          />
          <Stack.Screen
            name="Requests"
            component={Requests}
            options={invisibleHeader}
          />
          <Stack.Screen
            name="My Ping Board"
            component={TripDetails}
            options={invisibleHeader}

          />
          <Stack.Screen
            name="My Pong Board"
            component={RequestDetails}
            options={invisibleHeader}
          />
          <Stack.Screen
            name="Sign up"
            component={SignUp}
            options={invisibleHeader}
          />
          <Stack.Screen
            name="My Profile"
            component={UserProfile}
            options={invisibleHeader}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}

if (window.Cypress) {
  window.store = store
}

export default App
