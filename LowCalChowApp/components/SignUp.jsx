import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import logo from "../assets/icons8-carrot-94.png";

function SignUpPage() {
  const navigation = useNavigation();

  const handleSignUpRestaurant = () => {
    navigation.navigate("Restaurant Account Creation");
  };

  const handleSignUpPatron = () => {
    navigation.navigate("Patron Account Creation");
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 80, height: 80 }} />
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
    width: 200,
  },
  buttonText: {
    color: "#black",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SignUpPage;
