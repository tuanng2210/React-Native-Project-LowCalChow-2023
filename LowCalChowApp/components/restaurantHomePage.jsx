import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

function RestaurantHomepage({ navigation, route }) {
  const [restaurants, setRestaurants] = useState([]);
  const windowWidth = Dimensions.get("window").width;
  const { access } = route.params;
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   const fetchRestaurants = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8000/restaurants/", {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${access}`,
  //         },
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         setRestaurants(data); // Update restaurants state with fetched data
  //       } else {
  //         setError("Error fetching data");
  //       }
  //     } catch (error) {
  //       setError("Error fetching data");
  //     }
  //   };

  //   fetchRestaurants();
  // }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch("http://localhost:8000/restaurants/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRestaurants(data); // Update restaurants state with fetched data
      } else {
        setError("Error fetching data");
      }
    } catch (error) {
      setError("Error fetching data");
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchRestaurants();
    }
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Restaurant Dashboard", {
          restaurantId: item.id,
          access,
        })
      }
    >
      <View style={styles.restaurantItem}>
        <Text style={styles.restaurantName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={[styles.sidebar, windowWidth < 600 && styles.smallSidebar]}>
        {/* Home */}
        <TouchableOpacity
          style={[
            styles.sidebarItem,
            route.name === "Restaurant Homepage" && styles.activeSidebarItem,
          ]}
          onPress={() => navigation.navigate("Restaurant Homepage", { access })}
        >
          <MaterialIcons name="home" size={24} color="#fff" />
          {windowWidth >= 600 && (
            <Text style={styles.sidebarItemText}>Home</Text>
          )}
        </TouchableOpacity>

        {/* Analytics */}
        <TouchableOpacity
          style={[
            styles.sidebarItem,
            route.name === "Restaurant Analytics Overview" &&
              styles.activeSidebarItem,
          ]}
          onPress={() =>
            navigation.navigate("Restaurant Analytics Overview", { access })
          }
        >
          <MaterialIcons name="analytics" size={24} color="#fff" />
          {windowWidth >= 600 && (
            <Text style={styles.sidebarItemText}>Analytics</Text>
          )}
        </TouchableOpacity>

        {/* Add more sidebar items as needed */}
      </View>

      {/* Main content */}
      <View style={styles.mainContent}>
        {/* Section Title */}
        <Text style={styles.sectionTitle}>List of Restaurants</Text>

        {/* List of Restaurants */}
        <View style={styles.restaurantListContainer}>
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()} // Assuming each restaurant object has a unique ID
          />
        </View>

        {/* Add Restaurant Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Add Restaurant")}
        >
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: 250,
    backgroundColor: "#FF9800",
    padding: 20,
  },
  sidebarItem: {
    backgroundColor: "#FF9800",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 12,
    flexDirection: "row",
  },
  sidebarItemText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  mainContent: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  restaurantItem: {
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // for Android
    width: "80%", // Set the width to 80% of the container width
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  activeSidebarItem: {
    backgroundColor: "#FFC107", // Change the background color for active item
  },
  restaurantListContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#FF9800",
    margin: 30,
    width: 70,
    height: 50,
    borderRadius: 25, // Make it a circle
    justifyContent: "center",
    alignItems: "center",
    bottom: 20,
    right: 20,
    elevation: 8, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  smallSidebar: {
    width: 100,
  },
});

export default RestaurantHomepage;
