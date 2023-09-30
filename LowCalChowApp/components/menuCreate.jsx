import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { MultipleSelectList } from 'react-native-dropdown-select-list';

{/*
TODO:
Export to Database
Get Pictures working for input
 */}
function MenuCreate({navigation}){
    const ingredientTags = ('');
    const foodTypeTags =('');
    const cookStyleTags = ('');
    const allergyTags = ('');
    const tasteTags = ('');
    const [mealName, setMealname] = useState('');
    const [description, setDescription] = useState('');
    const [foodPicture, setFoodPicture] = useState(null);
    const [ingredientsArray, setIngredientsArray] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [ingredSelect, setIngredSelect] = useState('');
    const [foodTypeSelect, setfoodTypeSelect] = useState('');
    const [cookStyleSelect, setcookStyleSelect] = useState('');
    const [allergiesSelect, setallergiesSelect] = useState('');
    const [tasteSelect, setTasteSelect] = useState('');
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
      setAllergies('');
      setAllergiesArray('');
      setDescription('');
      setFoodPicture(null);
      setFoodTagsArray('');
      setFoodTags('');
      setIngredients('');
      setIngredientsArray('');
      setMealname('');
    }
    {/*Send data to backend to add menu item */}
    const handleUpdateMeal = async () => {
      const data = {
        item_name: mealName,
        price: mealPrice,
        calories: mealCalories,
        food_type_tags: foodTypeTags,
        taste_tags: tasteTags,
        cook_style_tags: cookStyleTags,
        menu_restriction_tag: restrictionTags,
        menu_allergy_tag: allergyTags,
        ingredients_tag: ingredientTags,
        time_of_day_available: timeOfDayAvailable,
        is_modifable: true
      }
      try{
        const response = await fetch("http://localhost:8000/restaurants/" + restID + "/", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({data}),
      });
        if (response.status === 200) {
          const data = await.response.json();

        }
      }catch (error) {
        console.error("Error:", error);

    }
    {/*get the tags to put in drop down lists for menu create */}
    const handlegetfoodTags = async () => {
      try{
        const response = await fetch("http://localhost:8000/restaurants/foodtypetags/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
        
      });
      if (response.status === 200) {
        foodTags = await response.json();
      }
    }catch (error) {
      console.error("Error:", error);
    }
    };

    const handlegetingredTags = async () => {
      try {
        const response = await fetch("http://localhost:8000/restaurants/ingredienttags", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        if (response.status === 200) {
          ingredientTags = await response.json();
        }
      }catch (error) {
        console.error("Error:", error);
      }
    };
   




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
          {/*<div>
            <input type="file" onchange={onPictureChange} className="filetype" />
            <img alt="preview image" src={foodPicture}/>
          </div>*/}
          
    
          {/* todo: change to adding multiple ingredients
          <TextInput
            style={styles.input}
            placeholder="Add ingredients"
            value={ingredients}
            onChangeText={(text) => setIngredients(text)}
            onEndEditing={(text) => setIngredientsArray(getArrayfromString(text))}
           
          />
          */}
          <MultipleSelectList 
            ingredSelect={(val) => setIngredSelect(val)} 
            data={ingredientTags} 
            save="value"
            onSelect={() => alert(ingredSelect)} 
            label="Ingredients"
          />
    
          {/* todo: change to adding multiple ingredients*/}
          <TextInput
            style={styles.input}
            placeholder="Add food tags"
            value={foodTags}
            onChangeText={(text) => setFoodTags(text)}
            onEndEditing={(text) => setFoodTagsArray(getArrayfromString(text))}
          />
    
          {/* todo: change to adding multiple ingredients*/}
          <TextInput
            style={styles.input}
            placeholder="Add Allergies"
            value={allergies}
            onChangeText={(text) => setAllergies(text)}
            onEndEditing={(text) => setAllergiesArray(getArrayfromString(text))}
          />
    
          {/*<Button title="Back to Menu" onPress={() => navigation.navigate('Menu')}/>*/}
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
    
    export default MenuCreate;
    