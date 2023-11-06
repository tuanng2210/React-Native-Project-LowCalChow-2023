import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';
import patronReview from './patronReview';
function viewMenuItem({route, navigation}){
    //const access = route.params.access;
    //const mealID = rout.params.mealId;
    //const showBookmarkButton = route.params.bookmarkVis;
    //const showMenuItemButton = route.params.menuitemVis;
    const mealID = 1;
    const bookmarkID = null;
    const access = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5MjM2NzAzLCJpYXQiOjE2OTkyMjk1MDMsImp0aSI6IjVmYWQzODFjOWEyZjQxNzE5ODJhODViZTc3ZDQ0YzAwIiwidXNlcl9pZCI6NH0.o597x4GcMAKJ3T7NJp-IOVmOoGc54bhcLjWulDiAmqs';
    const showBookmarkButton = true;
    const [isBookmarked, setIsBookmarked] = useState(false);
    const showMenuItemButton = true;
    const [isMIHistory, setIsMIHistory] = useState(false);

    const [mealName, setmealName] = useState('');
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
            const response = await fetch(`http://localhost:8000/restaurants/menuitems/${mealID}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + access,
            },
            });

            if (response.status === 200) {
                const data = await response.json();
                setmealName(data.item_name);
                setmealPrice(data.price);
                setmealCalories(data.calories);
                setmealIngredients(data.ingredients_tag.map(tag => tag.title));
                console.log(mealIngredients);
                setmealFoodType(data.food_type_tag.title);
                setmealCookStyle(data.cook_style_tags.title);
                setmealAllergies(data.menu_allergy_tag.map(tag => tag.title));
                setmealTOD(data.time_of_day_available);
                setmealRestrictions(data.menu_restriction_tag.map(tag => tag.title));
                
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
      const data = 
      {
        'menu_item': mealID,
      }

      try{
        const response = await fetch ('http://localhost:8000/patrons/bookmarks/', {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access,
          },
          body: JSON.stringify(data),
        });
        if (response.status === 200) {
          setIsBookmarked(true);
          const data = await response.json();
        }
      }catch (error) {
        console.error("Error:", error);
      }
    }

    //todo add to menu item history list
    const handleAddToMenuItemHistory = async () => {
  
      let data = {
        'menu_item': mealID,
        'review': null,
      };
  
      if (bookmarkID != null) {
        data = {
          ...data,
          'bookmarkid': bookmarkID,
        };
      }
      try{
        const response = await fetch ('http://localhost:8000/patrons/menuitemhistory/', {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access,
          },
          body: JSON.stringify(data),
        });
        if (response.status === 200) {
          const data = await response.json()
        }
      }catch (error) {
        console.error("Error:", error);
      }
    }

    function submitMIHistory(){
      handleAddToMenuItemHistory();
    }
    function submitBKMKList(){
      handleAddToBookmark();
    }


    return (
      <SafeAreaView style={styles.container}>
            <SafeAreaView style={styles.menuBar}>
              
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
              <TouchableOpacity style={styles.menuButton} onPress={submitBKMKList}>
                <Icon name={isBookmarked ? 'bookmark' : 'bookmark-o'} size={36} color="black" />
              
              </TouchableOpacity>
              )}
              {/* Save Menu Item Button */}
              { showMenuItemButton && (
              <TouchableOpacity style={styles.menuButton} onPress={submitMIHistory}>
                <IonIcons name={isMIHistory ? 'save' : 'save-outline'} size={36} color="black" />
                
              </TouchableOpacity>
              )}
               </View>


              
            </SafeAreaView>
            <SafeAreaView style={styles.container}>
              <Text style={styles.normText}>Calories: {mealCalories}</Text>
              <Text style={styles.normText}>Price: ${mealPrice}</Text>
              <Text style={styles.normText}>Food Type: {mealFoodType}</Text>
              <Text style={styles.normText}>Cook Style: {mealCookStyle}</Text>
              {/* Display Ingredients */}
              <Text style={styles.normText}>Ingredients:</Text>
                    <View style={styles.tagContainer}>
                      {mealIngredients.map((ingredient, index) => (
                        <View style={styles.tagBubble} key={index}>
                          <Text style={styles.tagText}>{ingredient}</Text>
                        </View>
                      ))}
                    </View>

              {/* Display Allergens */}
              <Text style={styles.normText}>Allergens:</Text>
              <View style={styles.tagContainer}>
                {mealAllergies.map((allergen, index) => (
                  <View style={styles.tagBubble} key={index}>
                    <Text style={styles.tagText}>{allergen}</Text>
                  </View>
                ))}
              </View>

              {/* Display Dietary Restrictions */}
              <Text style={styles.normText}>Dietary Restrictions:</Text>
              <View style={styles.tagContainer}>
                {mealRestrictions.map((restriction, index) => (
                  <View style={styles.tagBubble} key={index}>
                    <Text style={styles.tagText}>{restriction}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.normText}>Time Available: {mealTOD}</Text>
            </SafeAreaView>
            
            <ReviewForm
             isVisible={isReviewModalVisible}
             onClose={toggleReviewModal}
             onSubmit={handleReviewSubmit}
            />
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
      },  
      tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
      },
      tagBubble: {
        backgroundColor: '#FFC0CB', // Background color for the tag bubble
        borderRadius: 20, // Border radius to create a circular shape
        paddingHorizontal: 10, // Horizontal padding to provide some space around the text
        paddingVertical: 5, // Vertical padding to provide some space around the text
        margin: 5, // Margin between tag bubbles
      },
      tagText: {
        fontSize: 14,
        color: 'black',
      },
    });
    export default viewMenuItem;