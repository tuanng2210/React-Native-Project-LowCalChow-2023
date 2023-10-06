import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";


const Stack = createNativeStackNavigator();

function PatronSettingsPage({ navigation, route }) {
  const { access } = route.params;
  const [profile, setProfile] = useState([]);
  const isFocused = useIsFocused();

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
        setProfile(data.length > 0 ? data[0] : {}); // Update profile with fetched data
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

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navbarItem}
          onPress={() => navigation.navigate("Edit", { access })}>
          <Icon name="edit" size={40} color="#000000" />
          <Text style={styles.navbarText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainContent}>
        <Text style={styles.title}>LowCalChow Settings</Text>
        <Text style={styles.mainText}>Name: {profile.name}
        </Text>
        <Text style={styles.mainText}>Gender: {profile.gender}
        </Text>
        <Text style={styles.mainText}>Price Preference: {profile.price_preference}
        </Text>
        <Text style={styles.mainText}>Zipcode: {profile.zipcode}
        </Text>
        <Text style={styles.mainText}>Date of Birth: {profile.dob}
        </Text>
        <Text style={styles.mainText}>Calorie Limit: {profile.calorie_limit}
        </Text>
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
    backgroundColor: "#fff",
    justifyContent: "top",
    alignItems: "left",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  mainText: {
    fontSize: 20,
  }
},
);
export default PatronSettingsPage;