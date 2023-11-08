import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import MenuComponent from './menuItemComponent';
import {useIsFocused} from '@react-navigation/native';

function MenuItemHistory ({navigation, route }) {const isFocused = useIsFocused();
  const { access } = route.params;
  const [menuItems, setMenuItems] =useState([]);
  const ScreenName = "View Menu Item";
  const handlegetMenuItems = async () => {
    try{
      const response = await fetch(`http://localhost:8000/patrons/menuitemhistory/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + access,
      },
    });

    if (response.ok) 
    {
      const data = await response.json();
      setMenuItems(data.length > 0 ? data[0].menu_item : []);
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
          <Text style={styles.navbarText}></Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navbarItem}
          onPress={() => navigation.navigate("Bookmark", { access })}
        >
          <Icon name="bookmark" size={25} color="#000000" />
          <Text style={styles.navbarText}></Text>
        </TouchableOpacity>
        <Text style={styles.title}>Menu Item History</Text>
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

      <MenuComponent menuItems={menuItems} accessToken={access} screenName={ScreenName}/>
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

export default MenuItemHistory;
