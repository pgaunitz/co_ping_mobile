import * as React from "react";
import { Image, Button, View } from "react-native";
import co_ping_Logo2 from "../assets/images/co_ping_Logo2.png";

const HomeScreen = () => {
  return (
    <View>
          <Image
            source={co_ping_Logo2}
          />
          <Button>New Trip</Button>

    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

export default HomeScreen
