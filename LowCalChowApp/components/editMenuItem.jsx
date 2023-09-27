import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

{/*
TODO:
Import From Database
Send to Database
Fill in text fields with current information
*/}

function EditMenu({navigation}){
    const [mealName, setMealname] = useState('');
    const [description, setDescription] = useState('');
    const [foodPicture, setFoodPicture] = useState(null);
    const [ingredientsArray, setIngredientsArray] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [foodTagsArray, setFoodTagsArray] = useState('');
    const [foodTags, setFoodTags] = useState('');
    const [allergiesArray, setAllergiesArray] = useState('');
    const [allergies, setAllergies] = useState('');
    const onPictureChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setFoodPicture(URL.createObjectURL(event.target.files[0]));
        }
    }
    function getArrayfromString(ingredients) {
      var tempArray = ingredients.toString().split(',');
      return tempArray;
    }
    function submitMeal(){
      {/*submit to database here*/}
      navigation.navigate('Menu');
    }


    return (
        <View style={styles.container}>
          <Text style={styles.title}>Edit Meal</Text>
    
          <TextInput
            style={styles.input}
            placeholder="Current Meal Name"
            value={mealName}
            onChangeText={(text) => setMealname(text)}
          />
    
          <TextInput
            style={styles.input}
            placeholder="Current Description."
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
    
          {/* food picture upload hopefully */}
          {/*<div>
            <input type="file" onchange={onPictureChange} className="filetype" />
            <img alt="preview image" src={foodPicture}/>
          </div>*/}
          
    
          {/* todo: change to adding multiple ingredients*/}
          <TextInput
            style={styles.input}
            placeholder="Current ingredients"
            value={ingredients}
            onChangeText={(text) => setIngredients(text)}
            onEndEditing={(text) => setIngredientsArray(getArrayfromString(text))}
           
          />
    
          {/* todo: change to adding multiple ingredients*/}
          <TextInput
            style={styles.input}
            placeholder="Current tags"
            value={foodTags}
            onChangeText={(text) => setFoodTags(text)}
            onEndEditing={(text) => setFoodTagsArray(getArrayfromString(text))}
          />
    
          {/* todo: change to adding multiple ingredients*/}
          <TextInput
            style={styles.input}
            placeholder="Current Allergies"
            value={allergies}
            onChangeText={(text) => setAllergies(text)}
            onEndEditing={(text) => setAllergiesArray(getArrayfromString(text))}
          />
    
          <Button title="Back to Menu" onPress={() => navigation.navigate('Menu')}/>
          <Button title="Submit Meal" onPress={() => submitMeal()}/>
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
    
    export default EditMenu;
    