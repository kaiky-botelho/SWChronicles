import React from "react";
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  ContainerScroll,
  ItemTitle,
  ItemContainerText,
  ItemSubTitle,
  ItemText,
  Container,
  FineLine,
} from "../styles";

export default function SpeciesDetails() {
  const route = useRoute();
  const { species } = route.params;

  return (
    <Container style={styles.container}>
      <ContainerScroll>
        <ItemTitle>{species.name}</ItemTitle>

        <ItemContainerText>
          <ItemSubTitle>Classificação: </ItemSubTitle>
          <ItemText>{species.classification}</ItemText>
        </ItemContainerText>

        <ItemContainerText>
          <ItemSubTitle>Designação: </ItemSubTitle>
          <ItemText>{species.designation}</ItemText>
        </ItemContainerText>

        <ItemContainerText>
          <ItemSubTitle>Altura Média: </ItemSubTitle>
          <ItemText>{species.average_height} cm</ItemText>
        </ItemContainerText>

        <ItemContainerText>
          <ItemSubTitle>Expectativa de Vida: </ItemSubTitle>
          <ItemText>{species.average_lifespan} anos</ItemText>
        </ItemContainerText>

        <ItemContainerText>
          <ItemSubTitle>Idioma: </ItemSubTitle>
          <ItemText>{species.language}</ItemText>
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
