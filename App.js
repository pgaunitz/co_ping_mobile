import 'react-native-gesture-handler'
import * as React from "react";
import HomeScreen from "./screens/HomeScreen.jsx";
import { Provider } from "react-redux";
import configureStore from "./state/store/configureStore";
import axios from "axios";
import TripsList from "./screens/TripsList";
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack';
import { StyleSheet } from "react-native"

 axios.default.baseURL = "http://localhost:3000";
//axios.defaults.baseURL = "https://co-ping.herokuapp.com";

const store = configureStore();
window.store = store;

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  home: {
    flex: 0
  }
})

const App = () => {
  return (
    <NavigationContainer>
    <Provider store={store}>
      <Stack.Navigator>
        <Stack.Screen
        name="Home" 
        component={HomeScreen}
        style={styles.home}
        //headerMode="false"
        //headerMode="none"
        header="null"
        />
        <Stack.Screen
        name="Trips List"
        component={TripsList}
        />
      </Stack.Navigator>
    </Provider>
    </NavigationContainer>
  );
};

if (window.Cypress) {
  window.store = store
}

export default App;
