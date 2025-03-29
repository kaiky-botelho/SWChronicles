import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import Splash from "./pages/splash";


const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
      name="Splash" 
      component={Splash}
      options={{
        headerShown: false
      }}
      />
      </Stack.Navigator>
  );
}