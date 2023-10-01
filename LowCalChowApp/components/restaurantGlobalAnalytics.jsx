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

function RestaurantAnalyticsOverview({ navigation, route }) {
  const [analyticsData, setAnalyticsData] = useState([]);
  const windowWidth = Dimensions.get("window").width;

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
          onPress={() => navigation.navigate("Restaurant Homepage")}
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
          onPress={() => navigation.navigate("Restaurant Analytics Overview")}
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
        <Text style={styles.sectionTitle}>Restaurant Analytics Overview</Text>
        <FlatList
          data={analyticsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
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
  activeSidebarItem: {
    backgroundColor: "#FFC107", // Change the background color for active item
  },
  smallSidebar: {
    width: 100,
  },
});

export default RestaurantAnalyticsOverview;
