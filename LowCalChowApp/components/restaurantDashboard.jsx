import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

function RestaurantDashboard() {
  const route = useRoute();
  const navigation = useNavigation();
  const { access, restaurantId } = route.params;
  const [restaurantData, setRestaurantData] = useState(null);

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
          // Handle error
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchRestaurantData();
  }, [restaurantId]);

  if (!restaurantData) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
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
          onPress={() => navigation.navigate("Settings", { access, restaurantId })}
          style={styles.navItem}
        >
          <Icon name="settings" size={30} color="black" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate("Analytics")}
          style={styles.navItem}
        >
          <Icon name="analytics" size={30} color="black" />
          <Text style={styles.navText}>Analytics</Text>
        </TouchableOpacity> */}
      </View>
      {/* Render other restaurant dashboard content */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  navBar: {
    flexDirection: "row",
    backgroundColor: "#FFA500", // Orange color
    padding: 10,
    justifyContent: "space-around",
    alignItems: "center",
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

export default RestaurantDashboard;
