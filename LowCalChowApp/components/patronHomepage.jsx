import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import logo from "../assets/icons8-carrot-94.png";
import MenuComponent from "./menuItemComponent";
import {useIsFocused} from '@react-navigation/native';

function PatronHomepage({ navigation, route }) {
  const isFocused = useIsFocused();
  const { access } = route.params;
  const [sfItems, setSfItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const ScreenName = "View Menu Item";

  const handlegetMenuItems = async () => {
    try{

      const response = await fetch(`http://localhost:8000/patrons/suggestions/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access,
      },
    });
    
   
    if (response.ok) 
    {
      const data = await response.json();
      setSfItems(data);
      console.log(menuItems);
    } 

  }catch (error) {
    console.error("Error:", error);
  }
} 
useEffect (() => {
  if(isFocused)
  {
    handlegetMenuItems();
  }

}, [isFocused]); 
  console.log(menuItems);

 


  return (

    <View style={styles.container}>
      <View style={styles.navbar}>
       <TouchableOpacity style={styles.navbarItem}
          onPress={() => navigation.navigate("Patron Settings Page", { access })}
        >
          <Icon name="gear" size={24} color="#000000" />
        </TouchableOpacity>

        
        <View style={styles.navbarItem}>
        <Image source={logo} style={{ width: 30, height: 30 }} />
        <Text style={styles.navbarText}>LowCalChow</Text>
        </View>
        <TouchableOpacity style={styles.navbarItem}
          onPress={() => navigation.navigate("Bookmark", { access })}
        >
          <Icon name="bookmark" size={25} color="#000000" />
        </TouchableOpacity>

      </View>
      <ScrollView> 
      <View style={styles.mainContent}>

        <Text style={styles.title}>Suggestion Feed</Text>
       
        {sfItems.length > 0 && (
      <MenuComponent menuItems={sfItems} accessToken={access} screenName={ScreenName}/>
      )}
      </View>
      </ScrollView> 
      <View style={styles.buttonContainer}>
       
        <TouchableOpacity
          style={styles.navbarItem}
          onPress={() => navigation.navigate("Patron Homepage", { access })}
        >
          <Icon name="home" size={26} color="#000000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navbarItem}
          onPress={() => navigation.navigate("Search", { access })}
        >
          <Icon name="search" size={24} color="#000000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navbarItem}
          onPress={() => navigation.navigate("Menu Item History", { access })}
        >
          <Icon name="book" size={24} color="#000000" />
        </TouchableOpacity>
        </View>
</View>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
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
    alignItems: "center",
    flexDirection: "row", // Align icon and text horizontally
  },
  navbarText: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  mainContent: {
    padding: 20,
    flex: 2,
    backgroundColor: "#fff",
    justifyContent: "top",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonText: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#FFA500",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
    width: "25%",
  },
  buttonContainer: {
    flex: "end",
    flexDirection: "row",
    backgroundColor: "#FFA500",
    width: "100%",
    justifyContent: "space-around",
    padding: 10,
  },
},
);

export default PatronHomepage;
