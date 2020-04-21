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

axios.defaults.baseURL = "https://co-ping.herokuapp.com"

const store = configureStore()
window.store = store

const Stack = createStackNavigator()

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
            options={{
              headerTransparent: true,
              headerStyle: { borderBottomWidth: 0 },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "thin",
              },
            }}
          />
          <Stack.Screen
            name="Trips"
            component={TripsList}
            options={{
              headerTransparent: true,
              headerStyle: { borderBottomWidth: 0 },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "thin",
              },
            }}
          />
          <Stack.Screen
            name="Requests"
            component={Requests}
            options={{
              headerTransparent: true,
              headerStyle: { borderBottomWidth: 0 },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "thin",
              },
            }}
          />
          <Stack.Screen
            name="My Ping Board"
            component={TripDetails}
            options={{
              headerTransparent: true,
              headerStyle: { borderBottomWidth: 0 },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "thin",
              },
            }}
          />
          <Stack.Screen
            name="My Pong Board"
            component={RequestDetails}
            options={{
              headerTransparent: true,
              headerStyle: { borderBottomWidth: 0 },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "thin",
              },
            }}
          />
          <Stack.Screen
            name="Sign up"
            component={SignUp}
            options={{
              headerTransparent: true,
              headerStyle: { borderBottomWidth: 0 },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "thin",
              },
            }}
          />
          <Stack.Screen
            name="My Profile"
            component={UserProfile}
            options={{
              headerTransparent: true,
              headerStyle: { borderBottomWidth: 0},
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "thin",
              },
            }}
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
