import React from "react";
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ContainerScroll, FilmeImage, ItemTitle, ItemContainerText, ItemSubTitle, ItemText, OpeningCrawlTittle, OpeningCrawlText, Container,FineLine } from "../styles";

export default function FilmsDetails() {
    const route = useRoute();
    const { movie } = route.params; // Acessa os dados passados pela navegação

    return (
        <Container style={styles.container}>
            <ContainerScroll>

                <FilmeImage
                    source={movie.image}
                />
                <ItemTitle>{movie.title}</ItemTitle>
                <ItemContainerText>
                    <ItemSubTitle>Diretor: </ItemSubTitle>
                    <ItemText>{movie.director}</ItemText>
                </ItemContainerText>

                <ItemContainerText>
                    <ItemSubTitle>Produtor: </ItemSubTitle>
                    <ItemText>{movie.producer}</ItemText>
                </ItemContainerText>
                <ItemContainerText>
                    <ItemSubTitle>Data de Lançamento: </ItemSubTitle>
                    <ItemText>{movie.release_date}</ItemText>
                </ItemContainerText>

                <FineLine></FineLine>

                <OpeningCrawlTittle>Abertura </OpeningCrawlTittle> {'\n'}
                <OpeningCrawlText>{movie.opening_crawl}</OpeningCrawlText>


            </ContainerScroll>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFBEC",
    },
});


