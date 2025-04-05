import React from "react";
import { FlatList, Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../service/api";

export default function StarshipsList() {
  const [starships, setStarships] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchAllStarships(url = "starships/", accumulated = []) {
      try {
        const response = await api.get(url);
        const newStarships = response.data.results;
        const allStarships = [...accumulated, ...newStarships];

        if (response.data.next) {
          const nextPage = response.data.next.replace("https://swapi.dev/api/", "");
          await fetchAllStarships(nextPage, allStarships); // await aqui!
        } else {
          setStarships(allStarships);
          setLoading(false);
        }
      } catch (error) {
        console.error("Erro ao buscar espaçonaves:", error);
        setLoading(false);
      }
    }

    fetchAllStarships();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Image
            source={require("../../assets/mandalorianoLoadingGif.gif")}
            style={styles.loadingGif}
          />
          <Text style={styles.loadingText}>Carregando espaçonaves...</Text>
        </View>
      ) : (
        <FlatList
          data={starships}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
            >
              <Text style={styles.title}>{item.name}</Text>
            </TouchableOpacity>
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
