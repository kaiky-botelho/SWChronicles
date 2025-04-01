import React, { useState } from "react";
import Icon from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../service/api";  // Importando a API do serviço
import {
  ContainerScroll,
  Input,
  SmallText,
  TextUnderline,
  SearchContainer,
  SubmitButton,
  MovieInfoContainer,
  ItemTitle,
  FilmeImage,
  ItemContainerText,
  ItemSubTitle,
  ItemText,
  MoreButton,
  MoreButtonText,
} from "../styles";

const movieImages = {
  "A New Hope": require("../../assets/movies/a-new-hope.jpg"),
  "The Empire Strikes Back": require("../../assets/movies/the-empire-strikes-back.jpg"),
  "Return of the Jedi": require("../../assets/movies/return-of-the-jedi.jpg"),
  "The Phantom Menace": require("../../assets/movies/the-phantom-menace.jpg"),
  "Attack of the Clones": require("../../assets/movies/attack-of-the-clones.jpg"),
  "Revenge of the Sith": require("../../assets/movies/revenge-of-the-sith.jpg"),
  "The Clone Wars": require("../../assets/movies/the-clone-wars.jpg"),
  "The Force Awakens": require("../../assets/movies/the-force-awakens.jpg"),
  "The Last Jedi": require("../../assets/movies/the-last-jedi.png"),
  "The Rise of Skywalker": require("../../assets/movies/the-rise-of-skywalker.jpg"),
  "Rogue One": require("../../assets/movies/rogue-one.jpg"),
};

export const Films = () => {
  const navigation = useNavigation();
  const [movieTitle, setMovieTitle] = useState("");
  const [movieList, setMovieList] = useState([]);

  const handleList = () => {
    navigation.navigate("FilmsList");
  };

  const handleSearch = async () => {
    if (!movieTitle.trim()) return;

    try {
      // Fazendo requisição para a API
      const response = await api.get(`/films/?search=${movieTitle}`);
      const movieData = response.data.results[0]; // Pegando o primeiro filme encontrado

      if (movieData) {
        // Armazenando o filme no AsyncStorage
        await AsyncStorage.setItem("savedMovie", JSON.stringify(movieData));

        const newMovie = {
          ...movieData,
          image: movieImages[movieData.title] || require("../../assets/vader.png"),
        };

        setMovieList((prevMovies) => [...prevMovies, newMovie]);
        setMovieTitle(""); // Limpar o campo de busca
      } else {
        alert("Filme não encontrado!");
      }
    } catch (error) {
      console.error("Erro ao buscar filme:", error);
      alert("Erro ao buscar filme. Tente novamente!");
    }
  };

  return (
    <ContainerScroll>
      <SearchContainer>
        <Input
          placeholder="Buscar filme"
          value={movieTitle}
          onChangeText={setMovieTitle}
        />
        <SubmitButton onPress={handleSearch}>
          <Icon name="search" size={20} color="#fff" />
        </SubmitButton>
      </SearchContainer>

      <SmallText>
        Não sabe qual filme procurar? <TextUnderline onPress={handleList}>Clique aqui</TextUnderline>
      </SmallText>

      {movieList.map((movie, index) => (
        <MovieInfoContainer key={index}>
          <FilmeImage source={movie.image} resizeMode="contain" />
          <ItemTitle>{movie.title}</ItemTitle>
          <ItemContainerText>
            <ItemSubTitle>Diretor: </ItemSubTitle> <ItemText>{movie.director}</ItemText>
          </ItemContainerText>
          <ItemContainerText>
            <ItemSubTitle>Produtor: </ItemSubTitle> <ItemText>{movie.producer}</ItemText>
          </ItemContainerText>
          <ItemContainerText>
            <ItemSubTitle>Data de Lançamento: </ItemSubTitle> <ItemText>{movie.release_date}</ItemText>
          </ItemContainerText>

          <MoreButton
            onPress={() =>
              navigation.navigate("FilmsDetails", {
                movie: movie, 
              })
            }
          >
            <MoreButtonText>Ver Mais</MoreButtonText>
          </MoreButton>
        </MovieInfoContainer>
      ))}
    </ContainerScroll>
  );
};

export default Films;
