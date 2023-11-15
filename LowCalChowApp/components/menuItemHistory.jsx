import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import MenuComponent from './menuItemComponent';
import {useIsFocused} from '@react-navigation/native';
import logo from "../assets/icons8-carrot-94.png";

function MenuItemHistory ({navigation, route }) {
  const isFocused = useIsFocused();
  const { access } = route.params;
  const [mhItems, setMhItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const ScreenName = "View Menu Item";
  const handlegetMenuItems = async () => {
    try{
      const response = await fetch(`http://localhost:8000/patrons/menuitemhistory/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access,
      },
    });
    
   
    if (response.ok) 
    {
      const data = await response.json();
      setMhItems(data);
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

  useEffect (() => {
    setMenuItems(mhItems.map(item => item.menu_item));
  }, [mhItems]); 

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
        <Text style={styles.navbarText}>Menu Item History</Text>
        </View>
        <TouchableOpacity style={styles.navbarItem}
          onPress={() => navigation.navigate("Bookmark", { access })}
        >
          <Icon name="bookmark" size={25} color="#000000" />
        </TouchableOpacity>
      </View>
      <ScrollView>
      <View style={styles.mainContent}>
      {menuItems.length > 0 && (
      <MenuComponent menuItems={menuItems} accessToken={access} screenName={ScreenName}/>
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
};
{/*{
		{
		"id": 1,
		"menu_item": {
			"id": 2,
			"item_name": "Chocolate Ice Cream Cone with Nuts",
			"calories": 300,
			"average_rating": "1.00",
			"price": "4.75",
			"restaurant": {
				"id": 1,
				"name": "Monarch Wings and Things",
				"price_level": "$"
			}
} */}

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
    flex: 2,
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
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  buttonContainer: {
    flex: "end",
    flexDirection: "row",
    backgroundColor: "#FFA500",
    width: "100%",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default MenuItemHistory;
