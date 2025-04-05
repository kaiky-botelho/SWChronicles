import React from "react";
import { FlatList, Text, View, Image, StyleSheet } from "react-native";
import api from "../service/api";

export default function CharactersList() {
  const [characters, setCharacters] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchAllCharacters(url = "people/", accumulated = []) {
      try {
        const response = await api.get(url);
        const newCharacters = response.data.results;
        const allCharacters = [...accumulated, ...newCharacters];

        if (response.data.next) {
          const nextPage = response.data.next.replace("https://swapi.dev/api/", "");
          fetchAllCharacters(nextPage, allCharacters);
        } else {
          setCharacters(allCharacters);
          setLoading(false);
        }
      } catch (error) {
        console.error("Erro ao buscar personagens:", error);
        setLoading(false);
      }
    }

    fetchAllCharacters();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Image
            source={require("../../assets/mandalorianoLoadingGif.gif")}
            style={styles.loadingGif}
          />
          <Text style={styles.loadingText}>Carregando personagens...</Text>
        </View>
      ) : (
        <FlatList
          data={characters}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.name}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFBEC",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 20,
    color: "#394F9A",
    fontWeight: "bold",
    paddingLeft: 10,
  },
  loadingGif: {
    width: 200,
    height: 100,
  },
  loadingText: {
    fontSize: 18,
    color: "#394F9A",
    marginTop: 10,
  },
});
