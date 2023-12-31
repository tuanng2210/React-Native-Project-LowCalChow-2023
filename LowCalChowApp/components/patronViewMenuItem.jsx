import React, { useEffect, useState } from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet, ScrollView, TextInput, Image, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-svg-rating';
import {StarRatingDisplay} from 'react-native-star-svg-rating';
import logo from "../assets/icons8-carrot-94.png";

function ViewMenuItem({ route, navigation }) {
  const access = route.params.access;
  const mealID = route.params.id;

  const [showBookmarkButton, setShowBookmarkButton] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkID, setBookmarkID] = useState('null');
  if (route.params.bookmarkID) { 
    setBookmarkID(route.params.bookmarkID);
    setIsBookmarked(true);
    setShowBookmarkButton(false);
  }

  //const mealID = 1;
  //const bookmarkID = 288;
  //const access = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxNzI1OTEwLCJpYXQiOjE3MDE3MTg3MTAsImp0aSI6ImJlOWNiYTg2NjAzNzQ5MGZiOTI1ZjVmNGY3ZDFhMzVmIiwidXNlcl9pZCI6NH0.qrGsGZ6H7320hDfQLgmXAZOWTzFQ6a5K7xsTzMjGb6E';
  

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
  const [mealTaste, setMealTaste] = useState([]);
  const [mealRestrictions, setmealRestrictions] = useState([]);

  const [feedbackID, setFeedbackID] = useState('');
  const [feedbackSubmit, setFeedbackSubmit] = useState(false);
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [reviewVisible, setReviewVisible] = useState(false)
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [FailPopupVisible, setFailPopupVisible] = useState(false);
  const [failMessage, setFailMessage] = useState('');
  const [feedbackData, setFeedbackData] = useState([]);


  const handleGetMeal = async () => {
    try {
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
        setMealTaste(data.taste_tags.map(tag => tag.title));

      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  useEffect(() => {
    handleGetMeal();
  }, []);
  const handleGetFeedback = async () => {
    try {
      /* TODO MODIFY LINK TO WORK LATER */
      const response = await fetch(`http://localhost:8000/feedback/menuitems/${mealID}/`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + access,
        },
      });
      if (response.status === 200) {
        const newdata = await response.json();
        setFeedbackData(newdata);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }  
  useEffect(() => {
    handleGetFeedback();
  }, []);
  const handleAddToBookmark = async () => {
    const data =
    {
      'menu_item': mealID,
    }

    try {
      const response = await fetch('http://localhost:8000/patrons/bookmarks/', {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + access,
        },
        body: JSON.stringify(data),
      });
      if (response.status === 201) {
        showSuccessPopup(`${mealName} bookmarked successfully!`);
        setIsBookmarked(true);
        setShowBookmarkButton(false);
        const data = await response.json();
        setBookmarkID(data.id);

      }else {
        showFailPopup(`${mealName} bookmarking failed.`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleRemoveBookmark = async () => {

    try {
      const response = await fetch(`http://localhost:8000/patrons/bookmarks/${bookmarkID}/`, {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + access,
        },
      });
      if (response.status === 204) {
        showSuccessPopup(`${mealName} removed from bookmarks!`);
        setIsBookmarked(false);
        setShowBookmarkButton(true);
        setBookmarkID('null');
        
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleCheckBookmarked = async() => {
    try{
      const response = await fetch(`http://localhost:8000/patrons/bookmarks/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + access,
        },
      });
      if (response.status === 200){
        const data = await response.json();
        const bookmarkMatch = data.find(item => item.menu_item.item_name === mealName);
        console.log(data);
        console.log(bookmarkMatch);
        if (bookmarkMatch)
        {
          setBookmarkID(bookmarkMatch.id);
          setIsBookmarked(true);
          setShowBookmarkButton(false);
        }

      }
    }catch(error){
      console.log("Error: ", error);
    }
  }
  useEffect(() => {
    if (mealName != '')
    handleCheckBookmarked();
  }, [mealName]);
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

    try {
      const response = await fetch('http://localhost:8000/patrons/menuitemhistory/', {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + access,
        },
        body: JSON.stringify(data),
      });
      if (response.status === 201) {
        const data = await response.json();
        showSuccessPopup(`${mealName} added to Menu Item History!`);
        setFeedbackSubmit(false);
      }else {
        showFailPopup(`${mealName} adding to Menu Item History failed.`);
        setFeedbackSubmit(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  useEffect(() => {
    if(feedbackSubmit){
      handleAddToMenuItemHistory();
    }
  }, [feedbackSubmit]);


  const handleSubmitFeedback = async () => {

    const data = {
      menu_item: mealID,
      review: review,
      rating: rating,
    }
    console.log(data);
    try {
      const response = await fetch('http://localhost:8000/feedback/', {
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
        setFeedbackSubmit(true);

      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  function openFeedback() {
    setReviewVisible(true);
  }

  function closeFeedback(){
    setReviewVisible(false);
  }

  function subFeedback() {
    setReviewVisible(false);
    handleSubmitFeedback();
  }
  function submitBKMKList() {
    handleAddToBookmark();
  }
  function removeBookmark() {
    handleRemoveBookmark();
  }
  const toggleReview = () => {
    setReviewVisible(!reviewVisible);
    console.log(reviewVisible);
  };
  /*const handleReviewSubmit = (review) => {

  };*/
  function showSuccessPopup(message) {
    setSuccessMessage(message);
    setSuccessPopupVisible(true);
    setTimeout(() => {
      setSuccessPopupVisible(false);
    }, 2000); // Close the popup after 2 seconds (adjust as needed)
  }
  function showFailPopup(message) {
    setFailMessage(message);
    setFailPopupVisible(true);
    setTimeout(() => {
      setFailPopupVisible(false);
    }, 2000); // Close the popup after 2 seconds (adjust as needed)
  }
  const renderFeedbackItem = ({ item }) => (
    <View style={styles.feedbackItem}>
      <StarRatingDisplay
                    rating={item.rating}
                    maxStars={5}
                    starSize={20}
                    color="#5CCD28"
                    borderColor="#000000"
                    enableSwiping='false'

                  />
      <Text style={styles.feedbackText}>{item.review}</Text>
      
    </View>
  );

  return (

    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navbarItem}
          onPress={() => navigation.navigate("Patron Settings Page", { access })}
        >
          <Icon name="gear" size={24} color="#000000" />
        </TouchableOpacity>


        <View style={styles.navbarItem}>
          <Image source={logo} style={{ width: 30, height: 30 }} />
          <Text style={styles.navbarText}>Menu Item</Text>
        </View>
        <TouchableOpacity style={styles.navbarItem}
          onPress={() => navigation.navigate("Bookmark", { access })}
        >
          <Icon name="bookmark" size={25} color="#000000" />
        </TouchableOpacity>
      </View>
      {/* <SafeAreaView style={styles.menuBar}>
              
               <View style={styles.menuLeft}>
                    {/* Home 
                  <TouchableOpacity style={styles.homeButton}
                  onPress={() => navigation.navigate('Patron Homepage', {access: access})}>
                  <Icon name="home" size={36} color="black" />
              
                  </TouchableOpacity>
               </View>*/}

      <ScrollView>
     
        <View style={styles.mainContent}>
        {/*Menu Item Title */}
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{mealName}</Text>

          {/* Empty View*/}
          <View style={styles.menuRight}>
            {/*} Bookmark Button */}
              { showBookmarkButton && ( 
              <TouchableOpacity style={styles.menuButton} onPress={submitBKMKList}>
                <Icon name={'bookmark-o'} size={36} color="black" />
              
              </TouchableOpacity>
              )}
            {/*} unBookmark Button */}
              { !showBookmarkButton && ( 
              <TouchableOpacity style={styles.menuButton} onPress={removeBookmark}>
                <Icon name={'bookmark'} size={36} color="black" />
              
              </TouchableOpacity>
              )}

            {/* Save Menu Item Button */}
            {showMenuItemButton && (
              <TouchableOpacity style={styles.menuButton} onPress={openFeedback}>
                <IonIcons name={isMIHistory ? 'save' : 'save-outline'} size={36} color="black" />

              </TouchableOpacity>
            )}

          </View>
          
            {/* Feedback FlatList */}
            <View style={styles.mainContent}>

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
            {/* Display Taste Tags */}
            <Text style={styles.normText}>Taste Tags:</Text>
            <View style={styles.tagContainer}>
              {mealTaste.map((taste, index) => (
                <View style={styles.tagBubble} key={index}>
                  <Text style={styles.tagText}>{taste}</Text>
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
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={successPopupVisible}
             onRequestClose={() => {
              setSuccessPopupVisible(false)
            }}>
            <View style={styles.successPopup}>
              <Text style={styles.successPopupText}>{successMessage}</Text>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={FailPopupVisible}
             onRequestClose={() => {
              setFailPopupVisible(false)
            }}>
            <View style={styles.failPopup}>
              <Text style={styles.successPopupText}>{failMessage}</Text>
            </View>
          </Modal>
          <Modal
            animationType='slide'
            transparent={true}
            visible={reviewVisible}
            onRequestClose={() => {
              setReviewVisible(false);
            }} >
            <View style={styles.modalWrapper}>
              <View style={styles.modalContainer}>

              <TouchableOpacity style={styles.close} onPress={closeFeedback}>
                <Icon name="close" size={25} color="#00000" />
              </TouchableOpacity>

                <Text style={styles.title}>Review: {mealName}</Text>
                <View style={styles.stars}>
                  <StarRating
                    rating={rating}
                    onChange={setRating}
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
            </View>
          </Modal>
          

        </View>

      </ScrollView>
      <FlatList
              data={feedbackData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderFeedbackItem}
              horizontal
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={styles.feedbackList}
            />

      <View style={styles.buttonContainer}>

        <TouchableOpacity
          style={styles.navbarItem}
          onPress={() => navigation.navigate("Patron Homepage", { access })}
        >
          <Icon name="home" size={26} color="#000000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navbarItem}
          onPress={() => navigation.navigate("Search", { access })}
        >
          <Icon name="search" size={24} color="#000000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navbarItem}
          onPress={() => navigation.navigate("Menu Item History", { access })}
        >
          <Icon name="book" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    width: '100%',
    backgroundColor: "#fff",
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
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    width: '48%',

  },
  menuLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
    width: '48%',

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
    padding: 20
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
    backgroundColor: '#5CCD28',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 5,
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
  modalWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFA500",
    padding: 20,
    width: 600,
    height: 600,
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 5,
  },
  stars: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
  },
  mainContent: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "top",
    alignItems: "center",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFA500",
    padding: 10,
  },
  navbarItem: {
    backgroundColor: "#FFA500",
    alignItems: "center",
    flexDirection: "row", // Align icon and text horizontally
  },
  navbarText: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  buttonContainer: {
    flex: "end",
    flexDirection: "row",
    backgroundColor: "#FFA500",
    width: "100%",
    justifyContent: "space-around",
    padding: 10,
  },
  successPopup: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 10,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  failPopup: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 10,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  successPopupText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  feedbackList: {
    flex: 1,
    marginTop: 20,
    width: '80%',
    marginBottom: 20,
  },
  feedbackItem: {
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 175, 
  },
  feedbackText: {
    fontSize: 14,
    marginBottom: 5,
  },
  feedbackRating: {
    fontSize: 12,
    color: '#888888',
  },
  close:{
    backgroundColor: '#5CCD28',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 8,
    alignItems: 'right',
    marginTop: 16,
    marginBottom: 12,
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 5,
  },
});
export default ViewMenuItem;