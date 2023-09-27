import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function LoginPage({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const handleLogin = () => {
  //   console.log('Username:', username);
  //   console.log('Password:', password);
  //   // You can add your authentication logic here
  // };
  // const handleLogin = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/auth/login/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });

  //     if (response.status === 200) {
  //       // Authentication successful
  //       console.log("Authentication successful");
  //     } else {
  //       // Handle authentication error (e.g., show error message)
  //       console.log("Authentication failed");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const { user_type, tokens } = data;
        const { access, refresh } = tokens;

        // Store the access and refresh tokens securely
        // You can use a library like AsyncStorage for React Native or localStorage for web

        if (user_type === "restaurant") {
          // Redirect to the restaurant homepage
          navigation.navigate("RestaurantHomepage");
        } else if (user_type === "customer") {
          // Redirect to the customer homepage
          // navigation.navigate("CustomerHomepage");
        } else {
          // Handle other user types or scenarios
        }
      } else {
        // Handle authentication error (e.g., show error message)
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "orange" }]} // Set the background color to orange
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "orange" }]} // Set the background color to orange
        onPress={() => navigation.navigate("Restaurant Account Creation")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
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
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
    width: 100,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LoginPage;
