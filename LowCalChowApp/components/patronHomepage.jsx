import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/FontAwesome";

const Stack = createNativeStackNavigator();

function PatronHomepage({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <TouchableOpacity
          style={styles.sidebarItem}
          onPress={() => navigation.navigate("Search")}
        >
          <Icon name="search" size={24} color="#000000" />
          <Text style={styles.sidebarText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem}
          onPress={() => navigation.navigate("Favorites")}
        >
          <Icon name="heart" size={24} color="#000000" />
          <Text style={styles.sidebarText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem}
          onPress={() => navigation.navigate("Favorites")}
        >
          <Icon name="gear" size={24} color="#000000" />
          <Text style={styles.sidebarText}>Settings</Text>
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
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: 175,
    backgroundColor: "#00fa9a",
    padding: 20,
  },
  sidebarItem: {
    backgroundColor: "#00fa9a",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 12,
    flexDirection: "row", // Align icon and text horizontally
  },
  sidebarText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    flexDirection: "row",
  },
  mainContent: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    flex: 1,
    fontSize: 24,
    backgroundColor: "#ff7f50",
    fontWeight: "bold",
  },
},
);

export default PatronHomepage;
