import React, { useState, useEffect } from "react";
import Icon from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../service/api";
import {
  ContainerScroll,
  Input,
  SmallText,
  TextUnderline,
  SearchContainer,
  SubmitButton,
  InfoContainer,
  ItemTitle,
  ItemContainerText,
  ItemSubTitle,
  ItemText,
  MoreButton,
  MoreButtonText,
} from "../styles";

export const Planets = () => {
  const navigation = useNavigation();
  const [planetName, setPlanetName] = useState("");
  const [planetList, setPlanetList] = useState([]);

  useEffect(() => {
    const loadPlanets = async () => {
      const loggedInEmail = await AsyncStorage.getItem("loggedInEmail");
      if (!loggedInEmail) return;

      const users = await AsyncStorage.getItem("users");
      if (!users) return;

      let usersList = JSON.parse(users);
      let user = usersList.find((u) => u.email === loggedInEmail);

      if (user && user.planets) {
        setPlanetList(user.planets);
      }
    };

    loadPlanets();
  }, []);

  const handlePlanetList = () => {
    navigation.navigate("PlanetsList");
  };

  const handleSearch = async () => {
    if (!planetName.trim()) return;

    try {
      const response = await api.get(`/planets/?search=${planetName}`);
      const planetData = response.data.results[0];
      if (!planetData) {
        alert("Planeta não encontrado!");
        return;
      }

      const loggedInEmail = await AsyncStorage.getItem("loggedInEmail");
      if (!loggedInEmail) {
        alert("Nenhum usuário logado!");
        return;
      }

      const users = await AsyncStorage.getItem("users");
      if (!users) {
        alert("Erro ao recuperar usuários!");
        return;
      }

      let usersList = JSON.parse(users);
      let userIndex = usersList.findIndex((user) => user.email === loggedInEmail);
      if (userIndex === -1) {
        alert("Usuário não encontrado!");
        return;
      }

      let userPlanets = usersList[userIndex].planets || [];
      userPlanets.push(planetData);
      usersList[userIndex].planets = userPlanets;

      await AsyncStorage.setItem("users", JSON.stringify(usersList));
      setPlanetList(userPlanets);
      setPlanetName("");
    } catch (error) {
      console.error("Erro ao buscar planeta:", error);
      alert("Erro ao buscar planeta. Tente novamente!");
    }
  };

  return (
    <ContainerScroll>
      <SearchContainer>
        <Input
          placeholder="Buscar planeta"
          value={planetName}
          onChangeText={setPlanetName}
        />
        <SubmitButton onPress={handleSearch}>
          <Icon name="search" size={20} color="#fff" />
        </SubmitButton>
      </SearchContainer>

      <SmallText>
        Não sabe qual planeta procurar?{" "}
        <TextUnderline onPress={handlePlanetList}>Clique aqui</TextUnderline>
      </SmallText>

      {planetList.map((planet, index) => (
        <InfoContainer key={index}>
          <ItemTitle>{planet.name}</ItemTitle>
          <ItemContainerText>
            <ItemSubTitle>Clima: </ItemSubTitle>
            <ItemText>{planet.climate}</ItemText>
          </ItemContainerText>
          <ItemContainerText>
            <ItemSubTitle>Terreno: </ItemSubTitle>
            <ItemText>{planet.terrain}</ItemText>
          </ItemContainerText>
          <ItemContainerText>
            <ItemSubTitle>População: </ItemSubTitle>
            <ItemText>{planet.population}</ItemText>
          </ItemContainerText>

          <MoreButton
            onPress={() =>
              navigation.navigate("PlanetsDetails", {
                planet: planet,
              })
            }
          >
            <MoreButtonText>Ver Mais</MoreButtonText>
          </MoreButton>
        </InfoContainer>
      ))}
    </ContainerScroll>
  );
};

export default Planets;
