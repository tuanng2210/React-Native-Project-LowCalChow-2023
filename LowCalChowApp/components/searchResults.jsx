import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import logo from "../assets/icons8-carrot-94.png";
import MenuComponent from './menuItemComponent';


const SearchResultsScreen = ({navigation, route }) => {
  const { searchResults } = route.params;
  const { access } = route.params;
  const [bookmarkItem, setBookmarkItem] = useState ([]);
  const ScreenName = "View Menu Item";

  const handleSubmit = async () => {
    try {
      const bookmarkItem = {
        menu_item: bookmarkItem,
      };
      const response = await fetch(
        "http://localhost:8000/patrons/bookmarks/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookmarkItem),
        }
      );
  
      if (response.ok) {
        console.log("Bookmark added successfully.");
        const responseData = await response.json();
        setBookmark(responseData.results);
        navigation.navigate("Bookmark", {
          bookmarkItem: responseData.results,
        });
        console.log("Data received from the server:", responseData);
        setBookmark("");
    }
    else {
      console.error("Error adding bookmark", error);
    }
  }catch (error) {
    console.error("Error adding bookmark", error);
  }
  };
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
        <Text style={styles.navbarText}>Search Results</Text>
        </View>
        <TouchableOpacity style={styles.navbarItem}
          onPress={() => navigation.navigate("Bookmark", { access })}
        >
          <Icon name="bookmark" size={25} color="#000000" />
        </TouchableOpacity>
      </View>
      <ScrollView>
      <View style={styles.mainContent}>
     {/* {searchResults.map((result) => (
        <View style={styles.mainContent}>*/}
      {searchResults.length > 0 && (
      <MenuComponent menuItems={searchResults} accessToken={access} screenName={ScreenName}/>
      )}
    </View>

      ),{/*<View style={styles.resultItem} key={result.id}>
          <Text style={styles.itemName}>{result.item_name}</Text>
          <Text>Calories: {result.calories}</Text>
          <Text>Price: ${result.price}</Text>
          <Text>Restaurant: {result.restaurant.name}</Text>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      <Icon name="bookmark" size={25} color="#000000" />
        </TouchableOpacity>
        </View>*/}
      
      )
      
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
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
    width: "40%",
    alignItems: "center", 
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

export default SearchResultsScreen;
