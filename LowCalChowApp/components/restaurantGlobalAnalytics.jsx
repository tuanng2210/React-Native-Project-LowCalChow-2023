import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import logo from "../assets/icons8-carrot-94.png";

function RestaurantAnalyticsOverview({ navigation, route }) {
  const [analyticsData, setAnalyticsData] = useState([]);
  const windowWidth = Dimensions.get("window").width;
  const { access } = route.params;

  useEffect(() => {
    // Fetch analytics data from API or other data source
    // Code to fetch data...

    // For demo purposes, setting dummy data
    setAnalyticsData([
      { id: 1, metric: "Sales", value: 1500 },
      { id: 2, metric: "Customers", value: 200 },
      // ... more analytics data
    ]);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.analyticsItem}>
      <Text style={styles.analyticsMetric}>{item.metric}</Text>
      <Text style={styles.analyticsValue}>{item.value}</Text>
    </View>
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
          <MaterialIcons name="home" size={24} color="black" />
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
          <MaterialIcons name="analytics" size={24} color="black" />
          {windowWidth >= 600 && (
            <Text style={styles.sidebarItemText}>Analytics</Text>
          )}
        </TouchableOpacity>

        {/* Add more sidebar items as needed */}
      </View>

      {/* Main content */}
      <View style={styles.mainContent}>
        <View style={styles.sectionTitleContainer}>
        <Image source={logo} style={{ width: 60, height: 60 }} />
          <Text style={styles.sectionTitle}>Restaurant Analytics Overview</Text>
        {/*<FlatList
          data={analyticsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />*/}
        </View>
        
        <TouchableOpacity onPress={() =>
            navigation.navigate("Analytic Dashboard", { access })
          }>
      <View style={styles.restaurantItem}>
        <Text style={styles.restaurantName}>Calorie Analytics</Text>
        
      </View>
    </TouchableOpacity>

    <TouchableOpacity>
      <View style={styles.restaurantItem}>
        <Text style={styles.restaurantName}>Restriction Tag Analytics</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity>
      <View style={styles.restaurantItem}>
        <Text style={styles.restaurantName}>Allergy Tag Analytics</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity>
      <View style={styles.restaurantItem}>
        <Text style={styles.restaurantName}>Ingredient Analytics</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity>
      <View style={styles.restaurantItem}>
        <Text style={styles.restaurantName}>Taste Tag Analytics</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity>
      <View style={styles.restaurantItem}>
        <Text style={styles.restaurantName}>Cook Style Analytics</Text>
      </View>
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
    color: "#black",
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
    paddingLeft: 100,
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  activeSidebarItem: {
    backgroundColor: "#FFC107", // Change the background color for active item
  },
  smallSidebar: {
    width: 100,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  restaurantItem: {
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    padding: 20,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    width: "50%",
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "left",
    marginBottom: 20,
  },
});

export default RestaurantAnalyticsOverview;
