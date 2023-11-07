import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

function SignUpPage() {
    const navigation = useNavigation();
  
    const handleSignUpRestaurant = () => {
      // Navigate to the restaurant sign-up screen
      navigation.navigate("Restaurant Account Creation");
    };
  
    const handleSignUpPatron = () => {
      // Navigate to the patron sign-up screen
      navigation.navigate("Patron Account Creation");
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "orange" }]}
          onPress={handleSignUpRestaurant}
        >
          <Text style={styles.buttonText}>Sign Up As Restaurant</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "orange" }]}
          onPress={handleSignUpPatron}
        >
          <Text style={styles.buttonText}>Sign Up As Patron</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
    },
    button: {
      borderRadius: 8,
      paddingVertical: 10,
      alignItems: "center",
      marginTop: 16,
      marginBottom: 12,
      width: 200, // Adjust the width as needed
    },
    buttonText: {
      color: "#black",
      fontWeight: "bold",
      fontSize: 16,
    },
  });
  
  export default SignUpPage;
  