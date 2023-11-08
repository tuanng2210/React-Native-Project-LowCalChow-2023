import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';

function Settings({ route, navigation }) {
  const { access, restaurantId } = route.params;
  const [restaurantData, setRestaurantData] = useState(null);

  const navigateToUpdateInfo = () => {
    navigation.navigate("Update Info", { access, restaurantId });
  };

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/restaurants/${restaurantId}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setRestaurantData(data);
        } else {
          console.error("Error fetching restaurant data: ", response.status);
        }
      } catch (error) {
        console.error("Error fetching restaurant data: ", error);
      }
    };

    fetchRestaurantData();
  }, [restaurantId]);

  function formatTime(time) {
    const [hours, minutes] = time.split(":");
    let formattedTime = "";

    if (hours < 12) {
      formattedTime = `${hours}:${minutes} AM`;
    } else if (hours === "12") {
      formattedTime = `${hours}:${minutes} PM`;
    } else {
      formattedTime = `${hours - 12}:${minutes} PM`;
    }

    return formattedTime;
  }

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.navItem}
        >
          <Icon name="home" size={30} color="black" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Menu", { access, restaurantId })}
          style={styles.navItem}
        >
          <Icon name="restaurant-menu" size={30} color="black" />
          <Text style={styles.navText}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Settings", { access, restaurantId })
          }
          style={styles.navItem}
        >
          <Icon name="settings" size={30} color="black" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
      {restaurantData && (
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{restaurantData.name}</Text>

          <Text style={styles.restaurantAddress}>
            <Text style={styles.label}>Address:</Text>{" "}
            {restaurantData.street_name}, {restaurantData.city},{" "}
            {restaurantData.state} {restaurantData.zip_code}
          </Text>
          <Text style={styles.restaurantPhoneNumber}>
            <Text style={styles.label}>Phone:</Text>{" "}
            {restaurantData.phone_number}
          </Text>
          <Text style={styles.restaurantWebsite}>
            <Text style={styles.label}>Website:</Text> {restaurantData.website}
          </Text>
          <Text style={styles.restaurantRating}>
            <Text style={styles.label}>Rating:</Text> {restaurantData.rating}
          </Text>
          <View style={styles.tagsContainer}>
            <Text style={styles.label}>Tags: </Text>
            {restaurantData.tags.map((tag) => (
              <Text key={tag.id} style={styles.tag}>
                {tag.title}
              </Text>
            ))}
          </View>
          <View style={styles.openingHoursContainer}>
            <Text style={styles.openingHoursLabel}>Open Hours:</Text>
            <View style={styles.openingHours}>
              <Text style={styles.dayText}>
                Mon:{" "}
                {restaurantData.mon_open && formatTime(restaurantData.mon_open)}{" "}
                -{" "}
                {restaurantData.mon_close &&
                  formatTime(restaurantData.mon_close)}
              </Text>
              <Text style={styles.dayText}>
                Tue:{" "}
                {restaurantData.tue_open && formatTime(restaurantData.tue_open)}{" "}
                -{" "}
                {restaurantData.tue_close &&
                  formatTime(restaurantData.tue_close)}
              </Text>
              <Text style={styles.dayText}>
                Wed:{" "}
                {restaurantData.wed_open && formatTime(restaurantData.wed_open)}{" "}
                -{" "}
                {restaurantData.wed_close &&
                  formatTime(restaurantData.wed_close)}
              </Text>
              <Text style={styles.dayText}>
                Thu:{" "}
                {restaurantData.thu_open && formatTime(restaurantData.thu_open)}{" "}
                -{" "}
                {restaurantData.thu_close &&
                  formatTime(restaurantData.thu_close)}
              </Text>
              <Text style={styles.dayText}>
                Fri:{" "}
                {restaurantData.fri_open && formatTime(restaurantData.fri_open)}{" "}
                -{" "}
                {restaurantData.fri_close &&
                  formatTime(restaurantData.fri_close)}
              </Text>
              <Text style={styles.dayText}>
                Sat:{" "}
                {restaurantData.sat_open && formatTime(restaurantData.sat_open)}{" "}
                -{" "}
                {restaurantData.sat_close &&
                  formatTime(restaurantData.sat_close)}
              </Text>
              <Text style={styles.dayText}>
                Sun:{" "}
                {restaurantData.sun_open && formatTime(restaurantData.sun_open)}{" "}
                -{" "}
                {restaurantData.sun_close &&
                  formatTime(restaurantData.sun_close)}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.updateInfoButton}
              onPress={navigateToUpdateInfo}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  restaurantInfo: {
    marginTop: 40,
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: "40%",
    justifyContent: "center",
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  restaurantAddress: {
    fontSize: 16,
    marginBottom: 10,
  },
  restaurantPhoneNumber: {
    fontSize: 16,
    marginBottom: 10,
  },
  restaurantRating: {
    fontSize: 16,
    marginBottom: 10,
  },
  restaurantWebsite: {
    fontSize: 16,
    marginBottom: 10,
  },
  updateInfoButton: {
    backgroundColor: "#FFA500",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    width: "20%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#black",
    fontSize: 16,
    fontWeight: "bold",
  },
  tagsContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tag: {
    fontSize: 16,
    marginLeft: 5,
  },
  openingHoursLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  openingHours: {
    marginTop: 10,
  },
  dayText: {
    fontSize: 16,
    marginBottom: 8,
  },
  navBar: {
    flexDirection: "row",
    backgroundColor: "#FFA500", // Orange color
    padding: 10,
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  navText: {
    marginLeft: 8,
    fontSize: 18,
    color: "black",
  },
});

export default Settings;
