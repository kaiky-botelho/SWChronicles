import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import Splash from "./pages/splash";
import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import Main from "./pages/main";
import Planets from "./pages/planets";
import PlanetsList from "./pages/planetsList";

import Films from "./pages/films";
import FilmsList from "./pages/filmsList";
import FilmsDetails from "./pages/filmsDetails";


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
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Cadastro"
        component={Cadastro}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerTitle: () => (
            <Image
              source={require("../assets/logo.png")}
              style={{ width: 100, height: 40, resizeMode: "contain" }}
            />
          ),
          headerTitleAlign: "center",
          headerTintColor: "#FFFBEC",
          headerStyle: {
            backgroundColor: "#394F9A",
          },
        }}
      />
      <Stack.Screen
        name="Planets"
        component={Planets}
        options={{
          headerTitle: () => (
            <Image
              source={require("../assets/logo.png")}
              style={{ width: 100, height: 40, resizeMode: "contain" }}
            />
          ),
          headerTitleAlign: "center",
          headerTintColor: "#FFFBEC",
          headerStyle: {
            backgroundColor: "#394F9A",
          },
        }}
      />
      <Stack.Screen
        name="PlanetsList"
        component={PlanetsList}
        options={{
          headerTitle: () => (
            <Image
              source={require("../assets/logo.png")}
              style={{ width: 100, height: 40, resizeMode: "contain" }}
            />
          ),
          headerTitleAlign: "center",
          headerTintColor: "#FFFBEC",
          headerStyle: {
            backgroundColor: "#394F9A",
          },
        }}
      />

<Stack.Screen
        name="Films"
        component={Films}
        options={{
          headerTitle: () => (
            <Image
              source={require("../assets/logo.png")}
              style={{ width: 100, height: 40, resizeMode: "contain" }}
            />
          ),
          headerTitleAlign: "center",
          headerTintColor: "#FFFBEC",
          headerStyle: {
            backgroundColor: "#394F9A",
          },
        }}
      />
      <Stack.Screen
        name="FilmsList"
        component={FilmsList}
        options={{
          headerTitle: () => (
            <Image
              source={require("../assets/logo.png")}
              style={{ width: 100, height: 40, resizeMode: "contain" }}
            />
          ),
          headerTitleAlign: "center",
          headerTintColor: "#FFFBEC",
          headerStyle: {
            backgroundColor: "#394F9A",
          },
        }}
      />
      <Stack.Screen
        name="FilmsDetails"
        component={FilmsDetails}
        options={{
          headerTitle: () => (
            <Image
              source={require("../assets/logo.png")}
              style={{ width: 100, height: 40, resizeMode: "contain" }}
            />
          ),
          headerTitleAlign: "center",
          headerTintColor: "#FFFBEC",
          headerStyle: {
            backgroundColor: "#394F9A",
          },
        }}
      />
    </Stack.Navigator>
  );
}