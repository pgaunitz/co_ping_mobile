import "react-native-gesture-handler";
import * as React from "react";
import { Provider } from "react-redux";
import configureStore from "state/store/configureStore";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// Components for stack navigation
import HomeScreen from "screens/HomeScreen";
import TripsList from "screens/TripsList";
import Requests from "screens/Requests";
import TripDetails from "screens/TripDetails";
import RequestDetails from "screens/RequestDetails";
import SignUpDisplay from "screens/SignUpDisplay";
import UserProfile from "screens/UserProfile";

axios.defaults.baseURL = "https://co-ping.herokuapp.com";

const store = configureStore();
window.store = store;

const Stack = createStackNavigator();
const invisibleHeader = {
  headerTransparent: true,
  headerStyle: { borderBottomWidth: 0 },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "normal",
  },
  title: "",
};

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
            component={SignUpDisplay}
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
  );
};

if (window.Cypress) {
  window.store = store;
}

export default App;
