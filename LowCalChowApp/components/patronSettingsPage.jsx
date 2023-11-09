import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";
import logo from "../assets/icons8-carrot-94.png";

function PatronSettingsPage({ navigation, route }) {
  const { access } = route.params;
  const [profile, setProfile] = useState([]);
  const isFocused = useIsFocused();
  const [tasteTags, setTasteTags] = useState([]);

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
        setTasteTags(data.length > 0 ? data[0].patron_taste_tag : []);
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
        <Text style={styles.title}>Settings</Text>
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
      <View style={styles.resultItem}>
      <Text style={styles.mainText}>Name: {profile.name}
      </Text>
      <Text style={styles.mainText}>Gender: {profile.gender}
      </Text>
      <Text style={styles.mainText}>Zip Code: {profile.zipcode}
      </Text>
      {/* <Text style={styles.mainText}>Restrictions: {profile.patron_restriction_tag}
      </Text>
      <Text style={styles.mainText}>Allergies: {profile.patron_allergy_tag}
      </Text>

      <Text style={styles.mainText}>Desired Taste Tags:
          {tasteTags.map(tag => (
            <View key={tag.id}>
              <Text> {tag.title}</Text>
              </View> ))}
      </Text>
      <Text style={styles.mainText}>Disliked Ingredients: {profile.disliked_ingredients}
      </Text> */}
      <Text style={styles.mainText}>Price Preference: {profile.price_max}
      </Text>
      <Text style={styles.mainText}>Zipcode: {profile.zipcode}
      </Text>
      <Text style={styles.mainText}>Date of Birth: {profile.dob}
      </Text>
      <Text style={styles.mainText}>Calorie Limit: {profile.calorie_limit}
      </Text>
      </View>
      <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Patron Profile Edit Page", { access })}>
          <Icon name="edit" size={20} color="#000000" />
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <Button
        title="Log Out"
        onPress={() => navigation.navigate(("Login"))}
      />
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
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 10,
  },
  buttonText: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  mainContent: {
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "top",
    alignItems: "center",
    
  },
  patronItem: {
    backgroundColor: 'rgba(255, 165, 0, 0.5)',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    flexDirection: "row",
  },
  titleContent: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    justifyContent: "top",
    alignItems: "left",
  },
  mainText: {
    backgroundColor: "#fff",
    fontSize: 20,
    padding: 10,
  },
  button: {
    backgroundColor: "#FFA500",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
    width: "25%",
  }
},
);
export default PatronSettingsPage;