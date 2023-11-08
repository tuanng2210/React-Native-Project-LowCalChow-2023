import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
//import MultiSelect from 'react-native-multiple-select';

function EditMenu({route, navigation}){
    const mealID = route.params.id;

    const access = route.params.access;

    const restID = route.params.restaurantId;
    
    const [ingredientTags, setIngredientTags] =useState([]);
    const [foodTypeTags, setfoodTypeTags] =useState([]);
    const [cookStyleTags, setcookStyleTags] = useState([]);
    const [allergyTags, setallergyTags] = useState([]);
    const [tasteTags, settasteTags] = useState([]);
    const timeOfDay = [
      { key: 'Breakfast', value: 'Breakfast' },
      { key: 'Lunch', value: 'Lunch' },
      { key: 'Dinner', value: 'Dinner' },
      { key: 'Anytime', value: 'Anytime' },
    ];
  
    const [restrictionTags, setrestrictionTags] = useState('');

    const [mealName, setMealName] = useState('');
    const [mealCalories, setCalories] = useState('');
    const [mealPrice, setPrice] = useState('');
    const [ingredSelect, setIngredSelect] = useState([]);
    const [defaultIngredSelect, setDefaultIngredSelect] = useState([]);
    const [foodTypeSelect, setfoodTypeSelect] = useState([]);
    const [cookStyleSelect, setcookStyleSelect] = useState([]);
    const [allergiesSelect, setallergiesSelect] = useState([]);
    const [tasteSelect, settasteSelect] = useState([]);
    const [restrictionSelect, setrestrictionSelect] = useState([]);
    const [timeOfDayAvailable, setTOD] = useState([]);

    const defaultOptions = [
      { key: '1', value: 'anchovy_paste' },
      { key: '2', value: 'basil' },
      // Add more key-value pairs as needed
    ];
    

    function submitMeal(){
      {/*submit to database here then reset the page*/}
      handleUpdateMeal();
      navigation.navigate('Menu', {access: access, restaurantId: restID});
    }
    function deleteMeal(){
      handleDelMeal();
      navigation.navigate('Menu', {access: access, restaurantId: restID});
    }
    {/*Gets current meal info to be updated*/}
    const handlegetMeal = async () => {
      try {
        const response = await fetch(`http://localhost:8000/restaurants/${restID}/menuitems/${mealID}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access,
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          setMealName(data.item_name);
          setCalories(data.calories);
          setPrice(data.price);
          const formcookStyleTags = data.cook_style_tags.map(item => ({
            key: item.id,
            value: item.title,
          }));
          setcookStyleSelect(formcookStyleTags);
          const formfoodTypeTags = data.food_type_tag.map(item => ({
            key: item.id,
            value: item.title,
          }));
          setfoodTypeSelect(formfoodTypeTags);
          const formIngredsTags = data.ingredients_tag.map(item => ({
            key: item.id,
            value: item.title,
          }));
          setIngredSelect(formIngredsTags);
          //setallergiesSelect(getdata.menu_allergy_tag);
          //setrestrictionSelect(getdata.menu_restriction_tag);
          const formTasteTags = data.taste_tags.map(item => ({
            key: item.id,
            value: item.title,
          }));
          settasteSelect(formTasteTags);
          //setTOD(getdata.time_of_day_available);
        }
      }catch (error) {
        console.error("Error:", error);
      }
    } 
    useEffect (() => {
      handlegetMeal();

    }, []); 
    useEffect(() => {
      // Update the default option for ingredSelect when it changes
      const defaultIngredSelect = ingredSelect.map(item => ({
        key: item.key,
        value: item.value,
      }));
    
      // Set default option for MultipleSelectList
      setDefaultIngredSelect(defaultIngredSelect);
    }, [ingredSelect]);

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
        const response = await fetch(`http://localhost:8000/restaurants/${restID}/menuitems/${mealID}/`, {
        method: "PUT",

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

    const handleDelMeal = async () => {
      try {
        const response = await fetch(`http://localhost:8000/restaurants/${restID}/menuitems/${mealID}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access,
          },
        });
        if (response.status === 200) {
        
        }
      }catch (error) {
          console.error("Error:", error);
      }
    }
    
    return (
      <ScrollView style = {{ flex: 1}}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Add Meal</Text>
    
          {/*Meal Name*/}
          <Text style={styles.label}>Meal Name:</Text>

          <TextInput
            style={styles.input}
            placeholder={`${mealName}`}
            value={mealName}
            onChangeText={(text) => setMealName(text)}
          />
    
          {/* Meal Description
          <TextInput
            style={styles.input}
            placeholder={`${description}`}
            value={description}
            onChangeText={(text) => setDescription(text)}
          /> */}

          {/*Meal Price*/}
          <Text style={styles.label}>Price of meal:</Text>

          <TextInput
            style={styles.input}
            placeholder="{mealPrice}"
            value={mealPrice}
            onChangeText={(text) => setPrice(text)}
          />

          {/*Meal Calories*/}
          <Text style={styles.label}>Meal's Calories:</Text>
          <TextInput
            style={styles.input}
            placeholder="{mealCalories}"
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
            boxStyles={{backgroundColor: '#FDAA3A', borderRadius: 45}}
            dropdownStyles={{backgroundColor: '#FECA83'}}
            defaultOption={defaultOptions}
          />
    
        

          {/*Food Type*/}
          <Text style={styles.normText}>Type of food</Text>

          <SelectList 
            setSelected={(val) => setfoodTypeSelect(val)} 
            data={foodTypeTags} 
            save="key"
            boxStyles={{backgroundColor: '#FDAA3A', borderRadius: 45}}
            dropdownStyles={{backgroundColor: '#FECA83'}}
          />

          {/*Cook Style*/}
          <Text style={styles.normText}>Cooking Style</Text>

          <SelectList 
            setSelected={(val) => setcookStyleSelect(val)} 
            data={cookStyleTags} 
            save="key"
            boxStyles={{backgroundColor: '#FDAA3A', borderRadius: 45}}
            dropdownStyles={{backgroundColor: '#FECA83'}}
          />

          {/*Allergies*/}
          <Text style={styles.normText}>Allergies</Text>

          <MultipleSelectList 
            setSelected={(val) => setallergiesSelect(val)} 
            data={allergyTags} 
            save="key"
            //onSelect={() => alert(allergiesSelect)} 
            label="Allergies"
            boxStyles={{backgroundColor: '#FDAA3A', borderRadius: 45}}
            dropdownStyles={{backgroundColor: '#FECA83'}}
          />
          {/*Taste*/}
          <Text style={styles.normText}>Taste Tags</Text>

          <MultipleSelectList 
            setSelected={(val) => settasteSelect(val)} 
            data={tasteTags} 
            save="key"
            //onSelect={() => alert(foodTypeSelect)} 
            label="Taste Tags"
            boxStyles={{backgroundColor: '#FDAA3A', borderRadius: 45}}
            dropdownStyles={{backgroundColor: '#FECA83'}}
          />
      
          {/*Restrictions*/}
          <Text style={styles.normText}>Dietary Restrictions</Text>

          <MultipleSelectList 
            setSelected={(val) => setrestrictionSelect(val)} 
            data={restrictionTags} 
            save="key"
            //onSelect={() => alert(foodTypeSelect)} 
            label="Restriction types"
            boxStyles={{backgroundColor: '#FDAA3A', borderRadius: 45}}
            dropdownStyles={{backgroundColor: '#FECA83'}}
          />
          {/*Time Of Day Available*/}
          <Text style={styles.normText}>When is this Meal Available?</Text>

          <SelectList 
            setSelected={(val) => setTOD(val)} 
            data={timeOfDay} 
            save="key"
            defaultOption={timeOfDayAvailable}
            boxStyles={{backgroundColor: '#FDAA3A', borderRadius: 45}}
            dropdownStyles={{backgroundColor: '#FECA83'}}
          />
          
    
          
    
          {/*<Button title="Back to Menu" onPress={() => navigation.navigate('Menu')}/>*/}
          <Button title="Update Meal" 
           onPress={() => submitMeal()}
           style={styles.button}
          />
          <Button title="Delete Meal" 
           onPress={() => deleteMeal()}
           style={styles.button}
          />
        </View>
        
        </SafeAreaView>
        </ScrollView>
 
      );
    }

    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      },
      RNPicker: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
      },
      title: {
        fontSize: 24,
        marginBottom: 16,
      },
      label: {
        fontSize: 18,
        textAlign: 'left',
        marginBottom: 6,
    },
      normText: {
        fontSize: 16,
        marginBottom: 9,
        marginTop: 18,
      },
      input: {
        width: '60%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        marginBottom: 12,
      },
      button: {
        backgroundColor: '44E342',
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
    