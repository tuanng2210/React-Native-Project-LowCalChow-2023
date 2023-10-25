import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';

function viewMenuItem({route, navigation}){
    const access = route.params.access;
    const restID = route.params.restaurantId;
    const mealID = rout.params.mealId;

    const mealName = "";
    const mealPrice = "";
    const mealCalories = "";
    const mealIngredients = [];
    const mealFoodType = "";
    const mealCookStyle = "";
    const mealAllergies = [];
    const mealTOD = [];
    const mealRestrictions = [];

    const handleGetMeal = async () => {
        try{
            const response = await fetch(`http://localhost:8000/restaurants/${restID}/menuitems/${mealID}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + access,
            },
            });

            if (response.status === 200) {
                const data = await response.json();
                mealName = data.item_name;
                mealPrice = data.price;
                mealCalories = data.calories;
                mealIngredients = data.ingredients_tag;
                mealFoodType = data.food_type_tag;
                mealCookStyle = data.cook_style_tags;
                mealAllergies = data.menu_allergy_tag;
                mealTOD = data.time_of_day_available;
                mealRestrictions = data.menu_restriction_tag;
                
            }
        }catch (error) {
            console.error("Error:", error);
        }
    }
    useEffect (() => {
        handleGetMeal();
    }, []);
    return (
      <SafeAreaView style={styles.container}>
            <View style={styles.menuBar}>

              {/* Bookmark Button */}
              <TouchableOpacity style={styles.menuButton}>
                <Text>Bookmark</Text>
              </TouchableOpacity>
              {/* Save Menu Item Button */}
              <TouchableOpacity style={styles.menuButton}>
                <Text>Save Menu Item</Text>
              </TouchableOpacity>
            </View>

            {/* Rest of your content */}
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
      menuBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        padding: 10,
        backgroundColor: '#eee', // Change the background color as needed
      },
      menuButton: {
        marginLeft: 10,
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
    export default viewMenuItem;