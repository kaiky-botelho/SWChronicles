import React from "react";
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  ContainerScroll,
  Container,
  ItemTitle,
  ItemContainerText,
  ItemSubTitle,
  ItemText,
  FineLine
} from "../styles";

export default function StarshipDetails() {
  const route = useRoute();
  const { starship } = route.params;

  return (
    <Container style={styles.container}>
      <ContainerScroll>
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

        <ItemContainerText>
          <ItemSubTitle>Custo: </ItemSubTitle>
          <ItemText>{starship.cost_in_credits} créditos</ItemText>
        </ItemContainerText>

        <ItemContainerText>
          <ItemSubTitle>Velocidade Máxima: </ItemSubTitle>
          <ItemText>{starship.max_atmosphering_speed}</ItemText>
        </ItemContainerText>

        <ItemContainerText>
          <ItemSubTitle>Capacidade de Passageiros: </ItemSubTitle>
          <ItemText>{starship.passengers}</ItemText>
        </ItemContainerText>

        <ItemContainerText>
          <ItemSubTitle>Capacidade de Carga: </ItemSubTitle>
          <ItemText>{starship.cargo_capacity}</ItemText>
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
