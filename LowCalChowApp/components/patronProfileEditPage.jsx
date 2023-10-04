import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';

function PatronProfileEditPage({navigation}) {



  const [userData, setUserData] = useState({});


  const [errors, setErrors] = useState({});

  const handleSubmit = () => {

    let errors = {};

    setErrors(errors);
    
    if(Object.keys(errors).length === 0){

      const data = {

      }

    //   fetch("http://localhost:8000/auth/signup/patron/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   })
    //     .then((response) => response.json())
    //     .then((responseData) => {
    //       // Handle the API response here
    //       console.log("API response:", responseData);

    //       if (responseData.message === "success") {
    //         // The signup was successful, you can navigate to a success screen or perform other actions
    //         const { email, username, user_type } = responseData.content;
    //         console.log("User details:", { email, username, user_type });
    //         navigation.navigate("Patron Profile Creation Page");
    //       } else {
    //         // Handle any error messages returned by the API
    //         console.log("Message :", responseData.message);
    //         // You can display an error message to the user if needed
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    } else {
      console.log("Form has errors.");
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patron Profile Edit</Text>
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
