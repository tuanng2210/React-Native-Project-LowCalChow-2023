import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Picker,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { MultipleSelectList } from "react-native-dropdown-select-list";

function UpdateInfo({ route, navigation }) {
  const { access, restaurantId } = route.params;
  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  const [newRestaurantName, setNewRestaurantName] = useState("");
  const [rating, setRating] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [priceLevel, setPriceLevel] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [availableTags, setAvailableTags] = useState([]);

  const formatPhoneNumber = (input) => {
    const cleaned = input.replace(/\D/g, "");
    const formattedPhoneNumber = cleaned.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "$1-$2-$3"
    );
    return formattedPhoneNumber;
  };

  const handlePhoneNumberInput = (text) => {
    const formattedPhoneNumber = formatPhoneNumber(text);
    setPhoneNumber(formattedPhoneNumber);
  };

  const handleUpdateInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/restaurants/${restaurantId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access,
          },
          body: JSON.stringify({
            newRestaurantName,
            rating,
            tags: selectedTags,
            priceLevel,
            phoneNumber,
            website,
            streetName,
            city,
            state: selectedState,
            zipCode,
          }),
        }
      );

      if (response.ok) {
        console.log("Restaurant information updated successfully!");
        setNewRestaurantName("");
        setRating("");
        setSelectedTags([]);
        setPriceLevel("");
        setPhoneNumber("");
        setWebsite("");
        setStreetName("");
        setCity("");
        setSelectedState("");
        setZipCode("");
      } else {
        const errorResponse = await response.json();
        console.error(
          "Failed to update restaurant information:",
          errorResponse
        );
      }
    } catch (error) {
      console.error("Error updating restaurant information:", error);
    }
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/restaurants/resttags/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + access,
            },
          }
        );
        const data = await response.json();
        setAvailableTags(data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Restaurant Information</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Restaurant Name"
          onChangeText={setNewRestaurantName}
          value={newRestaurantName}
        />

        <Picker
          selectedValue={selectedTags}
          onValueChange={(itemValue) => setSelectedTags(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Select Tags" value="" />
          {availableTags.map((tag) => (
            <Picker.Item label={tag.title} value={tag.id} key={tag.id} />
          ))}
        </Picker>

        <Picker
          selectedValue={priceLevel}
          onValueChange={(itemValue) => setPriceLevel(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Select Price Level" value="" />
          <Picker.Item label="$" value="$" />
          <Picker.Item label="$$" value="$$" />
          <Picker.Item label="$$$" value="$$$" />
          <Picker.Item label="$$$$" value="$$$$" />
        </Picker>

        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={handlePhoneNumberInput}
          placeholder="Phone Number"
        />

        <TextInput
          style={styles.input}
          placeholder="Website"
          onChangeText={(text) => setWebsite(text)}
          value={website}
        />

        <TextInput
          style={styles.input}
          placeholder="Street Name"
          onChangeText={(text) => setStreetName(text)}
          value={streetName}
        />

        <TextInput
          style={styles.input}
          placeholder="City"
          onChangeText={(text) => setCity(text)}
          value={city}
        />

        <Picker
          selectedValue={selectedState}
          onValueChange={(itemValue) => setSelectedState(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Select a State" value="" />
          {states.map((state, index) => (
            <Picker.Item key={index} label={state} value={state} />
          ))}
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Zip Code"
          onChangeText={(text) => setZipCode(text)}
          value={zipCode}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleUpdateInfo}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
    justifyContent: "center",
    alignContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#007bff",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#FFA500",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    width: 200,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  picker: {
    height: 40,
    borderColor: "#007bff",
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default UpdateInfo;
