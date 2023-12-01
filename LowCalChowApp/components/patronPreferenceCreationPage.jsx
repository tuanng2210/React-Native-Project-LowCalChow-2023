import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list'
import { useRoute } from "@react-navigation/native";



function PatronPreferenceCreationPage({ navigation }) {

  const route = useRoute()
  var data = route.params?.data
  const access = route.params?.access

  const [errors, setErrors] = useState({});
  const [restrictions, setRestrictions] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [calorielimit, setCalorieLimit] = useState({});
  const [taste, setTaste] = useState([]);
  const [disliked, setDislikedIngredients] = useState([]);

  const [restrictionTags, setRestrictionTags] = useState([]);
  const [allergyTags, setAllergyTags] = useState([]);
  const [tasteTags, setTasteTags] = useState([]);
  const [dislikedTags, setDislikedIngredientsTags] = useState([]);

  const handlegetfoodTags = async () => {

    try {
      const response = await fetch("http://localhost:8000/restaurants/ingredienttags/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + access,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        const formTags = data.map(item => ({
          key: item.id,
          value: item.title,
        }));
        setDislikedIngredientsTags(formTags);  
      }
    }catch (error) {
      console.error("Error:", error);
    }

    try {
      const response = await fetch("http://localhost:8000/restaurants/tastetags/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + access,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        const formTags = data.map(item => ({
          key: item.id,
          value: item.title,
        }));
        setTasteTags(formTags);  
      }
    }catch (error) {
      console.error("Error:", error);
    }

    try {
      const response = await fetch("http://localhost:8000/restaurants/restrictiontags/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + access,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        const formTags = data.map(item => ({
          key: item.id,
          value: item.title,
        }));
        setRestrictionTags (formTags);  
      }
    }catch (error) {
      console.error("Error:", error);
    }

    try {
      const response = await fetch("http://localhost:8000/restaurants/allergytags/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + access,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        const formTags = data.map(item => ({
          key: item.id,
          value: item.title,
        }));
        setAllergyTags(formTags);  
      }
    }catch (error) {
      console.error("Error:", error);
    }

} 
useEffect (() => {
  handlegetfoodTags();
}, []); 

  const handleSubmit = () => {

    let errors = {};

    if (calorielimit == {}) {
      setCalorieLimit(9999);
    }

    if (Object.keys(errors).length === 0) {


      data = {
        name: data.name,
        price_max: data.price_max,
        gender: data.gender,
        zipcode: data.zipcode,
        dob: data.dob,
        patron_restriction_tag: restrictions,
        patron_allergy_tag: allergies,
        patron_taste_tag: taste,
        disliked_ingredients: disliked,
        calorie_limit: parseInt(calorielimit)
      }

      console.log(data)

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
            data={restrictionTags}
            save="key"
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

        <Text style = {styles.modalSelectTag}>Disliked Ingredients?</Text>
        <MultipleSelectList
          setSelected={(val) => setDislikedIngredients(val)}
          data={dislikedTags}
          save="key"
          //onSelect={() => alert(allergiesSelect)} 
          label="Disliked Ingredients"
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
