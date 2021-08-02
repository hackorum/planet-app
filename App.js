import React from "react";
import HomeScreen from "./screens/HomeScren";
import DetailScreen from "./screens/DetailScreen";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

export default function App() {
  return <AppContainer />;
}

const appStackNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Details: {
    screen: DetailScreen,
  },
});
const AppContainer = createAppContainer(appStackNavigator);
