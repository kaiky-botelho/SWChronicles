import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { 
  ContainerScroll, 
  Tittle,
  Paragraph,
  ButtonOutlineImage, 
  TextButtonImage, 
  ButtonOutlineImageIcon, 
} from "../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Main() {

  const [nome, setNome] = useState(""); // useState importado corretamente

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const userJson = JSON.parse(user);
        setNome(userJson.nome);
      }
    };

    getUser();
  }, []); // hook useEffect funciona corretamente para pegar o nome

  const navigation = useNavigation();

  const handlePlanets = () => {
    navigation.navigate("Planets");
  };

  const handleMovies = () => {
    navigation.navigate("Films");
  };

  const handleCharacters = () => {
    navigation.navigate("Characters");
  };

  const handleSpaceships = () => {
    navigation.navigate("Spaceships");
  };

  const handleSpecies = () => {
    navigation.navigate("Species");
  };

  return (
    <ContainerScroll>
      <Tittle>seja bem-vindo, {nome ? nome : "Jovem Padawan"}!</Tittle>
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
      <ButtonOutlineImage onPress={handleMovies}>
        <ButtonOutlineImageIcon source={require("../../assets/sabre.png")} />
        <TextButtonImage>FILMES</TextButtonImage>
      </ButtonOutlineImage>
      <ButtonOutlineImage onPress={handleCharacters}>
        <ButtonOutlineImageIcon source={require("../../assets/vader.png")} />
        <TextButtonImage>PERSONAGENS</TextButtonImage>
      </ButtonOutlineImage>
      <ButtonOutlineImage onPress={handleSpecies}>
        <ButtonOutlineImageIcon source={require("../../assets/chewbacca.png")} />
        <TextButtonImage>ESPÉCIES</TextButtonImage>
      </ButtonOutlineImage>
    </ContainerScroll>
  );
}
