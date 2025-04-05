import React from "react";
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  Container,
  ContainerScroll,
  ItemTitle,
  ItemContainerText,
  ItemSubTitle,
  ItemText,
  FineLine,
} from "../styles";

export default function CharactersDetails() {
  const route = useRoute();
  const { character } = route.params;

  return (
    <Container style={styles.container}>
      <ContainerScroll>
        <ItemTitle>{character.name}</ItemTitle>

        <ItemContainerText>
          <ItemSubTitle>Altura: </ItemSubTitle>
          <ItemText>{character.height} cm</ItemText>
        </ItemContainerText>

        <ItemContainerText>
          <ItemSubTitle>Peso: </ItemSubTitle>
          <ItemText>{character.mass} kg</ItemText>
        </ItemContainerText>

        <ItemContainerText>
          <ItemSubTitle>Cor do Cabelo: </ItemSubTitle>
          <ItemText>{character.hair_color}</ItemText>
        </ItemContainerText>

        <ItemContainerText>
          <ItemSubTitle>Cor da Pele: </ItemSubTitle>
          <ItemText>{character.skin_color}</ItemText>
        </ItemContainerText>

        <ItemContainerText>
          <ItemSubTitle>Cor dos Olhos: </ItemSubTitle>
          <ItemText>{character.eye_color}</ItemText>
        </ItemContainerText>

        <ItemContainerText>
          <ItemSubTitle>Ano de Nascimento: </ItemSubTitle>
          <ItemText>{character.birth_year}</ItemText>
        </ItemContainerText>

        <ItemContainerText>
          <ItemSubTitle>Gênero: </ItemSubTitle>
          <ItemText>{character.gender}</ItemText>
        </ItemContainerText>

        <FineLine />
      </ContainerScroll>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFBEC",
  },
});
