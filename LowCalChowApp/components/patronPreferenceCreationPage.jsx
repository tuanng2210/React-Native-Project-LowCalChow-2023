import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list'
import { useRoute } from "@react-navigation/native";



function PatronPreferenceCreationPage({navigation}) {



  const route = useRoute()
  const data = route.params?.data

  const restrictionsTags = [
    { label: 'Kosher', value: 'Kosher' },
    { label: 'Gluten-free', value: 'Gluten-free' },
    { label: 'Halal', value: 'Halal' },
  ];

  const allergyTags = [
    { label: 'Eggs', value: 'Eggs' },
    { label: 'Nuts', value: 'Nuts' },
    { label: 'Shellfish', value: 'Shellfish' },
  ];

  const tasteTags = [
    { label: 'Sweet', value: 'Sweet' },
    { label: 'Spicy', value: 'Spicy' },
    { label: 'Umami', value: 'Umami' },
    { label: 'Salty', value: 'Salty' },
    { label: 'Sour', value: 'Sour' },
    { label: 'Herbaceous', value: 'Herbaceous' },
  ];

  const [errors, setErrors] = useState({});
  const [restrictions, setRestrictions] = useState({});
  const [allergies, setAllergies] = useState({});
  const [taste, setTaste] = useState({});

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
