import React from "react";
import Routes from "./src/routes";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    'Sw': require('./assets/fonts/SF Distant Galaxy.ttf'), 
  });

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#394F9A" />
      <Routes />
    </NavigationContainer>
  );
}
