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

export const Species = () => {
  const navigation = useNavigation();
  const [speciesName, setSpeciesName] = useState("");
  const [speciesList, setSpeciesList] = useState([]);

  useEffect(() => {
    const loadSpecies = async () => {
      const loggedInEmail = await AsyncStorage.getItem("loggedInEmail");
      if (!loggedInEmail) return;

      const users = await AsyncStorage.getItem("users");
      if (!users) return;

      const usersList = JSON.parse(users);
      const user = usersList.find((u) => u.email === loggedInEmail);
      if (user?.species) {
        setSpeciesList(user.species);
      }
    };

    loadSpecies();
  }, []);

  const handleSpeciesList = () => {
    navigation.navigate("SpeciesList");
  };

  const handleSearch = async () => {
    if (!speciesName.trim()) return;

    try {
      const response = await api.get(`/species/?search=${speciesName}`);
      const speciesData = response.data.results[0];
      if (!speciesData) return alert("Espécie não encontrada!");

      const loggedInEmail = await AsyncStorage.getItem("loggedInEmail");
      const users = await AsyncStorage.getItem("users");
      if (!loggedInEmail || !users) return;

      const usersList = JSON.parse(users);
      const userIndex = usersList.findIndex((u) => u.email === loggedInEmail);
      if (userIndex === -1) return;

      const userSpecies = usersList[userIndex].species || [];
      userSpecies.push(speciesData);
      usersList[userIndex].species = userSpecies;

      await AsyncStorage.setItem("users", JSON.stringify(usersList));
      setSpeciesList(userSpecies);
      setSpeciesName("");
    } catch (err) {
      console.error(err);
      alert("Erro ao buscar espécie!");
    }
  };

  return (
    <ContainerScroll>
      <SearchContainer>
        <Input
          placeholder="Buscar espécie"
          value={speciesName}
          onChangeText={setSpeciesName}
        />
        <SubmitButton onPress={handleSearch}>
          <Icon name="search" size={20} color="#fff" />
        </SubmitButton>
      </SearchContainer>

      <SmallText>
        Não sabe qual espécie procurar?{" "}
        <TextUnderline onPress={handleSpeciesList}>Clique aqui</TextUnderline>
      </SmallText>

      {speciesList.map((item, index) => (
        <InfoContainer key={index}>
          <ItemTitle>{item.name}</ItemTitle>
          <ItemContainerText>
            <ItemSubTitle>Classificação: </ItemSubTitle>
            <ItemText>{item.classification}</ItemText>
          </ItemContainerText>
          <ItemContainerText>
            <ItemSubTitle>Designação: </ItemSubTitle>
            <ItemText>{item.designation}</ItemText>
          </ItemContainerText>
          <ItemContainerText>
            <ItemSubTitle>Idioma: </ItemSubTitle>
            <ItemText>{item.language}</ItemText>
          </ItemContainerText>

          <MoreButton
            onPress={() =>
              navigation.navigate("SpeciesDetails", {
                species: item,
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

export default Species;
