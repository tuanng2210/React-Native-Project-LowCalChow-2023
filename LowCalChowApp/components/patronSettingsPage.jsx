import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native"; 

const isFocused = useIsFocused();
const Stack = createNativeStackNavigator();
const [profile, setprofile] = useState([]);
const { access } = route.params;

const fetchProfile = async () => {
  try {
    const response = await fetch("http://localhost:8000/patrons/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setProfile(data); // Update profile with fetched data
    } else {
      setError("Error fetching data");
    }
  } catch (error) {
    setError("Error fetching data");
  }
};

useEffect(() => {
  if (isFocused) {
    fetchProfile();
  }
}, [isFocused]);

function PatronSettingsPage({ }) {
    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <TouchableOpacity style={styles.navbarItem}
                    onPress={() => navigation.navigate("Edit")}>
                    <Icon name="edit" size={40} color="#000000" />
                    <Text style={styles.navbarText}>Edit</Text>
                </TouchableOpacity>
                <View style={styles.mainContent}>
                    <Text style={styles.title}>LowCalChow Settings</Text>
                </View>
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
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ff7f50",
      padding: 10,
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
      backgroundColor: "#ff7f50",
      justifyContent: "top",
      alignItems: "center",
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
    },
  },
  );
  export default PatronSettingsPage;