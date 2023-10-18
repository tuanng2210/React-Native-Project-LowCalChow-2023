import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useRoute } from "@react-navigation/native";

function PatronProfileEditPage({navigation}) {

  const route = useRoute()
  //const access = route.params?.access
  const access = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk3NjE0NTE5LCJpYXQiOjE2OTc2MDczMTksImp0aSI6ImI3OGE5MjM4YTMxZjQyNjFhMWQxM2E4NWFhZmRmYWYyIiwidXNlcl9pZCI6Mn0.RPzbtMVmEZ7QFR9tG0xE6OS8zP4sYqaJKT5bOK8WBOw"

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


  fetch("http://localhost:8000/patrons/1/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": ("Bearer " + access)
    }
  })
    .then((response) => response.json())
    .then((responseData) => {
      
    
      setCurrentUserName(responseData.name);
      setCurrentGender(responseData.gender);
      setCurrentPrice(responseData.price_preference);
      setCurrentZip(responseData.zipcode);
      setCurrentRestrictions(responseData.patron_restriction_tag);
      setCurrentAllergies(responseData.patron_allergy_tag);
      setCurrentTastes(responseData.patron_taste_tag);
      setCurrentCalorieLimit(responseData.calorie_limit);

      //WARNING: API does not have a response message. Raise issue with back-end.
      // if (responseData.message === "success") {

      // } else {
      //   // Handle any error messages returned by the API
      //   console.log("Message :", responseData);
      //   // You can display an error message to the user if needed
      // }
    })
    .catch((error) => {
      console.error("Error:", error);
    })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patron Profile Edit</Text>
      <Text>{currentUserName}</Text>
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
