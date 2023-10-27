import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useRoute } from "@react-navigation/native";



function PatronProfileCreationPage({navigation}) {

  const route = useRoute()
  const access = route.params?.access

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [zip, setZip] = useState('');
  const [gender, setGender] = useState('');
  const [pricePref, setPricePref] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  var [dob, setdob] = useState('');
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

    if(year.length < 4 || (month.length < 2 || day.length < 2)){
      errors.dobs = "Please enter a date in the format YYYY-MM-DD."
    }
    else if(((month == "02") || (month == "04") || (month == "06") || (month == "09") || (month == "11")) && (day == "31")){
      errors.dob = "Day does not exist."
    }
    else if((month == "02") && (day == "30")){
      errors.dob = "Day does not exist."
    }
    else if(parseInt(day) > 31 || parseInt(day) < 1){
      errors.dob = "Day does not exist."
    }
    else if(parseInt(month) > 12 || parseInt(month) < 1){
      errors.dob = "Month must be between 01 and 12."
    }
    else if(parseInt(year) < 1){
      errors.dob = "Year cannot be negative."
    }

    setErrors(errors);
    
    if(Object.keys(errors).length === 0){

      dob = year + "-" + month + "-" + day;

      const data = {
        name: firstName + " " + lastName,
        price_preference: pricePref,
        gender: gender,
        zipcode: zip,
        dob: dob
      }

      navigation.navigate("Patron Preference Creation", {data: data, access: access});

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

        <Picker.Item label="Price Preference" value=""/>
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
        <Picker.Item label="Female" value="Female" />
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Other" value="Other"/>

      </Picker>
      
      <View style={styles.dobContainer}>
        <Text>Date of Birth:</Text>

        <TextInput
          style={styles.input}
          placeholder="YYYY"
          value={year}
          onChangeText={(text) => setYear(text)}
          maxLength={4}
        />

        <TextInput
          style={styles.input}
          placeholder="MM"
          value={month}
          onChangeText={(text) => setMonth(text)}
          maxLength={2}
        />

        <TextInput
          style={styles.input}
          placeholder="DD"
          value={day}
          onChangeText={(text) => setDay(text)}
          maxLength={2}
        />
      </View>
      

      <Button title="Submit" 
           onPress={() => nextPage()}
           style={styles.button}
          />

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
  }
});

export default PatronProfileCreationPage;
