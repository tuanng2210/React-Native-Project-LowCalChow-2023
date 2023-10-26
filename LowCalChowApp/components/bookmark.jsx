import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, } from "react-native";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/FontAwesome";

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
    const [bmItem, setBmItem] = useState ([]);

    const fetchBmItem = async () => {
        try {
          const response = await fetch("http://localhost:8000/restaurants/1/menuitems/", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${access}`,
            },
          });
    
          if (response.ok) {
            const data = await response.json();
            setBmItem(data.length > 0 ? data[0] : {}); 
          } else {
            setError("Error fetching data");
          }
        } catch (error) {
          setError("Error fetching data");
        }
      };
    
      useEffect(() => {
        if (isFocused) {
          fetchBmItem();
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
               {/* {bmItem.map((bmItem)=> <Text key = {bmItem}>{bmItem.id}</Text> )}*/}
               <Text style={styles.mainContent}>Item 1: {bmItem.item_name}
               </Text>
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
},
);
export default Bookmark;