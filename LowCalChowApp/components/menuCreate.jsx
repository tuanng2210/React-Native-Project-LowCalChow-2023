import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { MultipleSelectList, SelectList} from 'react-native-dropdown-select-list';

function MenuCreate({navigation}){
    const access = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2MzYyMDQ2LCJpYXQiOjE2OTYzNTQ4NDYsImp0aSI6ImZlNTkxZTc3NTU2YzRlMjFhZWQ0YjY1MjNjMjQ4NTRmIiwidXNlcl9pZCI6Mn0.8JBkg-45yBxHFHQQJKhYEvZAaiUfqB_VUXbdJDq9zIk";
    const restID = 1;
    const [ingredientTags, setIngredientTags] =useState([]);
    const [foodTypeTags, setfoodTypeTags] =useState([]);
    const [cookStyleTags, setcookStyleTags] = useState([]);
    const [allergyTags, setallergyTags] = useState([]);
    const [tasteTags, settasteTags] = useState([]);
    const timeOfDay = [
      { label: 'Breakfast', value: 'Breakfast' },
      { label: 'Lunch', value: 'Lunch' },
      { label: 'Dinner', value: 'Dinner' },
      { label: 'Anytime', value: 'Anytime' },
    ];
  
    const [restrictionTags, setrestrictionTags] = useState('');

    const [mealName, setMealname] = useState('');
    const [description, setDescription] = useState('');
    const [mealCalories, setCalories] = useState();
    const [mealPrice, setPrice] = useState('');

    const [ingredSelect, setIngredSelect] = useState([]);
    const [foodTypeSelect, setfoodTypeSelect] = useState([]);
    const [cookStyleSelect, setcookStyleSelect] = useState([]);
    const [allergiesSelect, setallergiesSelect] = useState([]);
    const [tasteSelect, settasteSelect] = useState([]);
    const [restrictionSelect, setrestrictionSelect] = useState([]);
    const [timeOfDayAvailable, setTOD] = useState([]);
    
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
      setIngredSelect([]);
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
        "item_name": mealName,
        "price": mealPrice,
        "calories": mealCalories,
        "food_type_tag": foodTypeSelect,
        "taste_tags": tasteSelect,
        "cook_style_tags": cookStyleSelect,
        "menu_restriction_tag": restrictionSelect,
        "menu_allergy_tag": allergiesSelect,
        "ingredients_tag": ingredSelect,
        "time_of_day_available": timeOfDayAvailable,
        "is_modifable": true
      }
      console.log(data);
      try{
        const response = await fetch(`http://localhost:8000/restaurants/${restID}/menuitems/`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + access,
        },
        body: JSON.stringify(data),
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
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access,
          },
          
        });
        if (response.status === 200) {
          const data = await response.json();
          const formTags = data.map(item => ({
            key: item.id,
            value: item.title,
          }));
          setfoodTypeTags(formTags);  
        }
      }catch (error) {
        console.error("Error:", error);
      }

      try {
        const response = await fetch("http://localhost:8000/restaurants/ingredienttags/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access,
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          const formTags = data.map(item => ({
            key: item.id,
            value: item.title,
          }));
          setIngredientTags(formTags);  
        }
      }catch (error) {
        console.error("Error:", error);
      }

      try{
        const response = await fetch("http://localhost:8000/restaurants/cookstyletags/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + access,
        },
        
      });
      if (response.status === 200) {
        const data = await response.json();
        const formTags = data.map(item => ({
          key: item.id,
          value: item.title,
        }));
        setcookStyleTags(formTags);  
      }
    }catch (error) {
      console.error("Error:", error);
    }

    try {
      const response = await fetch("http://localhost:8000/restaurants/tastetags/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + access,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        const formTags = data.map(item => ({
          key: item.id,
          value: item.title,
        }));
        settasteTags(formTags);  
      }
    }catch (error) {
      console.error("Error:", error);
    }

    try {
      const response = await fetch("http://localhost:8000/restaurants/restrictiontags/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + access,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        const formTags = data.map(item => ({
          key: item.id,
          value: item.title,
        }));
        setrestrictionTags(formTags);  
      }
    }catch (error) {
      console.error("Error:", error);
    }

    try {
      const response = await fetch("http://localhost:8000/restaurants/allergytags/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + access,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        const formTags = data.map(item => ({
          key: item.id,
          value: item.title,
        }));
        setallergyTags(formTags);  
      }
    }catch (error) {
      console.error("Error:", error);
    }

    } 
    useEffect (() => {
      handlegetfoodTags();
    }, []); 

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
            save="key"
            //onSelect={() => alert(ingredSelect)} 
            label="Ingredients"
          />
    
        

          {/*Food Type*/}
          <Text style={styles.normText}>Type of food</Text>

          <SelectList 
            setSelected={(val) => setfoodTypeSelect(val)} 
            data={foodTypeTags} 
            save="key"
            
          />

          {/*Cook Style*/}
          <Text style={styles.normText}>Cooking Style</Text>

          <SelectList 
            setSelected={(val) => setcookStyleSelect(val)} 
            data={cookStyleTags} 
            save="key"
          />

          {/*Allergies*/}
          <Text style={styles.normText}>Allergies</Text>

          <MultipleSelectList 
            setSelected={(val) => setallergiesSelect(val)} 
            data={allergyTags} 
            save="key"
            //onSelect={() => alert(allergiesSelect)} 
            label="Allergies"
          />
          {/*Taste*/}
          <Text style={styles.normText}>Taste Tags</Text>

          <MultipleSelectList 
            setSelected={(val) => settasteSelect(val)} 
            data={tasteTags} 
            save="key"
            //onSelect={() => alert(foodTypeSelect)} 
            label="Taste Tags"
          />
          {/*Restrictions*/}
          <Text style={styles.normText}>Dietary Restrictions</Text>

          <MultipleSelectList 
            setSelected={(val) => setrestrictionSelect(val)} 
            data={restrictionTags} 
            save="key"
            //onSelect={() => alert(foodTypeSelect)} 
            label="Restriction types"
          />
          {/*Time Of Day Available*/}
          <Text style={styles.normText}>When is this Meal Available?</Text>

          <SelectList 
            setSelected={(val) => setTOD(val)} 
            data={timeOfDay} 
            save="key"
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
    