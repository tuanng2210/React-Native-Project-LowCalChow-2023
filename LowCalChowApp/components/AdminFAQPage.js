import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const faqData = [
  {
    question: "What is LowCalChow, and how does it work?", //check
    answer: "LowCalChow is a mobile application designed to enhance your dining experience. It connects restaurants with health-conscious patrons by providing tailored menu recommendations based on your caloric needs, dietary restrictions, and palate preferences. Restaurants benefit from insights into patron trends, enabling them to refine their menus and attract more customers.",
  },
  {
    question: "Is LowCalChow available for both restaurants and patrons?",
    answer: "Yes, LowCalChow caters to both restaurants and patrons. Restaurants can optimize their menus and receive valuable feedback, while patrons can easily find meals that align with their dietary preferences.",
  },
  {
    question: "How do I get started with LowCalChow?",
    answer: "If you're a restaurant, please contact our team to set up your account. For patrons, you can download the app from your device's app store, create a profile, and start exploring healthier dining options.",
  },
  {
    question: "Is LowCalChow available in languages other than English?",
    answer: "Currently, LowCalChow is available in English. We aim to expand our language offerings in the future.",
  },
  {
    question: "How do I search for meals on LowCalChow?",
    answer: "Simply enter your caloric needs, dietary restrictions, and palate preferences, and LowCalChow will provide you with a curated list of suitable menu items from participating restaurants.",
  },
  {
    question: "Can I provide feedback on meals I've tried?",
    answer: "Yes, you can leave feedback and ratings for meals you've tried. Your input helps restaurants improve their offerings and helps fellow patrons make informed choices.",
  },
  {
    question: "What kind of insights do restaurants get from LowCalChow?",
    answer: "Restaurants receive data on patron trends, including calorie preferences, dietary restrictions, and palate preferences. This information assists them in optimizing their menus to attract health-conscious customers.",
  },
  {
    question: "Is my personal information secure on LowCalChow?",
    answer: "LowCalChow takes data security seriously. We only collect the information necessary to enhance your dining experience and delete any data that is no longer needed. Rest assured that your privacy is a top priority.",
  },
  {
    question: "How does LowCalChow protect user information from breaches?",
    answer: "We have stringent security measures in place to protect user data, including encryption and secure server hosting. Our team regularly updates and monitors the platform to address any potential vulnerabilities.",
  },
  {
    question: "What is LowCalChow's policy on third-party data sharing?",
    answer: "LowCalChow does not share user data with third parties for marketing purposes. We only use data to improve our services and enhance your dining experience.",
  },
];

function AdminFAQ() {
  const renderItem = ({ item }) => (
    <View style={styles.faqItem}>
      <Text style={styles.question}>{item.question}</Text>
      <Text style={styles.answer}>{item.answer}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FAQs</Text>
      <FlatList
        data={faqData}
        renderItem={renderItem}
        keyExtractor={(item) => item.question}
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
  faqItem: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  answer: {
    fontSize: 16,
  },
});

export default AdminFAQ;
