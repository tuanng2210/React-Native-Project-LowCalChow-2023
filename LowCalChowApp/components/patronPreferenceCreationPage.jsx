import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, CheckBox } from 'react-native';
import {Picker} from '@react-native-picker/picker';

import { useRoute } from "@react-navigation/native";



function PatronPreferenceCreationPage({navigation}) {

  const [isSelected, setSelection] = useState(false);

  const route = useRoute()
  const data = route.params?.data

  const [errors, setErrors] = useState({});

  console.log(data);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's pick your preferences</Text>

      <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
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
