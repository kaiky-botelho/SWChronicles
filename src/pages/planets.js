import React from "react";
import Icon from "@expo/vector-icons/MaterialIcons";
import { ContainerScroll, Input, SmallText, TextUnderline, SearchContainer, SubmitButton } from "../styles";
import api from "../service/api";

export default function Planets() {

  const handleSubmit = () => {
    // Handle the submit action here
  }

  const handleList = () => {
    // Handle the list action here

  }

  return (
    <ContainerScroll>
      <SearchContainer>
      <Input
        placeholder="Adicionar planeta"
      />
      <SubmitButton>
      <Icon name="add" size={20} color="#fff" />
      </SubmitButton>
      </SearchContainer>
      <SmallText>
  Não sabe qual planeta procurar? <TextUnderline onPress={handleList}>Clique aqui e veja uma lista</TextUnderline>
</SmallText>
    </ContainerScroll>
  );
}