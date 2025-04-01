import React, { useState } from "react";
import Icon from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../service/api";
import {
  ContainerScroll,
  Input,
  SmallText,
  TextUnderline,
  SearchContainer,
  SubmitButton,
  PlanetInfoContainer,
  PlanetInfoText,
} from "../styles";

const Planets = () => {
  const navigation = useNavigation();
  const [planetName, setPlanetName] = useState("");
  const [planetInfo, setPlanetInfo] = useState(null);

  const handleList = () => {
    navigation.navigate("PlanetsList");
  };

  const handleSearch = async () => {
    if (!planetName.trim()) return;
    
    try {
      const response = await api.get(`/planets/?search=${planetName}`);
      const planetData = response.data.results[0];
      
      if (planetData) {
        await AsyncStorage.setItem("savedPlanet", JSON.stringify(planetData));
        setPlanetInfo(planetData);
      } else {
        alert("Planeta não encontrado!");
      }
    } catch (error) {
      console.error("Erro ao buscar planeta:", error);
      alert("Erro ao buscar planeta. Tente novamente!");
    }
  };

  return (
    <ContainerScroll>
      <SearchContainer>
        <Input
          placeholder="Adicionar planeta"
          value={planetName}
          onChangeText={setPlanetName}
        />
        <SubmitButton onPress={handleSearch}>
          <Icon name="add" size={20} color="#fff" />
        </SubmitButton>
      </SearchContainer>
      <SmallText>
        Não sabe qual planeta procurar? <TextUnderline onPress={handleList}>Clique aqui</TextUnderline>
      </SmallText>
      {planetInfo && (
        <PlanetInfoContainer>
          <Image source={require("../../assets/planeta-icone.png")} />
          <PlanetInfoText>Nome: {planetInfo.name}</PlanetInfoText>
          <PlanetInfoText>Clima: {planetInfo.climate}</PlanetInfoText>
          <PlanetInfoText>População: {planetInfo.population}</PlanetInfoText>
          <PlanetInfoText>Terreno: {planetInfo.terrain}</PlanetInfoText>
        </PlanetInfoContainer>
      )}
    </ContainerScroll>
  );
};

export default Planets;
