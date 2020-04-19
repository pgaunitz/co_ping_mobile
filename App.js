import "react-native-gesture-handler";
import * as React from "react";
import HomeScreen from "./screens/HomeScreen.jsx";
import { Provider } from "react-redux";
import configureStore from "./state/store/configureStore";
import axios from "axios";
import TripsList from "./screens/TripsList";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Requests from "./screens/Requests";
import TripDetails from "./screens/TripDetails";
import RequestDetails from "./screens/RequestDetails";

axios.defaults.baseURL = "https://co-ping.herokuapp.com";

const store = configureStore();
window.store = store;

const Stack = createStackNavigator();

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
          />
          <Stack.Screen name="Trips" component={TripsList} />
          <Stack.Screen name="Requests" component={Requests} />
          <Stack.Screen name="My Ping Board" component={TripDetails} />
          <Stack.Screen name="My Pong Board" component={RequestDetails} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

if (window.Cypress) {
  window.store = store;
}

export default App;
