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
    flexDirection: "row-reverse",
  },
  navbar: {
   flex: 1,
   alignItems: "center",
   justifyContent: "center",
   padding: 20,
  },
  navbarItem: {
    backgroundColor: "#ff7f50",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row", // Align icon and text horizontally
  },
  navbarText: {
    flex: 2,
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    flexDirection: "row",
    marginLeft: 10,
  },
  mainContent: {
    flex: 3,
    padding: 20,
    backgroundColor: "#ff7f50",
  },
  title: {
    flex: 3,
    fontSize: 24,
    backgroundColor: "#ff7f50",
    fontWeight: "bold",
  },
},
);

export default PatronHomepage;
