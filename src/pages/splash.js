import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Image } from "react-native";
import { ButtonOutline, ButtonOutlineText, Container } from "../styles";

export default function Splash() {

  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Login");
  }


  return (  
    <View style={styles.fundo}> 
      <Container>
        <Image style={styles.image}
          source={require("../../assets/logo.png")} />
      </Container>
      <View style={styles.containerButton }>
        <ButtonOutline style={styles.ButtonOutline} onPress={handleLogin}>
          <ButtonOutlineText style={styles.buttonText}>Explorar</ButtonOutlineText>
        </ButtonOutline>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: "#394F9A",
  },
  containerButton: {
    alignItems: "center",
    paddingBottom: 20,
  },
  image: {
    marginBottom: 20,
  },
  ButtonOutline: {
    borderColor: "#FFFBEC",
  },
  buttonText: {
    color: "#FFFBEC",
  },
});


