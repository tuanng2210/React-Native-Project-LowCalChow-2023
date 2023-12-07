import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import logo from "../assets/icons8-carrot-94.png";
import Icon from "react-native-vector-icons/FontAwesome";
import StarRating from 'react-native-star-svg-rating';
import { MaterialIcons } from '@expo/vector-icons';


function AppSatisfactionFeedback({ navigation, access }) {

    const [feedbackID, setFeedbackID] = useState('');
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');
    const [reviewVisible, setReviewVisible] = useState(false);

    const handleSubmitFeedback = () => {

        const data = {
          review: review,
          rating: rating
        }

        console.log(data);
        
        try {
          const response = fetch('http://localhost:8000/feedback/app/', {
            method: "POST",
    
            headers: {
              "Content-Type": "application/json",
              "Authorization": ("Bearer " + access)
            },
            body: JSON.stringify(data)
          });

          console.log(response)

          if (response.status === 201) {
            const newdata = response.json();
    
            setFeedbackID(newdata.id);
    
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
      function openFeedback() {
        setReviewVisible(true);
      }
    
      function subFeedback() {
        setReviewVisible(false);
        handleSubmitFeedback();
        //handleAddToMenuItemHistory();
      }

      function closeFeedback(){
        setReviewVisible(false);
      }


  return (
    <View style={styles.mainContent}>

        <TouchableOpacity style={styles.button1} onPress={openFeedback}>
            <Text style={styles.buttonText}>Leave Feedback</Text>
        </TouchableOpacity>

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
                  placeholder="Tell us what you think of LowCalChow!"
                />

                <TouchableOpacity style={styles.button} onPress={subFeedback}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center"
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
    button1: {
      backgroundColor: "#FFA500",
      borderRadius: 8,
      paddingVertical: 10,
      marginTop: 8,
      marginBottom: 8,
      width: "30%",
      padding: 10,
      justifyContent: "center",
      alignItems: "center"
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
   
    buttonText: {
      color: '#000000',
      fontWeight: 'bold',
      fontSize: 16,
    },
    button: {
    
      backgroundColor: '#5CCD28',
      borderRadius: 8,
      paddingVertical: 10,
      alignItems: "center",
      marginTop: 12,
      marginBottom: 12,
      width: "20%",
    
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
  });

export default AppSatisfactionFeedback;
