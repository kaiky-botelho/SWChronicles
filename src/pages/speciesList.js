import React, { useEffect, useState } from "react";
import { FlatList, Text, View, Image, StyleSheet } from "react-native";
import api from "../service/api";

export default function SpeciesList() {
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllSpecies(url = "species/", accumulated = []) {
      try {
        const response = await api.get(url);
        const newSpecies = response.data.results;
        const allSpecies = [...accumulated, ...newSpecies];

        if (response.data.next) {
          const nextPage = response.data.next.replace("https://swapi.dev/api/", "");
          fetchAllSpecies(nextPage, allSpecies);
        } else {
          setSpecies(allSpecies);
          setLoading(false);
        }
      } catch (error) {
        console.error("Erro ao buscar espécies:", error);
        setLoading(false);
      }
    }

    fetchAllSpecies();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Image
            source={require("../../assets/mandalorianoLoadingGif.gif")}
            style={styles.loadingGif}
          />
          <Text style={styles.loadingText}>Carregando Espécies...</Text>
        </View>
      ) : (
        <FlatList
          data={species}
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
