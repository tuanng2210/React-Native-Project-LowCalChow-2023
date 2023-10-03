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
    flex: 1,
    flexDirection: "column",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ff7f50",
    padding: 10
  },
  navbarItem: {
    backgroundColor: "#ff7f50",
    alignItems: "center",
    flexDirection: "row", // Align icon and text horizontally
  },
  navbarText: {
    color: "#000000",
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 10,
  },
  mainContent: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "top",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
},
);

export default PatronHomepage;
