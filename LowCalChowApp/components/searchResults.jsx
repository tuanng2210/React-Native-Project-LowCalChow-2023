import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SearchResultsScreen = ({ route }) => {
  const { searchResults } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Results</Text>
      {searchResults.map((result) => (
        <View style={styles.resultItem} key={result.id}>
          <Text style={styles.itemName}>{result.item_name}</Text>
          <Text>Calories: {result.calories}</Text>
          <Text>Price: ${result.price}</Text>
          <Text>Restaurant: {result.restaurant.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default SearchResultsScreen;
