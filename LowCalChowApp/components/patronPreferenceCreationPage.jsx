import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list'
import { useRoute } from "@react-navigation/native";



function PatronPreferenceCreationPage({navigation}) {

  const route = useRoute()
  data = route.params?.data

  const restrictionsTags = [
    { label: 'Vegan', value: 1 },
    { label: 'Vegitarian', value: 2 },
    { label: 'Halal', value: 3 },
    { label: 'Kosher', value: 4 },
    { label: 'Keto', value: 5 },
    { label: 'Pescetarian', value: 6 },
    { label: 'Dairy-free', value: 7 },
    { label: 'Paleo', value: 8 },
  ];

  const allergyTags = [
    { label: 'Milk', value: 1 },
    { label: 'Sesame', value: 2 },
    { label: 'Soybeans', value: 3 },
    { label: 'Wheat', value: 4 },
    { label: 'Peanuts', value: 5 },
    { label: 'Tree-nuts', value: 6 },
    { label: 'Eggs', value: 7 },
    { label: 'Shellfish', value: 8 },
    { label: 'Fish', value: 9 },
    { label: 'Celiac', value: 10 },
  ];

  const tasteTags = [
    { label: 'Sweet', value: 2 },
    { label: 'Spicy', value: 3 },
    { label: 'Umami', value: 4 },
    { label: 'Salty', value: 1 },
    { label: 'Sour', value: 5 },
    { label: 'Bitter', value: 6 },
  ];

  const [errors, setErrors] = useState({});
  const [restrictions, setRestrictions] = useState({});
  const [allergies, setAllergies] = useState({});
  const [taste, setTaste] = useState({});

  const handleSubmit = () => {

    auth_data = {
      email: data.email,
      password: data.password
    }

    data = {
      data,
      patron_restriction_tag: restrictions,
      patron_allergy_tag: allergies,
      patron_taste_tag: taste
    }


    console.log(data);


    //create access token
    fetch("http://localhost:8000/auth/jwt/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auth_data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Handle the API response here
        console.log("API response:", responseData);

        if (responseData.message === "success") {
          // The signup was successful, you can navigate to a success screen or perform other actions
          const {refresh, access} = responseData.content;
          console.log("Access token:", { access });
        } else {
          // Handle any error messages returned by the API
          console.log("Message :", responseData.message);
          // You can display an error message to the user if needed
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });


    // fetch("http://localhost:8000/auth/signup/patron/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => response.json())
    //   .then((responseData) => {
    //     // Handle the API response here
    //     console.log("API response:", responseData);

    //     if (responseData.message === "success") {
    //       // The signup was successful, you can navigate to a success screen or perform other actions
    //       const { email, username, user_type } = responseData.content;
    //       console.log("User details:", { email, username, user_type });
    //       navigation.navigate("Patron Homepage");
    //     } else {
    //       // Handle any error messages returned by the API
    //       console.log("Message :", responseData.message);
    //       // You can display an error message to the user if needed
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's pick your preferences</Text>

      <Text>Dietary Restrictions?</Text>
      <MultipleSelectList 
            setSelected={({val}) => setRestrictions({val})} 
            data={restrictionsTags} 
            save="key"
            label="Restrictions"
            boxStyles={{backgroundColor: '#FDAA3A', borderRadius: 45}}
            dropdownStyles={{backgroundColor: '#FECA83'}}
      />

      <Text>Allergies?</Text>
      <MultipleSelectList 
            setSelected={({val}) => setAllergies({val})} 
            data={allergyTags} 
            save="key"
            //onSelect={() => alert(allergiesSelect)} 
            label="Allergy"
            boxStyles={{backgroundColor: '#FDAA3A', borderRadius: 45}}
            dropdownStyles={{backgroundColor: '#FECA83'}}
      />

    <Text>Taste Preferences?</Text>
      <MultipleSelectList 
            setSelected={({val}) => setTaste({val})} 
            data={tasteTags} 
            save="key"
            //onSelect={() => alert(allergiesSelect)} 
            label="Taste"
            boxStyles={{backgroundColor: '#FDAA3A', borderRadius: 45}}
            dropdownStyles={{backgroundColor: '#FECA83'}}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <Button
        title="Back"
        onPress={() => navigation.navigate("Patron Profile Creation Page")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "orange",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
    width: 100,
},
  buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
  },
  error: {
      color: 'red',
      fontSize: 20,
      marginBottom: 12,
  }
});

export default PatronPreferenceCreationPage;
