import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { CheckBox } from 'react-native';


function PatronProfileCreationPage({navigation}) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [zip, setZip] = useState('');
  const [gender, setGender] = useState('');
  const [pricePref, setPricePref] = useState('');
  const [errors, setErrors] = useState({});


  const nextPage = () => {

    let errors = {};

    if(!firstName){
      errors.firstName = "First Name is required."
    }
    
    if(!lastName){
      errors.lastName = "Last Name is required."
    }

    if(zip.length != 5){
      errors.zip = "Invalid zipcode."
    }
   
    if(!gender || gender == ""){
      errors.gender = "Gender is required."
    }

    if(!pricePref || pricePref == ""){
      errors.pricePref = "Price Preference is required."
    }

    setErrors(errors);
    
    if(Object.keys(errors).length === 0){

      const data = {
        firstName: firstName,
        lastName: lastName,
        pricePref: pricePref,
        gender: gender,
        zip: zip
      }

      navigation.navigate("Patron Preference Creation Page", {data: data});

    } else {
      console.log("Form has errors.");
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patron Profile Page</Text>


      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Zipcode"
        value={zip}
        onChangeText={(text) => setZip(text)}
      />

      <Text>Price Preference:</Text>
      <Picker
        selectedValue = {pricePref}
        style={{ height:50, width: 200}}
        onValueChange = {(itemValue, itemIndex) =>
          setPricePref(itemValue)
        }>

        <Picker.index label="Price Preference" value=""/>
        <Picker.Item label="$" value="$" />
        <Picker.Item label="$$" value="$$" />
        <Picker.Item label="$$$" value="$$$"/>

      </Picker>

      <Text>Gender:</Text>
      <Picker
        selectedValue = {gender}
        style={{ height:50, width: 200}}
        onValueChange = {(itemValue, itemIndex) =>
          setGender(itemValue)
        }>

        <Picker.Item label="Gender" value=""/>
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Other" value="other"/>

      </Picker>

      <TouchableOpacity style={styles.button} onPress={nextPage}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {Object.keys(errors).map((key, index) => (
        <Text key={index} style={styles.error}>
          {errors[key]}
        </Text>
      ))}

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

export default PatronProfileCreationPage;
