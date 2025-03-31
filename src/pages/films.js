import React from "react";
import Icon from "@expo/vector-icons/MaterialIcons";
import { ContainerScroll, Input, SmallText, TextUnderline, SearchContainer, SubmitButton } from "../styles";
import { useNavigation } from "@react-navigation/native";
import api from "../service/api";

export default function films() {

  const navigation = useNavigation();


  const handleList = () => {
    navigation.navigate("FilmsList")
  }

  return (
    <ContainerScroll>
      <SearchContainer>
        <Input
          placeholder="Adicionar Filme"
        />
        <SubmitButton>
          <Icon name="add" size={20} color="#fff" />
        </SubmitButton>
      </SearchContainer>
      <SmallText>
        Não sabe qual planeta procurar? <TextUnderline onPress={handleList}>Clique aqui</TextUnderline>
      </SmallText>
    </ContainerScroll>
  );
}