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

export default function PlanetsDetails() {
  const route = useRoute();
  const { planet } = route.params;

  return (
    <Container style={styles.container}>
      <ContainerScroll>
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

        <ItemContainerText>
          <ItemSubTitle>Diâmetro: </ItemSubTitle>
          <ItemText>{planet.diameter}</ItemText>
        </ItemContainerText>

        <ItemContainerText>
          <ItemSubTitle>Gravidade: </ItemSubTitle>
          <ItemText>{planet.gravity}</ItemText>
        </ItemContainerText>

        <ItemContainerText>
          <ItemSubTitle>Duração do dia (horas): </ItemSubTitle>
          <ItemText>{planet.rotation_period}</ItemText>
        </ItemContainerText>

        <ItemContainerText>
          <ItemSubTitle>Duração do ano (dias): </ItemSubTitle>
          <ItemText>{planet.orbital_period}</ItemText>
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
