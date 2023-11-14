import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list'
import { useRoute } from "@react-navigation/native";



function PatronPreferenceCreationPage({ navigation }) {

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
    { label: "Sesame", value: "Sesame" },
    { label: "Soybeans", value: "Soybeans" },
    { label: "Wheat", value: "Wheat" },
    { label: "Peanuts", value: "Peanuts" },
    { label: "Tree-nuts", value: "Tree-nuts" },
    { label: "Eggs", value: "Eggs" },
    { label: "Shellfish", value: "Shellfish" },
    { label: "Fish", value: "Fish" },
    { label: "Celiac", value: "Celiac" }
  ];

  const tasteTags = [
    { label: 'Salty', value: 'Salty' },
    { label: "Sweet", value: "Sweet" },
    { label: "Spicy", value: "Spicy" },
    { label: "Umami", value: "Umami" },
    { label: "Sour", value: "Sour" },
    { label: "Bitter", value: "Bitter" },
  ];

  const [errors, setErrors] = useState({});
  const [restrictions, setRestrictions] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [calorielimit, setCalorieLimit] = useState({});
  const [taste, setTaste] = useState([]);

  const handleSubmit = () => {

    let errors = {};

    if (calorielimit == {}) {
      setCalorieLimit(9999);
    }

    if (Object.keys(errors).length === 0) {

      var restrictionsIDs = [];
      var allergiesIDs = [];
      var tasteIDs = [];

      for (var i = 0; i < restrictions.length; i++) {
        switch (restrictions[i]) {
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

      for (var i = 0; i < allergies.length; i++) {
        switch (allergies[i]) {
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

      for (var i = 0; i < taste.length; i++) {
        switch (taste[i]) {
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
        price_max: data.price_max,
        gender: data.gender,
        zipcode: data.zipcode,
        dob: data.dob,
        patron_restriction_tag: restrictionsIDs,
        patron_allergy_tag: allergiesIDs,
        patron_taste_tag: tasteIDs,
        disliked_ingredients: [],
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
        .then((response) => {
          response.json()
          if (response.status == "200" || response.status == "201") {
            navigation.navigate("Patron Homepage", { access: access });
          }
          else {
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
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Let's pick your preferences</Text>
      </View>

      <View style={styles.mainContent}>
      <View style={{ marginVertical: 5, paddingRight: 5, }}>
        <Text style = {styles.modalSelectTag}>
        Dietary Restrictions?</Text>
          <MultipleSelectList
            setSelected={(val) => setRestrictions(val)}
            data={restrictionsTags}
            save="value"
            //onSelect={() => alert(allergiesSelect)} 
            label="Restrictions"
            boxStyles={{
              backgroundColor: 'rgba(255, 165, 0, 0.5)',
              borderRadius: 15,
              width: "100%"
            }}
            dropdownStyles={{
              backgroundColor: 'rgba(255, 165, 0, 0.5)',
              borderRadius: 15,
              width: "100%",
            }}
          />
        <Text style = {styles.modalSelectTag}>Allergies?</Text>
        
        <MultipleSelectList
          setSelected={(val) => setAllergies(val)}
          data={allergyTags}
          save="key"
          //onSelect={() => alert(allergiesSelect)} 
          label="Allergy"
          boxStyles={{
            backgroundColor: 'rgba(255, 165, 0, 0.5)',
            borderRadius: 15,
            width: "100%"
          }}
          dropdownStyles={{
            backgroundColor: 'rgba(255, 165, 0, 0.5)',
            borderRadius: 15,
            width: "100%",
          }}
        />
        
        <Text style = {styles.modalSelectTag}>Taste Preferences?</Text>
        <MultipleSelectList
          setSelected={(val) => setTaste(val)}
          data={tasteTags}
          save="key"
          //onSelect={() => alert(allergiesSelect)} 
          label="Taste"
          boxStyles={{
            backgroundColor: 'rgba(255, 165, 0, 0.5)',
            borderRadius: 15,
            width: "100%"
          }}
          dropdownStyles={{
            backgroundColor: 'rgba(255, 165, 0, 0.5)',
            borderRadius: 15,
            width: "100%",
          }}
        />
        </View>
        <Text style = {styles.modalSelectTag}>Calorie Limit? (9999 no limit)</Text>
        <TextInput
          style={styles.input}
          placeholder="Calorie Limit"
          onChangeText={(text) => setCalorieLimit(text)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSubmit()}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Patron Profile Creation")}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "top",
    alignItems: "center",
    alignContent: "center",
  },
  modalSelectTag: {
    fontSize: 15,
    justifyContent: "left",
  },
  input: {
    width: '15%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  error: {
    color: 'red',
    fontSize: 20,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#FFA500",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
    width: "10%",
  },
  buttonText: {
    color: "#000000",
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 20,
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFA500",
    padding: 10,
  },
  titleText: {
    color: "#000000",
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default PatronPreferenceCreationPage;
