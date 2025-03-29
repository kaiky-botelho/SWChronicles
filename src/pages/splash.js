import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function Splash() {

    const navigation = useNavigation();

    const handleLogin = () => {
        navigation.navigate("Login");
    }


  return (
    <View style={styles.fundo}>
    <View style={styles.container}>
      <Image style={styles.image}
      source={require("../../assets/logo.png"

      )} />
    </View>
    <View>
    <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>EXPLORAR</Text>
      </TouchableOpacity>    </View>
    </View>
  );
}

const styles = StyleSheet.create({
    fundo: {
      flex: 1,
      backgroundColor: "#394F9A",
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      marginBottom: 20, 
    },
    button: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: "#FFFBEC",
      paddingVertical: 5,
      paddingHorizontal: 20,
      borderRadius: 8, 
      alignSelf: "center",
      maxWidth: 250,
      marginBottom: 20,
    },
    buttonText: {
      color: "#FFFBEC",
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
  });
     

 