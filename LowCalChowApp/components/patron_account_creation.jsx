import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import logo from "../assets/icons8-carrot-94.png";

function PatronAccountCreationPage({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    let errors = {};

    if (!username) {
      errors.username = "Username is required.";
    }

    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "You must confirm your password.";
    } else if (confirmPassword != password) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      const data = {
        email: email,
        username: username,
        password: password,
      };

      fetch("http://localhost:8000/auth/signup/patron/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((responseData) => {
          // Handle the API response here
          console.log("API response:", responseData);

          const access = responseData.tokens.access;
          // The signup was successful, you can navigate to a success screen or perform other actions
          navigation.navigate("Patron Profile Creation", { access: access });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.log("Form has errors.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 80, height: 80 }} />
      <Text style={styles.title}>Patron Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {Object.keys(errors).map((key, index) => (
        <Text key={index} style={styles.error}>
          {errors[key]}
        </Text>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(("Login"))}>
        <Text style={styles.buttonText}>Back</Text>
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
  input: {
    width: "30%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "orange",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
    width: 100,
  },
  buttonText: {
    color: "#black",
    fontWeight: "bold",
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 20,
    marginBottom: 12,
  },
});

export default PatronAccountCreationPage;
