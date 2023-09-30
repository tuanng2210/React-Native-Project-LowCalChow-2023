import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/FontAwesome";

const Stack = createNativeStackNavigator();

function PatronHomepage({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navbarItem}
          onPress={() => navigation.navigate("Search")}
        >
          <Icon name="search" size={24} color="#000000" />
          <Text style={styles.navbarText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navbarItem}
          onPress={() => navigation.navigate("Favorites")}
        >
          <Icon name="heart" size={24} color="#000000" />
          <Text style={styles.navbarText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navbarItem}
          onPress={() => navigation.navigate("Favorites")}
        >
          <Icon name="gear" size={24} color="#000000" />
          <Text style={styles.navbarText}>Settings</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainContent}>
        <Text style={styles.title}>LowCalChow</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ff7f50",
    flexDirection: "column",
  },
  navbarItem: {
    backgroundColor: "#ff7f50",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 12,
    flexDirection: "row", // Align icon and text horizontally
  },
  navbarText: {
    flex: 1,
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    flexDirection: "column",
  },
  mainContent: {
    flex: 2,
    padding: 20,
    backgroundColor: "##ffe4b5",
  },
  title: {
    flex: 1,
    fontSize: 24,
    backgroundColor: "#fff",
    fontWeight: "bold",
  },
},
);

export default PatronHomepage;
