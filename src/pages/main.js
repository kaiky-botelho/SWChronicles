import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { 
  ContainerMain, 
  Tittle,
  Paragraph,
  ButtonOutlineImage, 
  TextButtonImage, 
  ButtonOutlineImageIcon, 
} from "../styles";

export default function Main() {
  const navigation = useNavigation();

  const handlePlanets = () => {
    navigation.navigate("Planets");
  };

  const handleDroids = () => {
    navigation.navigate("Droids");
  };

  const handleMovies = () => {
    navigation.navigate("Movies");
  };

  const handleCharacters = () => {
    navigation.navigate("Characters");
  };

  const handleSpaceships = () => {
    navigation.navigate("Spaceships");
  };

  return (
    <ContainerMain>
      <Tittle>seja bem-vindo jovem padawan!</Tittle>
      <Paragraph>
        Selecione o que deseja aprender mais sobre o vasto universo de Star Wars.
      </Paragraph>

      <ButtonOutlineImage onPress={handlePlanets}>
        <ButtonOutlineImageIcon source={require("../../assets/planeta-icone.png")} />
        <TextButtonImage>PLANETAS</TextButtonImage>
      </ButtonOutlineImage>
      <ButtonOutlineImage onPress={handleSpaceships}>
        <ButtonOutlineImageIcon source={require("../../assets/milenium.png")} />
        <TextButtonImage>NAVES</TextButtonImage>
      </ButtonOutlineImage>
      <ButtonOutlineImage onPress={handleDroids}>
        <ButtonOutlineImageIcon source={require("../../assets/c3po.png")} />
        <TextButtonImage>DROIDS</TextButtonImage>
      </ButtonOutlineImage>
      <ButtonOutlineImage onPress={handleMovies}>
        <ButtonOutlineImageIcon source={require("../../assets/sabre.png")} />
        <TextButtonImage>FILMES</TextButtonImage>
      </ButtonOutlineImage>
      <ButtonOutlineImage onPress={handleCharacters}>
        <ButtonOutlineImageIcon source={require("../../assets/vader.png")} />
        <TextButtonImage>PERSONAGENS</TextButtonImage>
      </ButtonOutlineImage>

    </ContainerMain>
  );
}

const styles = StyleSheet.create({

  paragraph: {

  },
});
