import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';

function PatronAccountCreationPage({navigation}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [zip, setZip] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [username, firstName, lastName, email, password, confirmPassword, zip]);

  const validateForm = () => {
    let errors = {};

    if(!username){
      errors.username = "Username is required."
    }

    if(!firstName){
      errors.firstName = "First name is required."
    }
    
    if(!email){
      errors.email = "Email is required."
    }
    else if(!/\S+@\S+\.\S+/.test(email)){
      errors.email = "Email is invalid."
    }

    if(!password){
      errors.password = "Password is required."
    }
    else if(password.length < 6){
      errors.password = "Password must be at least 6 characters."
    }
  
    if(!confirmPassword){
      errors.confirmPassword = "You must confirm your password."
    }
    else if(confirmPassword != password){
      errors.confirmPassword = "Passwords do not match."
    }

    if(!zip){
      errors.zip = "Zipcode is required."
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }

  const handleSubmit = () => {
    if (isFormValid){
      console.log("Form is valid.")
    }
    else{
      console.log("Form has errors.")
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patron Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

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
        placeholder="Email Address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Zipcode"
        value={zip}
        onChangeText={(text) => setZip(text)}
      />

      <Text>Gender:</Text>
      <Picker
        selectedValue = {gender}
        style={{ height:50, width: 200}}
        onValueChange = {(itemValue, itemIndex) =>
          setGender(itemValue)
        }>

        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Other" value="other"/>

      </Picker>


      <TouchableOpacity
        style={[styles.button, {opacity : isFormValid ? 1 : 0.5}]}
        disabled={!isFormValid}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>


      {Object.values(errors).map((error, index) => (
                <Text key={index} style={styles.error}>
                    {error}
                </Text>
            ))}


      <Button title="Back to Login" onPress={() => navigation.navigate('Login')}/>
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
    backgroundColor: 'green',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
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

export default PatronAccountCreationPage;
