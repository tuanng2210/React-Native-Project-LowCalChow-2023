import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
function viewMenuItem({route, navigation}){
    //const access = route.params.access;
    //const restID = route.params.restaurantId;
    //const mealID = rout.params.mealId;
    //const showBookmarkButton = route.params.bookmarkVis;
    //const showMenuItemButton = route.params.menuitemVis;
    const restID = 1;
    const mealID = 1;
    const access = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5MTQwMDg5LCJpYXQiOjE2OTkxMzI4ODksImp0aSI6ImViNWRlMTgxZTQwMjQzNGY4NzZlYWQ4MWMxZTgyODVkIiwidXNlcl9pZCI6NH0.0HI8wcDof3C657oZr7KCFtsoOkG8AB9_4P8fzKnSKeg';
    const showBookmarkButton = true;
    const showMenuItemButton = true;

    const [mealName, setmealName] = useState("Ramen");
    const [mealPrice, setmealPrice] = useState('');
    const [mealCalories, setmealCalories] = useState('');
    const [mealIngredients, setmealIngredients] = useState([]);
    const [mealFoodType, setmealFoodType] = useState('');
    const [mealCookStyle, setmealCookStyle] = useState('');
    const [mealAllergies, setmealAllergies] = useState([]);
    const [mealTOD, setmealTOD] = useState([]);
    const [mealRestrictions, setmealRestrictions] = useState([]);

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
                setmealName = data.item_name;
                setmealPrice = data.price;
                setmealCalories = data.calories;
                setmealIngredients = data.ingredients_tag;
                setmealFoodType = data.food_type_tag;
                setmealCookStyle = data.cook_style_tags;
                setmealAllergies = data.menu_allergy_tag;
                setmealTOD = data.time_of_day_available;
                setmealRestrictions = data.menu_restriction_tag;
                
            }
        }catch (error) {
            console.error("Error:", error);
        }
    }
    useEffect (() => {
        handleGetMeal();
    }, []);

    //todo add to bookmark list
    const handleAddToBookmark = async () => {

    }

    //todo add to menu item history list
    const handleAddToMenuItemHistory = async () => {

    }


    return (
      <SafeAreaView style={styles.container}>
            <View style={styles.menuBar}>
              
               <View style={styles.menuLeft}>
                    {/* Home */}
                  <TouchableOpacity style={styles.homeButton}
                  onPress={() => navigation.navigate('Patron Homepage',{/*} {access: access}*/})}>
                  <Icon name="home" size={36} color="black" />
              
                  </TouchableOpacity>
               </View>
               
  
              {/*Menu Item Title */}
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{mealName}</Text>
             
              {/* Empty View*/}
               <View style={styles.menuRight}>
                {/* Bookmark Button */}
              { showBookmarkButton && ( 
              <TouchableOpacity style={styles.menuButton}>
                <Icon name="bookmark" size={36} color="black" />
              
              </TouchableOpacity>
              )}
              {/* Save Menu Item Button */}
              { showMenuItemButton && (
              <TouchableOpacity style={styles.menuButton}>
                <Icon name="save" size={36} color="black" />
                
              </TouchableOpacity>
              )}
               </View>


              
            </View>
            <SafeAreaView style={styles.container}>
              <Text style={styles.normText}>Calories: {mealCalories}</Text>
              <Text style={styles.normText}>Price: ${mealPrice}</Text>
              <Text style={styles.normText}>Food Type: {mealFoodType}</Text>
              <Text style={styles.normText}>Cook Style: {mealCookStyle}</Text>
              <Text style={styles.normText}>Ingredients: {mealIngredients}</Text>
              <Text style={styles.normText}>Allergens: {mealAllergies}</Text>
              <Text style={styles.normText}>Dietary Restrictions: {mealRestrictions}</Text>
              <Text style={styles.normText}>Time Available: {mealTOD}</Text>
            </SafeAreaView>
            
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
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        padding: 20,
        backgroundColor: '#FECA83',
        position: 'fixed',
        top: 60,
        zIndex: 1,
      },
      menuRight: {
        flexDirection: 'row',
        justifyContent:'flex-end',
        alignItems: 'flex-end',
        padding: 20,
        width:'48%',

      },
      menuLeft: {
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems: 'flex-start',
        padding: 20,
        width:'48%',

      },
      menuButton: {
        marginLeft: 25,
      },
      homeButton: {
        marginRight: 25,
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