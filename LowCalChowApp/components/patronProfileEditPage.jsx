import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from "react-native-vector-icons/FontAwesome";
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import { useRoute } from "@react-navigation/native";


function PatronProfileEditPage({navigation}) {

  const route = useRoute()
  const access = route.params?.access

  const [errors, setErrors] = useState({});

  const [currentUserName, setCurrentUserName] = useState({});

  const [firstName, setFirstName] = useState({});
  const [lastName, setLastName] = useState({});


  const [currentGender, setCurrentGender] = useState({});
  const [currentPrice, setCurrentPrice] = useState({});
  const [currentZip, setCurrentZip] = useState({});
  const [currentRestrictions, setCurrentRestrictions] = useState({});
  const [currentAllergies, setCurrentAllergies] = useState({});
  const [currentTastes, setCurrentTastes] = useState({});
  const [currentCalorieLimit, setCurrentCalorieLimit] = useState({});
  const [currentDisliked, setCurrentDisliked] = useState({});

  const [dob, setDob] = useState({});

  const [patronId, setPatronId] = useState({});

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

    try {
      const response = await fetch("http://localhost:8000/patrons/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      if(response.status === 200 || response.status === 201){
        const data = await response.json();

        const nameArray = data[0].name.split(" ", 1);
        setFirstName(data[0].name.split(" ", 1));
        setLastName(data[0].name.split(" ").slice(1).join(" "));

        setCurrentGender(data[0].gender);
        setCurrentPrice(data[0].price_max);
        setCurrentZip(data[0].zipcode);
        setCurrentRestrictions(data[0].patron_restriction_tag);
        setCurrentAllergies(data[0].patron_allergy_tag);
        setCurrentTastes(data[0].patron_taste_tag);
        setCurrentCalorieLimit(data[0].calorie_limit);
        setCurrentDisliked(data[0].disliked_ingredients);
        setPatronId(data[0].id)
        setDob(data[0].dob);
      }
    }
    catch(error){
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

    
    var restrictionTagIds = [];
    var allergyTagIds = [];
    var tasteTagIds = [];
    var dislikedIngredientsTagIds = [];        

    for(var i = 0; i < currentRestrictions.length; i++){
      restrictionTagIds.push(currentRestrictions[i].id)
    }

    for(var i = 0; i < currentAllergies.length; i++){
      allergyTagIds.push(currentAllergies[i].id)
    }

    for(var i = 0; i < currentTastes.length; i++){
      tasteTagIds.push(currentTastes[i].id)
    }

    for(var i = 0; i < currentDisliked.length; i++){
      dislikedIngredientsTagIds.push(currentDisliked[i].id)
    }
    

    const data = {
      name: firstName + " " + lastName,
      price_max: parseFloat(currentPrice),
      gender: currentGender,
      zipcode: currentZip,
      dob: dob,
      patron_restriction_tag: restrictionTagIds,
      patron_allergy_tag: allergyTagIds,
      patron_taste_tag: tasteTagIds,
      disliked_ingredients: dislikedIngredientsTagIds,
      calorie_limit: parseInt(currentCalorieLimit)
    }

    console.log(data)

    fetch("http://localhost:8000/patrons/" + patronId + "/", {
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

        <Text style={styles.title}>Patron Profile Edit</Text>

        <Text style={styles.label}>First Name:</Text>

        <TextInput
              style={styles.input}
              placeholder={`${firstName}`}
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />

        <Text style={styles.label}>Last Name:</Text>

        <TextInput
              style={styles.input}
              placeholder={`${lastName}`}
              value={lastName}
              onChangeText={(text) => setLastName(text)}
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

        <TextInput
          style={styles.input}
          placeholder="Max Price (in USD)"
          value={currentPrice}
          onChangeText={(text) => setCurrentPrice(text)}
        />

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
      

    </View>
  );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
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
  mainItem: {

  },
  mainContent: {
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "top",
    alignItems: "left",
    
  },
  
});

export default PatronProfileEditPage;
