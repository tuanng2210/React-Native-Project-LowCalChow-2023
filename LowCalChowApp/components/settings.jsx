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

function Settings({ route, navigation }) {
  // const restaurantId = route.params.restaurantId;
  // const access = route.params.access;
  const { access, restaurantId } = route.params;
  const [restaurantInfo, setRestaurantInfo] = useState({
    newRestaurantName: "",
    rating: "",
    tags: [],
    priceLevel: "",
    phoneNumber: "",
    website: "",
    streetName: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [availableTags, setAvailableTags] = useState([]);

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
          body: JSON.stringify(restaurantInfo),
        }
      );

      if (response.ok) {
        console.log("Restaurant information updated successfully!");
        setRestaurantInfo({
          newRestaurantName: "",
          rating: "",
          tags: [],
          priceLevel: "",
          phoneNumber: "",
          website: "",
          streetName: "",
          city: "",
          state: "",
          zipCode: "",
        });
      } else {
        console.error("Failed to update restaurant information");
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
      <Text style={styles.label}>Update Restaurant Information:</Text>
      <TextInput
        style={styles.input}
        placeholder="Restaurant Name"
        onChangeText={(text) =>
          setRestaurantInfo({ ...restaurantInfo, newRestaurantName: text })
        }
        value={restaurantInfo.newRestaurantName}
      />
      <TextInput
        style={styles.input}
        placeholder="Rating"
        onChangeText={(text) =>
          setRestaurantInfo({ ...restaurantInfo, rating: text })
        }
        value={restaurantInfo.rating}
      />
      <Picker selectedValue={restaurantInfo.tags} style={styles.input}>
        {availableTags.map((tag) => (
          <Picker.Item label={tag.title} value={tag.id} key={tag.id} /> // Correct
        ))}
      </Picker>
      <Picker
        selectedValue={restaurantInfo.priceLevel}
        style={styles.input}
        onValueChange={(itemValue) =>
          setRestaurantInfo({ ...restaurantInfo, priceLevel: itemValue })
        }
      >
        <Picker.Item label="Select Price Level" value="" />
        <Picker.Item label="$" value="$" />
        <Picker.Item label="$$" value="$$" />
        <Picker.Item label="$$$" value="$$$" />
        <Picker.Item label="$$$$" value="$$$$" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={(text) =>
          setRestaurantInfo({ ...restaurantInfo, phoneNumber: text })
        }
        value={restaurantInfo.phoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Website"
        onChangeText={(text) =>
          setRestaurantInfo({ ...restaurantInfo, website: text })
        }
        value={restaurantInfo.website}
      />
      <TextInput
        style={styles.input}
        placeholder="Street Name"
        onChangeText={(text) =>
          setRestaurantInfo({ ...restaurantInfo, streetName: text })
        }
        value={restaurantInfo.streetName}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        onChangeText={(text) =>
          setRestaurantInfo({ ...restaurantInfo, city: text })
        }
        value={restaurantInfo.city}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        onChangeText={(text) =>
          setRestaurantInfo({ ...restaurantInfo, state: text })
        }
        value={restaurantInfo.state}
      />
      <TextInput
        style={styles.input}
        placeholder="Zip Code"
        onChangeText={(text) =>
          setRestaurantInfo({ ...restaurantInfo, zipCode: text })
        }
        value={restaurantInfo.zipCode}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdateInfo}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "#FFA500",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
  },
});

export default Settings;
