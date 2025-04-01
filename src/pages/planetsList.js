import React from "react";
import { FlatList, Text, View, Image, StyleSheet } from "react-native";
import api from "../service/api";

export default function PlanetsList() {
  const [planets, setPlanets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchPlanets() {
      try {
        const response = await api.get("planets/");
        setPlanets(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    fetchPlanets();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Image
            source={require("../../assets/mandalorianoLoadingGif.gif")}
            style={styles.loadingGif}
          />
          <Text style={styles.loadingText}>Carregando...</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 20,
    color: "#394F9A",
    fontWeight: "bold",
    paddingLeft: 10,
  },
  details: {
    fontSize: 16,
    color: "#394F9A",
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
