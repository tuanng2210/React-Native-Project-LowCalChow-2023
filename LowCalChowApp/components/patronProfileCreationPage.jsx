import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function PatronProfileCreationPage({navigation}) {

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

export default PatronProfileCreationPage;
