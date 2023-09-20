import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

function RestaurantAccountCreationPage({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [username, email, password]);

  const validateForm = () => {
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
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = () => {
    if (isFormValid) {
      // Create a data object with the form fields
      const data = {
        email: email,
        username: username,
        password: password,
      };

      // Make an HTTP POST request to your API endpoint
      fetch("http://localhost:8000/auth/signup/restaurant/", {
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

          if (responseData.message === "success") {
            // The signup was successful, you can navigate to a success screen or perform other actions
            const { email, username, user_type } = responseData.content;
            console.log("User details:", { email, username, user_type });
            navigation.navigate("SuccessScreen");
          } else {
            // Handle any error messages returned by the API
            console.log("Message :", responseData.message);
            // You can display an error message to the user if needed
          }
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
      <Text style={styles.title}>Restaurant Sign Up</Text>

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

      <TouchableOpacity
        style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]}
        disabled={!isFormValid}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {Object.values(errors).map((error, index) => (
        <Text key={index} style={styles.error}>
          {error}
        </Text>
      ))}

      <Button
        title="Back to Login"
        onPress={() => navigation.navigate("Login")}
      />
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
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "green",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 20,
    marginBottom: 12,
  },
});

export default RestaurantAccountCreationPage;
