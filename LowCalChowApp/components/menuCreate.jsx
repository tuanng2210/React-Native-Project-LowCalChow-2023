import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { MultipleSelectList, SelectList} from 'react-native-dropdown-select-list';
import MenuPage from './menu';
import Icon from 'react-native-vector-icons/MaterialIcons';


function MenuCreate({route, navigation}){
    
    const { access, restaurantId } = route.params;
    const restID = route.params.restaurantId;

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
    

    function submitMeal(){
      {/*submit to database here then reset the page*/}
      handleUpdateMeal();
      navigation.navigate('Menu', {access: access, restaurantId: restID});

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
      
      <SafeAreaView>
      <View style={styles.navBar}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Restaurant Dashboard", { access, restaurantId })}
              style={styles.navItem}
            >
              <Icon name="home" size={30} color="black" />
              <Text style={styles.navText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Menu", { access, restaurantId })}
              style={styles.navItem}
            >
              <Icon name="restaurant-menu" size={30} color="black" />
              <Text style={styles.navText}>Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Settings", { access, restaurantId })}
              style={styles.navItem}
            >
              <Icon name="settings" size={30} color="black" />
              <Text style={styles.navText}>Settings</Text>
            </TouchableOpacity>
            
            
            </View>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Add Menu Item</Text>
    
          {/*Meal Name*/}
          <Text style={styles.label}>Menu Item Name:</Text>

          <TextInput
            style={styles.input}
            placeholder="Menu Item Name"
            value={mealName}
            onChangeText={(text) => setMealname(text)}
          />
    
          {/* Meal Description
          <TextInput
            style={styles.input}
            placeholder="Give a description for this meal."
            value={description}
            onChangeText={(text) => setDescription(text)}
          /> */}

          {/*Meal Price*/}
          <Text style={styles.label}>Price of Menu Item:</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter the menu item's price"
            value={mealPrice}
            onChangeText={(text) => setPrice(text)}
          />

          {/*Meal Calories*/}
          <Text style={styles.label}>Menu Item Calories:</Text>
          <TextInput
            style={styles.input}
            placeholder="How many calories is this menu item?"
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
            boxStyles={{backgroundColor: '#FDAA3A', borderRadius: 45}}
            dropdownStyles={{backgroundColor: '#FECA83'}}
          />
    
          
    
          {/*<Button title="Back to Menu" onPress={() => navigation.navigate('Menu')}/>*/}
          <TouchableOpacity
          style={[styles.button]}
           onPress={() => submitMeal()}>
           <Text style={styles.buttonText}>Submit Menu Item</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
        </SafeAreaView>
        
      );
    }

    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: "#fff",
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
        width: '30%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        marginBottom: 12,
      },
      button: {
        backgroundColor: 'orange',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 12,
        marginHorizontal: 12,
        width: "20%",
    },
      buttonText: {
          color: '#000000',
          fontWeight: 'bold',
          fontSize: 16,
      },
      error: {
          color: 'red',
          fontSize: 20,
          marginBottom: 12,
      },
      navBar: {
        flexDirection: "row",
        backgroundColor: "#FFA500", // Orange color
        padding: 10,
        justifyContent: "space-around",
        alignItems: "center",
      },
      navItem: {
        flexDirection: "row",
        alignItems: "center",
      },
      navText: {
        marginLeft: 8,
        fontSize: 18,
        color: "black",
      },
    });
    
    export default MenuCreate;
    