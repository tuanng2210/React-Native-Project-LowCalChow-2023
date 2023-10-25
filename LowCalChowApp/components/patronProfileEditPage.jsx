import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import { useRoute } from "@react-navigation/native";


function PatronProfileEditPage({navigation}) {

  const route = useRoute()
  const access = route.params?.access

  const [userData, setUserData] = useState({});

  


  const [errors, setErrors] = useState({});

  const [currentUserName, setCurrentUserName] = useState({});
  const [currentGender, setCurrentGender] = useState({});
  const [currentPrice, setCurrentPrice] = useState({});
  const [currentZip, setCurrentZip] = useState({});
  const [currentRestrictions, setCurrentRestrictions] = useState({});
  const [currentAllergies, setCurrentAllergies] = useState({});
  const [currentTastes, setCurrentTastes] = useState({});
  const [currentCalorieLimit, setCurrentCalorieLimit] = useState({});

  const [dob, setDob] = useState({});

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

  const handleGetData = async () => {
    try{
      const response = await fetch("http://localhost:8000/patrons/1/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": ("Bearer " + access)
        }
      });
      if(response.status === 200 || response.status === 201){
        const data = await response.json();

        setCurrentUserName(data.name);
        setCurrentGender(data.gender);
        setCurrentPrice(data.price_preference);
        setCurrentZip(data.zipcode);
        setCurrentRestrictions(data.patron_restriction_tag);
        setCurrentAllergies(data.patron_allergy_tag);
        setCurrentTastes(data.patron_taste_tag);
        setCurrentCalorieLimit(data.calorie_limit);

        setDob(data.dob);
      }
    }catch (error){
      console.error("Error:", error);
    }
  }
  
  useEffect(() => {
    handleGetData();
  }, []);

  function updateInfo(){
    handleUpdateInfo();
  }

  const handleUpdateInfo = async () => {
    const data = {
      name: currentUserName,
      price_preference: currentPrice,
      gender: currentGender,
      zipcode: currentZip,
      dob: dob,
      patron_restriction_tag: currentRestrictions,
      patron_allergy_tag: currentAllergies,
      patron_taste_tag: currentTastes,
      calorie_limit: parseInt(currentCalorieLimit)
    }

    fetch("http://localhost:8000/patrons/1/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": ("Bearer " + access)
        },
        body: JSON.stringify(data)
      })
      .then((response) => {response.json()
        if(response.status == "200" || response.status == "201"){
          navigation.navigate("Patron Profile Edit", {access: access});
        }
        else{
          alert("There was an issue.")
          console.log(response.status)
        }
      })

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patron Profile Edit</Text>

      <Text style={styles.label}>Name:</Text>

      <TextInput
            style={styles.input}
            placeholder={`${currentUserName}`}
            value={currentUserName}
            onChangeText={(text) => setCurrentUserName(text)}
          />

      <Text style={styles.label}>Gender:</Text>

      <Picker
        selectedValue = {`${currentGender}`}
        style={{ height:50, width: 200}}
        onValueChange = {(itemValue, itemIndex) =>
          setCurrentGender(itemValue)
        }>

        <Picker.Item label="Gender" value=""/>
        <Picker.Item label="Female" value="Female" />
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Other" value="Other"/>

      </Picker>

      <Text style={styles.label}>Price Preference:</Text>

      <Picker
        selectedValue ={`${currentPrice}`}
        style={{ height:50, width: 200}}
        onValueChange = {(itemValue, itemIndex) =>
          setCurrentPrice(itemValue)
        }>

        <Picker.Item label="Price Preference" value=""/>
        <Picker.Item label="$" value="$" />
        <Picker.Item label="$$" value="$$" />
        <Picker.Item label="$$$" value="$$$"/>

      </Picker>

      <Text style={styles.label}>Zipcode:</Text>

      <TextInput
            style={styles.input}
            placeholder={`${currentZip}`}
            value={currentZip}
            onChangeText={(text) => setCurrentZip(text)}
          />

      <Text style={styles.label}>Calorie Limit:</Text>

      <TextInput
            style={styles.input}
            placeholder={`${currentCalorieLimit}`}
            value={currentCalorieLimit}
            onChangeText={(text) => setCurrentCalorieLimit(text)}
          />

      {/*todo*/}
      {/* <Text style={styles.label}>Restrictions:</Text>

      <MultipleSelectList 
            setSelected={(val) => setCurrentRestrictions(val)} 
            data={restrictionsTags} 
            save="key"
            //onSelect={() => alert(ingredSelect)} 
            label="Restrictions"
            defaultOption={currentRestrictions}
            boxStyles={{backgroundColor: '#FDAA3A', borderRadius: 45}}
            dropdownStyles={{backgroundColor: '#FECA83'}}
          />
        

      <Text style={styles.label}>Allergies:</Text>

      <MultipleSelectList 
            setSelected={(val) => setCurrentAllergies(val)} 
            data={allergyTags} 
            save="key"
            //onSelect={() => alert(ingredSelect)} 
            label="Allergies"
            defaultOption={currentRestrictions}
            boxStyles={{backgroundColor: '#FDAA3A', borderRadius: 45}}
            dropdownStyles={{backgroundColor: '#FECA83'}}
          />

      <Text style={styles.label}>Tastes:</Text>

      <MultipleSelectList 
            setSelected={(val) => setCurrentTastes(val)} 
            data={tasteTags} 
            save="key"
            //onSelect={() => alert(ingredSelect)} 
            label="Tastes"
            defaultOption={currentRestrictions}
            boxStyles={{backgroundColor: '#FDAA3A', borderRadius: 45}}
            dropdownStyles={{backgroundColor: '#FECA83'}}
          /> */}
        
        <Button title="Update Info" 
           onPress={() => updateInfo()}
           style={styles.button}
          />

    </View>
  );
  }

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

export default PatronProfileEditPage;
