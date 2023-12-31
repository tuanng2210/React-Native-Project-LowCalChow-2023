import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";
import logo from "../assets/icons8-carrot-94.png";
import AppSatisfactionFeedback from "./appSatisfactionFeedback";


function PatronSettingsPage({ navigation, route }) {
  const { access } = route.params;
  const [profile, setProfile] = useState([]);
  const isFocused = useIsFocused();
  const [tasteTags, setTasteTags] = useState([]);
  const [allergyTags, setAllergyTags] = useState([]);
  const [restrictionTags, setRestrictionTags] = useState([]);
  const [dislikedIngredients, setDislikedIngredients] = useState([]);

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
        setAllergyTags(data.length > 0 ? data[0].patron_allergy_tag : []);
        setRestrictionTags(data.length > 0 ? data[0].patron_restriction_tag : []);
        setDislikedIngredients(data.length > 0 ? data[0].disliked_ingredients : []);
        
      } else {
        //setError("Error fetching data");
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
        </TouchableOpacity>
        <View style={styles.navbarItem}>
        <Image source={logo} style={{ width: 30, height: 30 }} />
        <Text style={styles.navbarText}>Settings</Text>
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
      
      <View style={styles.resultItem}>
      <Text style={styles.mainText}>Name: {profile.name}
      </Text>
      <Text style={styles.mainText}>Gender: {profile.gender}
      </Text>
      <Text style={styles.mainText}>Zip Code: {profile.zipcode}
      </Text>

      <Text style={styles.mainText}>Restrictions:
          {restrictionTags.map(tag => (
            <View style={styles.tagBubble} key={tag.id}>
              <Text style={styles.tagText}> {tag.title}</Text>
              </View> ))}
      </Text>

      <Text style={styles.mainText}>Allergies:
          {allergyTags.map(tag => (
            <View style={styles.tagBubble} key={tag.id}>
              <Text style={styles.tagText}> {tag.title}</Text>
              </View> ))}
      </Text>

      <Text style={styles.mainText}>Desired Taste Tags:
          {tasteTags.map(tag => (
           <View style={styles.tagBubble} key={tag.id}>
              <Text style={styles.tagText}> {tag.title}</Text>
              </View> ))}
      </Text>

      <Text style={styles.mainText}>Disliked Ingredients:
          {dislikedIngredients.map(tag => (
           <View style={styles.tagBubble} key={tag.id}>
              <Text style={styles.tagText}> {tag.title}</Text>
              </View> ))}
      </Text>
      
      <Text style={styles.mainText}>Max Price: {profile.price_max}
      </Text>
      <Text style={styles.mainText}>Zipcode: {profile.zipcode}
      </Text>
      <Text style={styles.mainText}>Date of Birth: {profile.dob}
      </Text>
      <Text style={styles.mainText}>Calorie Limit: {profile.calorie_limit}
      </Text>  
      </View>
      <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate("Patron Profile Edit Page", { access })}>
          {/*<Icon style= {styles.buttonIcon} name="edit" size={20} color="#000000" paddingLeft="15"  />*/}
          <Text style={styles.buttonText}> Edit Profile</Text>
        </TouchableOpacity>
</View>

<View style={styles.feedbackButton}>
        <AppSatisfactionFeedback navigation={navigation} access={access}/>
        </View>
        <View style={styles.mainContent}>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate(("Login"))}>
        <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        

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
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  feedbackButton:{
    justifyContent: "center",
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
    fontSize: 24,
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
    backgroundColor: 'rgba(255, 165, 0, 0.5)',
    fontSize: 20,
    padding: 10,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#FFA500",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    alignContent: "center",
    marginTop: 12,
    marginBottom: 12,
    width: "30%",
    flexDirection: "row",
    padding: 10,
  },
  logoutButton: {
    
      backgroundColor: "#FFA500",
      borderRadius: 8,
      paddingVertical: 10,
      alignItems: "center",
      width: "30%",
  },
 
  buttonText: {
    color: "#000000",
    fontSize: 16,
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
  resultItem: {
    width:"40%",
    justifyContent: "left",
    marginBottom: 20
  },
  tagBubble: {
    backgroundColor: '#44E342', // Background color for the tag bubble
    borderRadius: 20, // Border radius to create a circular shape
    paddingHorizontal: 10, // Horizontal padding to provide some space around the text
    paddingVertical: 5, // Vertical padding to provide some space around the text
    margin: 5, // Margin between tag bubbles
  },
  tagText: {
    fontSize: 14,
    color: 'black',
  },
},
);
export default PatronSettingsPage;