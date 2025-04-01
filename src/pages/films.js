import React, { useState } from "react";
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
  MovieInfoContainer,
  MovieInfoText,
  FilmeImage,
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
  const [movieList, setMovieList] = useState([]); // Agora é uma lista

  const handleList = () => {
    navigation.navigate("FilmsList");
  };

  const handleSearch = async () => {
    if (!movieTitle.trim()) return;

    try {
      const response = await api.get(`/films/?search=${movieTitle}`);
      const movieData = response.data.results[0];

      if (movieData) {
        await AsyncStorage.setItem("savedMovie", JSON.stringify(movieData));

        const newMovie = {
          ...movieData,
          image: movieImages[movieData.title] || require("../../assets/vader.png"),
        };

        setMovieList((prevMovies) => [...prevMovies, newMovie]); // Adiciona novo filme à lista
        setMovieTitle(""); // Limpa o campo de busca
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
          <MovieInfoText>Título: {movie.title}</MovieInfoText>
          <MovieInfoText>Diretor: {movie.director}</MovieInfoText>
          <MovieInfoText>Produtor: {movie.producer}</MovieInfoText>
          <MovieInfoText>Data de lançamento: {movie.release_date}</MovieInfoText>
        </MovieInfoContainer>
      ))}
    </ContainerScroll>
  );
};

export default Films;
