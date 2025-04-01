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
        const loggedInEmail = await AsyncStorage.getItem("loggedInEmail"); // 🔥 Obtendo o email do usuário logado
        if (loggedInEmail) {
            const users = await AsyncStorage.getItem("users");
            if (users) {
                const usersList = JSON.parse(users);
                const user = usersList.find((user) => user.email === loggedInEmail); // 🔥 Encontrando o usuário correto pelo email
                if (user) {
                    setNome(user.nome);
                }
            }
        }
    };

    getUser();
}, []);


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
