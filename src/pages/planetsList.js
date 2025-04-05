import React from "react";
import { FlatList, Text, View, Image, StyleSheet } from "react-native";
import api from "../service/api";

export default function PlanetsList() {
  const [planets, setPlanets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchAllPlanets(url = "planets/", accumulated = []) {
      try {
        const response = await api.get(url);
        const newPlanets = response.data.results;
        const allPlanets = [...accumulated, ...newPlanets];
  
        if (response.data.next) {
          const nextPage = response.data.next.replace("https://swapi.dev/api/", "");
          await fetchAllPlanets(nextPage, allPlanets); 
        } else {
          setPlanets(allPlanets);
          setLoading(false);
        }
      } catch (error) {
        console.error("Erro ao buscar planetas:", error);
        setLoading(false);
      }
    }
  
    fetchAllPlanets();
  }, []);
  

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Image
            source={require("../../assets/mandalorianoLoadingGif.gif")}
            style={styles.loadingGif}
          />
          <Text style={styles.loadingText}>Carregando Planetas...</Text>
        </View>
      ) : (
        <FlatList
          data={planets}
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
