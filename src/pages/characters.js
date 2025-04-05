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

export const Characters = () => {
  const navigation = useNavigation();
  const [characterName, setCharacterName] = useState("");
  const [characterList, setCharacterList] = useState([]);

  useEffect(() => {
    const loadCharacters = async () => {
      const loggedInEmail = await AsyncStorage.getItem("loggedInEmail");
      if (!loggedInEmail) return;

      const users = await AsyncStorage.getItem("users");
      if (!users) return;

      let usersList = JSON.parse(users);
      let user = usersList.find((u) => u.email === loggedInEmail);

      if (user && user.characters) {
        setCharacterList(user.characters);
      }
    };

    loadCharacters();
  }, []);

  const handleCharacterList = () => {
    navigation.navigate("CharactersList");
  };

  const handleSearch = async () => {
    if (!characterName.trim()) return;

    try {
      const response = await api.get(`/people/?search=${characterName}`);
      const characterData = response.data.results[0];
      if (!characterData) {
        alert("Personagem não encontrado!");
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

      let userCharacters = usersList[userIndex].characters || [];
      userCharacters.push(characterData);
      usersList[userIndex].characters = userCharacters;

      await AsyncStorage.setItem("users", JSON.stringify(usersList));
      setCharacterList(userCharacters);
      setCharacterName("");
    } catch (error) {
      console.error("Erro ao buscar personagem:", error);
      alert("Erro ao buscar personagem. Tente novamente!");
    }
  };

  return (
    <ContainerScroll>
      <SearchContainer>
        <Input
          placeholder="Buscar personagem"
          value={characterName}
          onChangeText={setCharacterName}
        />
        <SubmitButton onPress={handleSearch}>
          <Icon name="search" size={20} color="#fff" />
        </SubmitButton>
      </SearchContainer>

      <SmallText>
        Não sabe qual personagem procurar?{" "}
        <TextUnderline onPress={handleCharacterList}>Clique aqui</TextUnderline>
      </SmallText>

      {characterList.map((character, index) => (
        <InfoContainer key={index}>
          <ItemTitle>{character.name}</ItemTitle>
          <ItemContainerText>
            <ItemSubTitle>Altura: </ItemSubTitle>
            <ItemText>{character.height} cm</ItemText>
          </ItemContainerText>
          <ItemContainerText>
            <ItemSubTitle>Cor dos Olhos: </ItemSubTitle>
            <ItemText>{character.eye_color}</ItemText>
          </ItemContainerText>
          <ItemContainerText>
            <ItemSubTitle>Gênero: </ItemSubTitle>
            <ItemText>{character.gender}</ItemText>
          </ItemContainerText>

          <MoreButton
            onPress={() =>
              navigation.navigate("CharactersDetails", {
                character: character,
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

export default Characters;
