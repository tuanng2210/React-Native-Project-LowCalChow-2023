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
  const [existingData, setExistingData] = useState(null);

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
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

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

  const fetchExistingData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/restaurants/${restaurantId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // const restaurantData = data;
        // setExistingData(restaurantData);

        if (!newRestaurantName) setNewRestaurantName(data.name);
        if (!rating) setRating(data.rating);
        // if (selectedTags.length === 0) setSelectedTags(data.tags);
        if (!priceLevel) setPriceLevel(data.price_level);
        if (!phoneNumber) setPhoneNumber(data.phone_number);
        if (!website) setWebsite(data.website);
        if (!streetName) setStreetName(data.street_name);
        if (!city) setCity(data.city);
        if (!selectedState) setSelectedState(data.state);
        if (!zipCode) setZipCode(data.zip_code);
      } else {
        console.error("Failed to fetch restaurant information");
      }
    } catch (error) {
      console.error("Error fetching restaurant information:", error);
    }
  };

  const handleUpdateInfo = async () => {
    const data = {
      name: newRestaurantName,
      rating: rating,
      tags: selectedTags,
      price_level: priceLevel,
      phone_number: phoneNumber,
      website: website,
      street_name: streetName,
      city: city,
      state: selectedState,
      zip_code: zipCode,
    };
    console.log(data);
    try {
      const response = await fetch(
        `http://localhost:8000/restaurants/${restaurantId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        console.log("Restaurant information updated successfully!");
        // setNewRestaurantName("");
        // setRating("");
        // setSelectedTags([]);
        // setPriceLevel("");
        // setPhoneNumber("");
        // setWebsite("");
        // setStreetName("");
        // setCity("");
        // setSelectedState("");
        // setZipCode("");

        setSuccessMessageVisible(true);
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 2000);
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

  const fetchRestTags = async () => {
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
      if (response.status === 200) {
        const data = await response.json();
        const formTags = data.map((item) => ({
          key: item.id,
          value: item.title,
        }));
        setAvailableTags(formTags);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchExistingData();
    fetchRestTags();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Update Restaurant Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Restaurant Name"
          onChangeText={setNewRestaurantName}
          value={newRestaurantName}
        />

        <TextInput
          style={styles.input}
          placeholder="Rating"
          onChangeText={setRating}
          value={rating}
        />

        <Text style={styles.modalSelectTag}>Select Tags</Text>
        <View
          style={{ marginVertical: 15, paddingHorizontal: 0, width: "20%" }}
        >
          <MultipleSelectList
            setSelected={(val) => setSelectedTags(val)}
            data={availableTags}
            save="key"
            label="Tags"
            boxStyles={{ backgroundColor: "", borderRadius: 10 }}
            dropdownStyles={{
              backgroundColor: "",
              borderRadius: 10,
              width: "100%",
            }}
          />
        </View>

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

        <TouchableOpacity style={styles.button} onPress={handleUpdateInfo}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Settings", { access, restaurantId })
          }
        >
          <Text style={styles.buttonText}>Back To Settings</Text>
        </TouchableOpacity>
        {successMessageVisible && (
          <View style={styles.successMessage}>
            <Text style={styles.successMessageText}>
              Restaurant information updated successfully!
            </Text>
          </View>
        )}
      </View>
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
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  formContainer: {
    margin: 30,
    justifyItems: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
    width: "20%",
  },
  button: {
    backgroundColor: "#FFA500",
    margin: 10,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    width: "10%",
  },
  buttonText: {
    color: "#black",
    fontSize: 14,
    fontWeight: "bold",
  },
  picker: {
    height: 40,
    borderColor: "#007bff",
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
  },
  successMessage: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  successMessageText: {
    color: "#ffffff",
    textAlign: "center",
  },
});

export default UpdateInfo;
