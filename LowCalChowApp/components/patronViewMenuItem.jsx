import React, { useEffect, useState } from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-svg-rating';
function viewMenuItem({route, navigation}){
    const access = route.params.access;
    const mealID = route.params.mealId;
    const [bookmarkID, setBookmarkID] = useState('null');
    if (route.params.bookmarkID){ setBookmarkID(route.params.bookmarkID);}
    
    //const mealID = 1;
    //const bookmarkID = null;
    //const access = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5NDA3MjA4LCJpYXQiOjE2OTk0MDAwMDgsImp0aSI6IjM0YjFkZTYxZDE0NzQ0Yzg5ODJhYjVjYzE0NzdkNzlkIiwidXNlcl9pZCI6NH0.UVUoWGeWFjnya_kz6NfOD9gfSdN2ZUGYwk-XP2mmeV4';
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
    
    const [feedbackID, setFeedbackID] = useState('');
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');
    const [reviewVisible, setReviewVisible] = useState(false);

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
                console.log(data);
                setmealName(data.item_name);
                setmealPrice(data.price);
                setmealCalories(data.calories);
                setmealIngredients(data.ingredients_tag.map(tag => tag.title));
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
      console.log(feedbackID);
      let data = {
        'menu_item': mealID,
        'review': feedbackID,
      };
  
      if (bookmarkID != 'null') {
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
          const data = await response.json();
        }
      }catch (error) {
        console.error("Error:", error);
      }
    }
    useEffect(() => {
      handleAddToMenuItemHistory();
    }, [feedbackID]);


    const handleSubmitFeedback = async () => {
  
      const data = {
        'menu_item': mealID,
        'review': review,
        'rating': rating,
      }
      console.log(data);
      try{
        const response = await fetch ('http://localhost:8000/feedback/', {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access,
          },
          body: JSON.stringify(data),
        });
        if (response.status === 201) {
          const newdata = await response.json();
        
          setFeedbackID(newdata.id);
        
        }
      }catch (error) {
        console.error("Error:", error);
      }
    }
    function openFeedback(){
      setReviewVisible(true);
    }
    
    function subFeedback(){
      setReviewVisible(false);
      handleSubmitFeedback();
      //handleAddToMenuItemHistory();
    }
    function submitBKMKList(){
      handleAddToBookmark();
    }
    const toggleReview = () =>{
      setReviewVisible(!reviewVisible);
      console.log(reviewVisible);
    };
    const handleReviewSubmit = (review) => {

    };

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
              <TouchableOpacity style={styles.menuButton} onPress={openFeedback}>
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
            <View style={styles.modalWrapper}>
              <Modal
              animationType='slide'
              transparent={true}
              visible={reviewVisible}
              onRequestClose={() =>{
                setReviewVisible(false);
              }} >
                <View style={styles.modalContainer}>

                  <Text style={styles.title}>Review: {mealName}</Text>
                  <View style={styles.stars}>
                  <StarRating
                    rating = {rating}
                    onChange = {setRating}
                    maxStars={5}
                    starSize={64}
                    color="#5CCD28"
                    borderColor="#000000"
                    enableSwiping='true'

                  />
                  </View>

                  <TextInput
                  style={styles.input}
                  value={review}
                  onChangeText={(text) => setReview(text)}
                  placeholder="Leave feedback about your experience"
                  />

                  <TouchableOpacity style={styles.button} onPress={subFeedback}>
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
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
      menuBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        padding: 20,
        backgroundColor: '#FFA500',
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
        height: 200,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        marginBottom: 12,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
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
        backgroundColor: '#44E342', // Background color for the tag bubble
        borderRadius: 20, // Border radius to create a circular shape
        paddingHorizontal: 10, // Horizontal padding to provide some space around the text
        paddingVertical: 5, // Vertical padding to provide some space around the text
        margin: 5, // Margin between tag bubbles
      },
      tagText: {
        fontSize: 14,
        color: 'black',
      },
      modalContainer: {
        width: '50%',
        height: '80%',
        justifyContent: 'flex-start',
        alignItems:'center',
        backgroundColor:"#FFA500",
        padding: 50,
        borderColor: '#000000',
      },
      stars: {
        flex: 1,
        alignItems: 'center',
        marginTop:50,
      },

        
    });
    export default viewMenuItem;