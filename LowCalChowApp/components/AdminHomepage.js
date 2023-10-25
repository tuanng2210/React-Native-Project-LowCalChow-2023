import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";



function AdminHomepage() {
  const route = useRoute();
  const navigation = useNavigation();
  const {access, adminId} = route.params;
  const [restaurantTags, setRestaurantTags] = useState([]);
   const [newTag, setNewTag] = useState(""); // State for user input

useEffect(() => {
  const getRestaurantTags = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/restaurants/resttags/`,
        {
           method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
        },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Log the data
        setRestaurantTags(data);
      } else {
        console.error("API Error:", response.status);
        console.error(await response.text()); // Log the response content
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  };


   getRestaurantTags();
}, [access]);

 const addTag = () => {
    if (newTag) {
      setRestaurantTags([...restaurantTags, { id: restaurantTags.length + 1, title: newTag }]);
      setNewTag(""); // Clear the input
    }
  };

  // State to manage FAQ data
  const [faqData] = useState([
    {
      question: "What is LowCalChow, and how does it work?",
      answer:
        "LowCalChow is a mobile application designed to enhance your dining experience. It connects restaurants with health-conscious patrons by providing tailored menu recommendations based on your caloric needs, dietary restrictions, and palate preferences. Restaurants benefit from insights into patron trends, enabling them to refine their menus and attract more customers.",
    },
    {
      question: "Is LowCalChow available for both restaurants and patrons?",
      answer:
        "Yes, LowCalChow caters to both restaurants and patrons. Restaurants can optimize their menus and receive valuable feedback, while patrons can easily find meals that align with their dietary preferences.",
    },
    {
      question: "How do I get started with LowCalChow?",
      answer:
        "If you're a restaurant, please contact our team to set up your account. For patrons, you can download the app from your device's app store, create a profile, and start exploring healthier dining options.",
    },
    {
      question: "Is LowCalChow available in languages other than English?",
      answer:
        "Currently, LowCalChow is available in English. We aim to expand our language offerings in the future.",
    },
    {
      question: "How do I search for meals on LowCalChow?",
      answer:
        "Simply enter your caloric needs, dietary restrictions, and palate preferences, and LowCalChow will provide you with a curated list of suitable menu items from participating restaurants.",
    },
    {
      question: "Can I provide feedback on meals I've tried?",
      answer:
        "Yes, you can leave feedback and ratings for meals you've tried. Your input helps restaurants improve their offerings and helps fellow patrons make informed choices.",
    },
    {
      question: "What kind of insights do restaurants get from LowCalChow?",
      answer:
        "Restaurants receive data on patron trends, including calorie preferences, dietary restrictions, and palate preferences. This information assists them in optimizing their menus to attract health-conscious customers.",
    },
    {
      question: "Is my personal information secure on LowCalChow?",
      answer:
        "LowCalChow takes data security seriously. We only collect the information necessary to enhance your dining experience and delete any data that is no longer needed. Rest assured that your privacy is a top priority.",
    },
    {
      question: "How does LowCalChow protect user information from breaches?",
      answer:
        "We have stringent security measures in place to protect user data, including encryption and secure server hosting. Our team regularly updates and monitors the platform to address any potential vulnerabilities.",
    },
    {
      question: "What is LowCalChow's policy on third-party data sharing?",
      answer:
        "LowCalChow does not share user data with third parties for marketing purposes. We only use data to improve our services and enhance your dining experience.",
    },

  ]);

  return (
 <View style={styles.container}>
      <Text style={styles.title}>Admin Homepage</Text>

      {/* Add a TextInput for the user to enter a new tag */}
      <TextInput
        style={styles.input}
        placeholder="Add a new tag"
        value={newTag}
        onChangeText={(text) => setNewTag(text)}
      />

      {/* Add button to add a new tag */}
      <Button title="Add" onPress={addTag} />

      {/* List of Restaurant Tags */}
      <FlatList
        data={restaurantTags}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  tagContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  tagText: {
    fontSize: 16,
  },
   input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1, // Updated this value to 1
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20, // Added margin to separate the FAQ container
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalInput: {
    width: "80%",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
  },
  faqContainer: {
    marginTop: 20, // Adjusted the top margin for FAQ container
  },
  faqTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  faqItem: {
    marginBottom: 16,
  },
  faqQuestion: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 16,
  },
});


export default AdminHomepage;
