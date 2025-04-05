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

export const Starships = () => {
  const navigation = useNavigation();
  const [starshipName, setStarshipName] = useState("");
  const [starshipList, setStarshipList] = useState([]);

  useEffect(() => {
    const loadStarships = async () => {
      const loggedInEmail = await AsyncStorage.getItem("loggedInEmail");
      if (!loggedInEmail) return;

      const users = await AsyncStorage.getItem("users");
      if (!users) return;

      let usersList = JSON.parse(users);
      let user = usersList.find((u) => u.email === loggedInEmail);

      if (user && user.starships) {
        setStarshipList(user.starships);
      }
    };

    loadStarships();
  }, []);

  const handleStarshipList = () => {
    navigation.navigate("StarshipsList");
  };

  const handleSearch = async () => {
    if (!starshipName.trim()) return;

    try {
      const response = await api.get(`/starships/?search=${starshipName}`);
      const starshipData = response.data.results[0];
      if (!starshipData) {
        alert("Nave não encontrada!");
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

      let userStarships = usersList[userIndex].starships || [];
      userStarships.push(starshipData);
      usersList[userIndex].starships = userStarships;

      await AsyncStorage.setItem("users", JSON.stringify(usersList));
      setStarshipList(userStarships);
      setStarshipName("");
    } catch (error) {
      console.error("Erro ao buscar nave:", error);
      alert("Erro ao buscar nave. Tente novamente!");
    }
  };

  return (
    <ContainerScroll>
      <SearchContainer>
        <Input
          placeholder="Buscar espaçonave"
          value={starshipName}
          onChangeText={setStarshipName}
        />
        <SubmitButton onPress={handleSearch}>
          <Icon name="search" size={20} color="#fff" />
        </SubmitButton>
      </SearchContainer>

      <SmallText>
        Não sabe qual nave procurar?{" "}
        <TextUnderline onPress={handleStarshipList}>Clique aqui</TextUnderline>
      </SmallText>

      {starshipList.map((starship, index) => (
        <InfoContainer key={index}>
          <ItemTitle>{starship.name}</ItemTitle>
          <ItemContainerText>
            <ItemSubTitle>Modelo: </ItemSubTitle>
            <ItemText>{starship.model}</ItemText>
          </ItemContainerText>
          <ItemContainerText>
            <ItemSubTitle>Fabricante: </ItemSubTitle>
            <ItemText>{starship.manufacturer}</ItemText>
          </ItemContainerText>
          <ItemContainerText>
            <ItemSubTitle>Classe: </ItemSubTitle>
            <ItemText>{starship.starship_class}</ItemText>
          </ItemContainerText>

          <MoreButton
            onPress={() =>
              navigation.navigate("StarshipDetails", {
                starship: starship,
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

export default Starships;
