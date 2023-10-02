import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { MultipleSelectList, SelectList} from 'react-native-dropdown-select-list';

function MenuCreate({navigation}){
    const ingredientTags = ('');
    const foodTypeTags =('');
    const cookStyleTags = ('');
    const allergyTags = ('');
    const tasteTags = ('');
    const timeOfDay = [
      { label: 'Breakfast', value: 'Breakfast' },
      { label: 'Lunch', value: 'Lunch' },
      { label: 'Dinner', value: 'Dinner' },
      { label: 'Anytime', value: 'Anytime' },
    ];
  
    const restrictionTags = ('');

    const [mealName, setMealname] = useState('');
    const [description, setDescription] = useState('');
    const [mealCalories, setCalories] = useState('');
    const [mealPrice, setPrice] = useState('');

    const [ingredSelect, setIngredSelect] = useState([]);
    const [foodTypeSelect, setfoodTypeSelect] = useState('');
    const [cookStyleSelect, setcookStyleSelect] = useState('');
    const [allergiesSelect, setallergiesSelect] = useState([]);
    const [tasteSelect, settasteSelect] = useState([]);
    const [restrictionSelect, setrestrictionSelect] = useState([]);
    const [timeOfDayAvailable, setTOD] = useState('');
    
    {/*const onPictureChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setFoodPicture(URL.createObjectURL(event.target.files[0]));
        }
    }*/}

    /* USELESS FUNCTION I THINK BUT KEEPING INCASE NOT
    function getArrayfromString(ingredients) {
      var tempArray = ingredients.toString().split(',');
      return tempArray;
    } */

    function submitMeal(){
      {/*submit to database here then reset the page*/}
      handleUpdateMeal();

      setMealname('');
      setDescription('');
      setPrice('');
      setCalories('');
      setIngredSelect('');
      setfoodTypeSelect('');
      setallergiesSelect('');
      setcookStyleSelect('');
      settasteSelect('');
      setrestrictionSelect('');
      setTOD('');

    }
    {/*Send data to backend to add menu item */}
    const handleUpdateMeal = async () => {
      const data = {
        item_name: mealName,
        price: mealPrice,
        calories: mealCalories,
        food_type_tags: foodTypeSelect,
        taste_tags: tasteSelect,
        cook_style_tags: cookStyleSelect,
        menu_restriction_tag: restrictionSelect,
        menu_allergy_tag: allergiesSelect,
        ingredients_tag: ingredSelect,
        time_of_day_available: timeOfDayAvailable.Value(),
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
          const data = await response.json();

        }
      }catch (error) {
        console.error("Error:", error);

    }
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
        const data = await response.json();
        foodTypeTags = data.map(item => ({
          value: item.id,
          label: item.title,
        }));
      }
    }catch (error) {
      console.error("Error:", error);
    }

    /*try {
      const response = await fetch("http://localhost:8000/restaurants/ingredienttags", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.status === 200) {
        const data = await response.json();
        const ingredientTags = data.map(item => ({
          value: item.id,
          label: item.title,
        }));
      }
    }catch (error) {
      console.error("Error:", error);
    }

    try{
      const response = await fetch("http://localhost:8000/restaurants/cookstyletags/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
      
    });
    if (response.status === 200) {
      const data = await response.json();
        const cookStyleTags = data.map(item => ({
          value: item.id,
          label: item.title,
        }));
    }
  }catch (error) {
    console.error("Error:", error);
  }

  try {
    const response = await fetch("http://localhost:8000/restaurants/tastetags", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.status === 200) {
      tasteTags = await response.json();
    }
  }catch (error) {
    console.error("Error:", error);
  }

  try {
    const response = await fetch("http://localhost:8000/restaurants/restrictiontags", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.status === 200) {
      restrictionTags = await response.json();
    }
  }catch (error) {
    console.error("Error:", error);
  }

  try {
    const response = await fetch("http://localhost:8000/restaurants/allergytags", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.status === 200) {
      allergyTags = await response.json();
    }
  }catch (error) {
    console.error("Error:", error);
  }*/

  handlegetfoodTags();
  

    };

      /*const handlegetingredTags = async () => {
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
    }; */
  
   




    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Add Meal</Text>
    
          {/*Meal Name*/}
          <TextInput
            style={styles.input}
            placeholder="Meal Name"
            value={mealName}
            onChangeText={(text) => setMealname(text)}
          />
    
          {/*Meal Description*/}
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

          {/*Meal Price*/}
          <TextInput
            style={styles.input}
            placeholder="Enter the meal's price"
            value={mealPrice}
            onChangeText={(text) => setPrice(text)}
          />

          {/*Meal Calories*/}
          <TextInput
            style={styles.input}
            placeholder="How many calories is this meal?"
            value={mealCalories}
            onChangeText={(text) => setCalories(text)}
          />
          
    
          {/*Ingredients*/}
          <Text style={styles.normText}>Ingredients</Text>

          <MultipleSelectList 
            setSelected={(val) => setIngredSelect(val)} 
            data={ingredientTags} 
            save="value"
            onSelect={() => alert(ingredSelect)} 
            label="Ingredients"
          />
    
        

          {/*Food Type*/}
          <Text style={styles.normText}>Type of food</Text>

          <SelectList 
            setSelected={(val) => setfoodTypeSelect(val)} 
            data={foodTypeTags} 
            save="Type of food"
            
          />

          {/*Cook Style*/}
          <Text style={styles.normText}>Cooking Style</Text>

          <SelectList 
            setSelected={(val) => setcookStyleSelect(val)} 
            data={cookStyleTags} 
            save="Cooking Style"
          />

          {/*Allergies*/}
          <Text style={styles.normText}>Allergies</Text>

          <MultipleSelectList 
            setSelected={(val) => setallergiesSelect(val)} 
            data={allergyTags} 
            save="value"
            onSelect={() => alert(allergiesSelect)} 
            label="Allergies"
          />
          {/*Taste*/}
          <Text style={styles.normText}>Taste Tags</Text>

          <MultipleSelectList 
            setSelected={(val) => setfoodTypeSelect(val)} 
            data={tasteTags} 
            save="value"
            onSelect={() => alert(foodTypeSelect)} 
            label="Taste Tags"
          />
          {/*Restrictions*/}
          <Text style={styles.normText}>Dietary Restrictions</Text>

          <MultipleSelectList 
            setSelected={(val) => setfoodTypeSelect(val)} 
            data={restrictionTags} 
            save="value"
            onSelect={() => alert(foodTypeSelect)} 
            label="Restriction types"
          />
          {/*Time Of Day Available*/}
          <Text style={styles.normText}>When is this Meal Available?</Text>

          <SelectList 
            setSelected={(val) => setTOD(val)} 
            data={timeOfDay} 
            save="value"
          />
    
          
    
          {/*<Button title="Back to Menu" onPress={() => navigation.navigate('Menu')}/>*/}
          <Button title="Submit Meal" onPress={() => submitMeal()}/>
        </View>
        
        </SafeAreaView>
 
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
      normText: {
        fontSize: 16,
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
    