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
    { label: 'Vegan', value: 1 },
    { label: 'Vegitarian', value: 2 },
    { label: 'Halal', value: 3 },
    { label: 'Kosher', value: 4 },
    { label: 'Keto', value: 5 },
    { label: 'Pescetarian', value: 6 },
    { label: 'Dairy-Free', value: 7 },
    { label: 'Paleo', value: 8 }
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
    { label: 'Celiac', value: 10 }
  ];

  const tasteTags = [
    { label: 1, value: 'Salty' },
    { label: 'Sweet', value: 2 },
    { label: 'Spicy', value: 3 },
    { label: 'Umami', value: 4 },
    { label: 'Sour', value: 5 },
    { label: 'Bitter', value: 6 },
  ];

  const [errors, setErrors] = useState({});
  const [restrictions, setRestrictions] = useState({});
  const [allergies, setAllergies] = useState({});
  const [calorielimit, setCalorieLimit] = useState({});
  const [taste, setTaste] = useState({});

  const handleSubmit = () => {

    let errors = {};

    if(parseInt(calorielimit) < 0){
      errors.calorielimit= "Invalid calorie limit."
    }
    else if (!calorielimit){
      calorielimit = "9999";
    }

    data = {
      data,
      patron_restriction_tag: restrictions,
      patron_allergy_tag: allergies,
      patron_taste_tag: taste,
      calorie_limit: calorielimit
    }

    console.log (data)



  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's pick your preferences</Text>

      <Text>Dietary Restrictions?</Text>
      <MultipleSelectList 
            setSelected={({val}) => setRestrictions({val})} 
            data={restrictionsTags} 
            save="key"
            //onSelect={() => alert(allergiesSelect)} 
            label="Restrictions"
      />

      <Text>Allergies?</Text>
      <MultipleSelectList 
            setSelected={({val}) => setAllergies({val})} 
            data={allergyTags} 
            save="key"
            //onSelect={() => alert(allergiesSelect)} 
            label="Allergy"
      />

    <Text>Taste Preferences?</Text>
      <MultipleSelectList 
            setSelected={({val}) => setTaste({val})} 
            data={tasteTags} 
            save="key"
            //onSelect={() => alert(allergiesSelect)} 
            label="Taste"
      />

    <Text>Calorie Limit? (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Calorie Limit"
        value={calorielimit}
        onChangeText={(text) => setCalorieLimit(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

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
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  output: {
    width: '90%',
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
});

export default PatronPreferenceCreationPage;
