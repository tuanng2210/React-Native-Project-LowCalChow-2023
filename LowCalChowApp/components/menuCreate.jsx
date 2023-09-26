import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

function menuCreate({navigation}){
    const [mealName, setMealname] = useState('');
    const [description, setDescription] = useState('');
    const [foodPicture, setFoodPicture] = useState(null);
    const [ingredientsArray, setIngredients] = useState('');
    const [foodTagsArray, setFoodTags] = useState('');
    const [allergiesArray, setAllergies] = useState('');
    const onPictureChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setFoodPicture(URL.createObjectURL(event.target.files[0]));
        }
    }

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Add Meal</Text>
    
          <TextInput
            style={styles.input}
            placeholder="Meal Name"
            value={mealName}
            onChangeText={(text) => setMealname(text)}
          />
    
          <TextInput
            style={styles.input}
            placeholder="Give a description for this meal."
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
    
          {/* food picture upload hopefully */}
          <div>
            <input type="file" onchange={onPictureChange} className="filetype" />
            <img alt="preview image" src={foodPicture}/>
          </div>
          
    
          {/* todo: change to adding multiple ingredients*/}
          <TextInput
            style={styles.input}
            placeholder="Add ingredients"
            value={ingredients}
            onChangeText={(text) => setIngredients(getArrayfromString(text))}
          />
    
          {/* todo: change to adding multiple ingredients*/}
          <TextInput
            style={styles.input}
            placeholder="Add food tags"
            value={foodTags}
            onChangeText={(text) => setFoodTags(getArrayfromString(text))}
          />
    
          {/* todo: change to adding multiple ingredients*/}
          <TextInput
            style={styles.input}
            placeholder="Add Allergies"
            value={allergies}
            onChangeText={(text) => setAllergies(getArrayfromString(text))}
          />
    
          <Button title="Back to Menu" onPress={() => navigation.navigate('Menu?')}/>
        </View>
      );
    }

    function getArrayfromString(ingredients) {
        var ingredientsArray = ingredients.split(',');
        return <ingredientsArray />;
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
    
    export default menuCreate;
    