import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list'
import { useRoute } from "@react-navigation/native";



function PatronPreferenceCreationPage({navigation}) {

  const route = useRoute()
  var data = route.params?.data
  const access = route.params?.access

  const restrictionsTags = [
    { label: 1, value: "Vegan" },
    { label: "Vegetarian", value: "Vegetarian" },
    { label: "Halal", value: "Halal" },
    { label: "Kosher", value: "Kosher" },
    { label: 'Keto', value: 'Keto' },
    { label: "Pescetarian", value: "Pescetarian" },
    { label: "Dairy-Free", value: "Dairy-Free" },
    { label: "Paleo", value: "Paleo" }
  ];

  const allergyTags = [
    { label: "Milk", value: "Milk" },
    { label: "Sesame" , value: "Sesame" },
    { label: "Soybeans", value: "Soybeans" },
    { label: "Wheat", value: "Wheat" },
    { label: "Peanuts" , value: "Peanuts" },
    { label: "Tree-nuts", value: "Tree-nuts" },
    { label: "Eggs", value: "Eggs" },
    { label: "Shellfish" , value: "Shellfish" },
    { label: "Fish", value: "Fish" },
    { label: "Celiac", value: "Celiac" }
  ];

  const tasteTags = [
    { label: 'Salty', value: 'Salty' },
    { label: "Sweet", value: "Sweet" },
    { label: "Spicy", value: "Spicy" },
    { label: "Umami", value: "Umami" },
    { label: "Sour" , value: "Sour" },
    { label: "Bitter", value: "Bitter" },
  ];

  const [errors, setErrors] = useState({});
  const [restrictions, setRestrictions] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [calorielimit, setCalorieLimit] = useState({});
  const [taste, setTaste] = useState([]);

  const handleSubmit = () => {

    let errors = {};

    if(calorielimit == {}){
      setCalorieLimit(9999);
    }

    if(Object.keys(errors).length === 0){

      var restrictionsIDs = [];
      var allergiesIDs = [];
      var tasteIDs = [];

      for(var i = 0; i < restrictions.length; i++){
        switch(restrictions[i]){
          case 'Vegan':
            restrictionsIDs.push(1)
            break;
          case 'Vegetarian':
            restrictionsIDs.push(2)
            break;
          case 'Halal':
            restrictionsIDs.push(3)
            break;
          case 'Kosher':
            restrictionsIDs.push(4)
            break;
          case 'Keto':
            restrictionsIDs.push(5)
            break;
          case 'Pescetarian':
            restrictionsIDs.push(6)
            break;
          case 'Dairy-Free':
            restrictionsIDs.push(7)
            break;
          case 'Paleo':
            restrictionsIDs.push(8)
            break;
        }
      }

      for(var i = 0; i < allergies.length; i++){
        switch(allergies[i]){
          case 'Milk':
            allergiesIDs.push(1)
            break;
          case 'Sesame':
            allergiesIDs.push(2)
            break;
          case 'Soybeans':
            allergiesIDs.push(3)
            break;
          case 'Wheat':
            allergiesIDs.push(4)
            break;
          case 'Peanuts':
            allergiesIDs.push(5)
            break;
          case 'Tree-nuts':
            allergiesIDs.push(6)
            break;
          case 'Eggs':
            allergiesIDs.push(7)
            break;
          case 'Shellfish':
            allergiesIDs.push(8)
            break;
          case 'Fish':
            allergiesIDs.push(9)
            break;
          case 'Celiac':
            allergiesIDs.push(10)
            break;
        }
      }

      for(var i = 0; i < taste.length; i++){
        switch(taste[i]){
          case 'Salty':
            tasteIDs.push(1)
            break;
          case 'Sweet':
            tasteIDs.push(2)
            break;
          case 'Spicy':
            tasteIDs.push(3)
            break;
          case 'Umami':
            tasteIDs.push(4)
            break;
          case 'Sour':
            tasteIDs.push(5)
            break;
          case 'Bitter':
            tasteIDs.push(6)
            break;
        }
      }

      data = {
        name: data.name,
        price_max: data.price_preference,
        gender: data.gender,
        zipcode: data.zipcode,
        dob: data.dob,
        patron_restriction_tag: restrictionsIDs,
        patron_allergy_tag: allergiesIDs,
        patron_taste_tag: tasteIDs,
        calorie_limit: parseInt(calorielimit)
      }

      fetch("http://localhost:8000/patrons/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": ("Bearer " + access)
        },
        body: JSON.stringify(data)
      })
        .then((response) => {response.json()
          if(response.status == "200" || response.status == "201"){
            navigation.navigate("Patron Homepage", {access: access});
          }
          else{
            alert("There was an issue.")
            console.log(response.status)
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        })

    } else {
      console.log("Form has errors.");
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's pick your preferences</Text>

      <Text>Dietary Restrictions?</Text>
      <MultipleSelectList 
            setSelected={(val) => setRestrictions(val)} 
            data={restrictionsTags} 
            save="value"
            //onSelect={() => alert(allergiesSelect)} 
            label="Restrictions"
            boxStyles={{backgroundColor: '#FDAA3A', borderRadius: 45}}
            dropdownStyles={{backgroundColor: '#FECA83'}}
      />

      <Text>Allergies?</Text>
      <MultipleSelectList 
            setSelected={(val) => setAllergies(val)} 
            data={allergyTags} 
            save="key"
            //onSelect={() => alert(allergiesSelect)} 
            label="Allergy"
            boxStyles={{backgroundColor: '#FDAA3A', borderRadius: 45}}
            dropdownStyles={{backgroundColor: '#FECA83'}}
      />

    <Text>Taste Preferences?</Text>
      <MultipleSelectList 
            setSelected={(val) => setTaste(val)} 
            data={tasteTags} 
            save="key"
            //onSelect={() => alert(allergiesSelect)} 
            label="Taste"
      />

    <Text>Calorie Limit? (9999 for no limit)</Text>
      <TextInput
        style={styles.input}
        placeholder="Calorie Limit"
        onChangeText={(text) => setCalorieLimit(text)}
      />

      <Button title="Submit" 
           onPress={() => handleSubmit()}
           style={styles.button}
          />

      <Button
        title="Back"
        onPress={() => navigation.navigate("Patron Profile Creation")}
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
  dobContainer: {
    flex: 1,
    justifyContent: 'left'
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
