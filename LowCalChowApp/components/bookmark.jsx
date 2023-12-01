import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {WebView} from 'react-native-webview';
import MenuComponent from "./menuItemComponent";
import Icon from "react-native-vector-icons/FontAwesome";
import logo from "../assets/icons8-carrot-94.png";

function bmInputhandler(){
    setAnotherBmItem();
}
function addBmItem(){
    setBmItem((currentBmItem) => [
        ...currentBmItem,
        anotherBmItem,
      ]);
};

function removeBookmark(id, access){

    try {
        const response = fetch(`http://localhost:8000/patrons/bookmarks/${id}/`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
  
        if (response.ok) {
            alert("Bookmark removed.")
        } else {
          console.log("Error removing bookmark");
        }
      } catch (error) {
        console.log("Error removing bookmark");
      }

}

function Bookmark({ navigation, route }) {
    const { access } = route.params;
    const isFocused = useIsFocused();
    const [bmItems, setBmItem] = useState ([]);
    const [bookmarkItems, setBookmarkItems] = useState([]);
    const ScreenName = "View Menu Item";
    var bookmarks = []
    var bookmarkIDs = []

    const bookmarkedItems = async () => {

        try {
          const response = await fetch("http://localhost:8000/patrons/bookmarks/", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${access}`,
            },
          });
    
          if (response.ok) {
            const data = await response.json();
            setBmItem(data); 
          } else {
            setError("Error fetching data");
          }
        } catch (error) {
          setError("Error fetching data");
        }
      };

      for(var i = 0; i < bmItems.length; i++){

        bookmarks.push(
            <View style={styles.bookmark} key={bookmarkIDs[i]}>
                <Text style={styles.itemName}>{bmItems[i].menu_item.item_name}</Text>
                <Text>Calories: {bmItems[i].menu_item.calories}</Text>
                <Text>Price: ${bmItems[i].menu_item.price}</Text>
                <Text>Restaurant: {bmItems[i].menu_item.restaurant.name}</Text>

                <TouchableOpacity style={styles.deleteBmButton}
                    onPress={() => removeBookmark(bookmarkIDs[i], access)}
                >
                    <Icon name="bookmark" size={25} color="#000000" />
                    <Text style={styles.navbarText}></Text>
                </TouchableOpacity>

            </View>
        )

      }

      useEffect(() => {
        if (isFocused) {
          bookmarkedItems();
        }
      }, [isFocused]);


      useEffect(() => {
        setBookmarkItems(bmItems.map(item => item.menu_item));
      }, [bmItems]);

    return (

        <View style={styles.container}>
            <View style={styles.navbar}>
                <TouchableOpacity style={styles.navbarItem}
                    onPress={() => navigation.navigate("Patron Settings Page", { access })}
                >
                    <Icon name="gear" size={24} color="#000000" />
                    <Text style={styles.navbarText}></Text>
                </TouchableOpacity>
                <View style={styles.navbarItem}>
                <Image source={logo} style={{ width: 30, height: 30 }} />
                <Text style={styles.navbarText}>Bookmarks</Text>
                </View>
                <TouchableOpacity style={styles.navbarItem}
                    onPress={() => navigation.navigate("Bookmark", { access })}
                >
                    <Icon name="bookmark" size={25} color="#000000" />
                    <Text style={styles.navbarText}></Text>
                </TouchableOpacity>
                
                
           
            </View>
            <ScrollView>
            <View style={styles.mainContent}>
               
                {bookmarkItems.length > 0 && (
                <MenuComponent menuItems={bookmarkItems} accessToken={access} screenName={ScreenName}/>
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    navbar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#FFA500",
        padding: 10
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
        flex: 2,
        padding: 20,
        backgroundColor: "#fff",
        justifyContent: "top",
        alignItems: "center",
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
    title: {
        fontSize: 30,
        fontWeight: "bold",
    },
    bookmark: {
        backgroundColor: 'rgba(255, 165, 0, 0.5)',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
      }
},
);
export default Bookmark;