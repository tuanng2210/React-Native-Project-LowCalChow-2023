import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {WebView} from 'react-native-webview';
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

function Bookmark({ navigation, route }) {
    const { access } = route.params;
    const isFocused = useIsFocused();
    const [bmItems, setBmItem] = useState ([]);
    var bookmarks = []

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
        console.log(bmItems[i].menu_item.item_name);
        bookmarks.push(
            <View style={styles.bookmark}>
                <Text>{bmItems[i].menu_item.item_name}</Text>
            </View>
        )

      }

      useEffect(() => {
        if (isFocused) {
          bookmarkedItems();
        }
      }, [isFocused]);

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
                
                <Text style={styles.navbarText}>Bookmarks</Text>
               
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
            <Image source={logo} style={{ width: 30, height: 30 }} />
                {bookmarks}
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
    bookmark: {
        backgroundColor:"#fcdb9d",
        borderRadius:8,
        marginBottom: 20,
        padding: 20,
        width: 500
    }
},
);
export default Bookmark;