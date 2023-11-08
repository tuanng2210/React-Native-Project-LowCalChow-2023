import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

const SearchResultsScreen = ({navigation, route }) => {
  const { searchResults } = route.params;
  const { access } = route.params;

  return (

    <View style={styles.container}>
    <View style={styles.navbar}>
        <TouchableOpacity style={styles.navbarItem}
          onPress={() => navigation.navigate("Patron Settings Page", { access })}
        >
          <Icon name="gear" size={24} color="#000000" />
          <Text style={styles.navbarText}></Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navbarItem}
          onPress={() => navigation.navigate("Bookmark", { access })}
        >
          <Icon name="bookmark" size={25} color="#000000" />
          <Text style={styles.navbarText}></Text>
        </TouchableOpacity>
        <Text style={styles.title}>Search Results</Text>
        <TouchableOpacity
          style={styles.navbarItem}
          onPress={() => navigation.navigate("Patron Homepage", { access })}
        >
          <Icon name="home" size={24} color="#000000" />
          <Text style={styles.navbarText}></Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navbarItem}
          onPress={() => navigation.navigate("Search", { access })}
        >
          <Icon name="search" size={24} color="#000000" />
          <Text style={styles.navbarText}></Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainContent}>
      {searchResults.map((result) => (
        <View style={styles.resultItem} key={result.id}>
          <Text style={styles.itemName}>{result.item_name}</Text>
          <Text>Calories: {result.calories}</Text>
          <Text>Price: ${result.price}</Text>
          <Text>Restaurant: {result.restaurant.name}</Text>
        </View>
        
      ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  mainContent: {
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "top",
    alignItems: "center",
  },
  resultItem: {
    backgroundColor: 'rgba(255, 165, 0, 0.5)',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFA500",
    padding: 10,
  },
  navbarItem: {
    backgroundColor: "#FFA500",
    alignItems: "left",
    flexDirection: "row", // Align icon and text horizontally
  },
  navbarText: {
    color: "#000000",
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default SearchResultsScreen;
