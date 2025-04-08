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
  MovieInfoContainer,
  ItemTitle,
  FilmeImage,
  ItemContainerText,
  ItemSubTitle,
  ItemText,
  MoreButton,
  MoreButtonText,
} from "../styles";

// Mapeando imagens dos filmes
const movieImages = {
  "A New Hope": require("../../assets/movies/a-new-hope.jpg"),
  "The Empire Strikes Back": require("../../assets/movies/the-empire-strikes-back.jpg"),
  "Return of the Jedi": require("../../assets/movies/return-of-the-jedi.jpg"),
  "The Phantom Menace": require("../../assets/movies/the-phantom-menace.jpg"),
  "Attack of the Clones": require("../../assets/movies/attack-of-the-clones.jpg"),
  "Revenge of the Sith": require("../../assets/movies/revenge-of-the-sith.jpg"),
};

export const Films = () => {
  const navigation = useNavigation();
  const [movieTitle, setMovieTitle] = useState("");
  const [movieList, setMovieList] = useState([]);

  // Carregar filmes do usuário logado ao entrar na tela
  useEffect(() => {
    const loadMovies = async () => {
      const loggedInEmail = await AsyncStorage.getItem("loggedInEmail");
      if (!loggedInEmail) return;

      const users = await AsyncStorage.getItem("users");
      if (!users) return;

      let usersList = JSON.parse(users);
      let user = usersList.find((u) => u.email === loggedInEmail);

      if (user && user.movies) {
        setMovieList(user.movies);
      }
    };

    loadMovies();
  }, []);

  const handleList = () => {
    navigation.navigate("FilmsList");
  };

  const handleSearch = async () => {
    if (!movieTitle.trim()) return;

    try {
      // Fazendo requisição para a API
      const response = await api.get(`/films/?search=${movieTitle}`);
      const movieData = response.data.results[0]; // Pegando o primeiro filme encontrado

      if (!movieData) {
        alert("Filme não encontrado!");
        return;
      }

      // Obtendo o usuário logado
      const loggedInEmail = await AsyncStorage.getItem("loggedInEmail");
      if (!loggedInEmail) {
        alert("Nenhum usuário logado!");
        return;
      }

      // Obtendo todos os usuários salvos
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

      // Adicionando o novo filme ao usuário logado
      let userMovies = usersList[userIndex].movies || [];
      const newMovie = {
        ...movieData,
        image: movieImages[movieData.title] || require("../../assets/vader.png"),
      };

      userMovies.push(newMovie);
      usersList[userIndex].movies = userMovies;

      // Salvando novamente os usuários com a nova lista de filmes
      await AsyncStorage.setItem("users", JSON.stringify(usersList));

      // Atualizando a interface
      setMovieList(userMovies);
      setMovieTitle(""); // Limpar o campo de busca
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