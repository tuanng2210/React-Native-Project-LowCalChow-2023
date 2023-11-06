import React, { useState, useEffect } from "react";
import { View, Keyboard, Button, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/FontAwesome";

const Stack = createNativeStackNavigator();

function Search({ navigation, route }) {
    const { access } = route.params;
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
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
                <Text style={styles.title}>Search</Text>
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
                {!clicked && <Text style={styles.title}>Search for a Meal Item</Text>}
                <SearchBar
                    searchPhrase={searchPhrase}
                    setSearchPhrase={setSearchPhrase}
                    clicked={clicked}
                    setClicked={setClicked}
                />
                {/*{!clicked && <Text style={styles.title}> Quick Search </Text>}
                <SearchBar
                    searchPhrase={searchPhrase}
                    setSearchPhrase={setSearchPhrase}
                    clicked={clicked}
                    setClicked={setClicked}
                />
                <Text style={styles.title}>Advanced Search</Text>*/}
            </View>
        </View>

    );
};
const AdvancedSearch = ({ }) => {
    return (
        <View style={styles.container}>

        </View>
    );
};

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setCLicked }) => {
    return (
        <View style={styles.container}>
            <View
                style={
                    clicked
                        ? styles.searchBar__clicked
                        : styles.searchBar__unclicked
                }
            >
                <Feather
                    name="search"
                    size={20}
                    color="black"
                    style={{ marginLeft: 1 }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={searchPhrase}
                    onChangeText={setSearchPhrase}
                    onFocus={() => {
                        setClicked(true);
                    }}
                />
                {clicked && (
                    <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
                        setSearchPhrase("")
                    }} />
                )}
            </View>
            {clicked && (
                <View>
                    <Button
                        title="Cancel"
                        onPress={() => {
                            Keyboard.dismiss();
                            setClicked(false);
                        }}
                    ></Button>
                </View>
            )}
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    mainContent: {
        padding: 20,
        backgroundColor: "#fff",
        justifyContent: "top",
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
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
        alignItems: "left",
        flexDirection: "row", // Align icon and text horizontally
    },
    navbarText: {
        color: "#000000",
        fontSize: 30,
        fontWeight: "bold",
        marginLeft: 10,
    },
    searchBar__unclicked: {
        padding: 10,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#f0f8ff",
        borderRadius: 15,
        alignItems: "center",
    },
    searchBar__clicked: {
        padding: 10,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
    },
});
export default Search;