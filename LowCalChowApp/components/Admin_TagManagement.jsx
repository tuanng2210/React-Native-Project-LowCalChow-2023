import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ImageBackground, TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { PieChart } from "react-native-svg-charts";
import { BarChart } from "react-native-chart-kit";
import logo from "../assets/icons8-carrot-94.png";
import TrendComponent from "./TrendComponent";


function AdminHomepage() {
  const route = useRoute();
  const navigation = useNavigation();
  const { access, adminId } = route.params;
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch('http://localhost:8000/analytics/global/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAnalyticsData(data); // Set the fetched analytics data
        } else {
          console.error('API Error:', response.status);
          console.error(await response.text()); // Log the response content
        }
      } catch (error) {
        console.error('Network Error:', error);
      }
    };

  }, [access]);


    return (
     <View style={styles.container}>
      {/* Header in an orange box */}

       {/* Navigation Bar */}
      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Admin Homepage', { access })}>
          <Text style={styles.navItem}>Global Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Admin FAQ Page', { access })}>
          <Text style={styles.navItem}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Admin Tag Management', { access })}>
          <Text style={styles.navItem}>Tag Management</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Admin Restaurant Analytics', { access })}>
          <Text style={styles.navItem}>Restaurant Analytics Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Admin User Feedback', { access })}>
          <Text style={styles.navItem}>User Feedback</Text>
        </TouchableOpacity>
      </View>

      {/* New Container for Tag Management */}
      <View style={styles.tagManagementContainer}>
        {/* Header for Tag Management */}
        <View style={styles.tagManagementHeader}>
          <Text style={styles.tagManagementHeaderText}>Tag Management</Text>
        </View>

          <View style={styles.descriptionContainer}>
      <Text style={styles.descriptionText}>
      Tag Management enables control over various tag categories, including Rest Tags, Food Type Tags, Cook Style Tags, Taste Tags, Restriction Tags, Allergy Tags, Ingredient Tags, and more. Navigate between categories to add, delete, or modify tags within each category as needed.
      </Text>
    </View>
        {/* Buttons for different tag categories */}
        <View style={styles.tagButtonsContainer}>
          <View style={{ marginBottom: 10 }}>
          <Button
            title="Rest Tags"
            onPress={() => navigation.navigate("Admin RestTags", { access })}
            color="orange"
            style={[styles.tagButton, { marginBottom: 10 }]}
          />
            </View>
          {/* Add other buttons similarly */}
          <View style={{ marginBottom: 10 }}>
          <Button
            title="Food Type Tags"
            onPress={() => navigation.navigate("Admin Food Type Tags", { access })}
            color="orange"
            style={[styles.tagButton, { marginBottom: 10 }]}
          />
           </View>
          <View style={{ marginBottom: 10 }}>
          <Button
            title="Cook Style Tags"
            onPress={() => navigation.navigate("Admin Cook Style Tags", { access })}
            color="orange"
            style={[styles.tagButton, { marginBottom: 10 }]}
          />
            </View>
           <View style={{ marginBottom: 10 }}>
          <Button
            title="Taste Tags"
            onPress={() => navigation.navigate("Admin Taste Tags", { access })}
            color="orange"
            style={[styles.tagButton, { marginBottom: 10 }]}
          />
            </View>
           <View style={{ marginBottom: 10 }}>
          <Button
            title="Restriction Tags"
            onPress={() => navigation.navigate("Admin Restriction Tags", { access })}
            color="orange"
            style={[styles.tagButton, { marginBottom: 10 }]}
          />
            </View>
           <View style={{ marginBottom: 10 }}>
          <Button
            title="Allergy Tags"
            onPress={() => navigation.navigate("Admin Allergy Tags", { access })}
            color="orange"
            style={[styles.tagButton, { marginBottom: 10 }]}
          />
            </View>
           <View style={{ marginBottom: 10 }}>
          <Button
            title="Ingredient Tags"
            onPress={() => navigation.navigate("Admin Ingredient Tags", { access })}
            color="orange"
            style={[styles.tagButton, { marginBottom: 10 }]}
          />
            </View>
          {/* ... Add other buttons for different tag categories */}
        </View>
      </View>

          {/* ... Add other buttons for different tag categories */}
      </View>
  );
}

const styles = StyleSheet.create({
  addButtonContainer: {
    marginBottom: 32,
  },
  analyticsContainer: {
   // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  analyticsComponentContainer: {
    // Use this container to wrap components for proper alignment
    alignItems: 'center',
    // ... Other styles as needed
  },
    analyticsBackgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%', // Ensure full width
    height: '100%',
    alignItems: 'center', // Center content horizontally
    },
  analyticsContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  analyticsHeader: {
    marginTop: 16,
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    borderBottomWidth: 1, // Add this line to create an underline
    borderBottomColor: 'white', // Adjust the color as needed
    width: '100%',
  },
  baranalyticsHeader: {
  marginTop: 16,
  fontSize: 32,
  fontWeight: 'bold',
  marginBottom: 8,
  textAlign: 'center',
    textShadowColor: '#000',
  textShadowOffset: { width: 1, height: 1 }, // Add shadow for a more appealing look
  textShadowRadius: 2,
  },
  analyticsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
  analyticsDataContainer: {
    // Adjust spacing between individual data elements
    marginVertical: 10,
    alignItems: 'center',
  },
  bar: {
    alignItems: 'center',
    backgroundColor: 'blue',
    height: 20,
    justifyContent: 'center',
    marginRight: 5,
  },
  barChart: {
    marginTop: 20,
  },
  barContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    backgroundColor: 'black',
  },
  barLabel: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonSpacer: {
    width: 10,
  },
  chartLabel: {
    fontSize: 14,
  },
  chartLabelBold: {
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
  },
  descriptionContainer: {
    alignItems: 'center',
    backgroundColor: '#RRGGBB',
    borderRadius: 8,
    marginTop: 20,
    padding: 16,
  },
  descriptionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  faqContainer: {
    alignItems: 'center',
    backgroundColor: '#d4d4aa',
    borderRadius: 8,
    marginTop: 20,
    padding: 16,
  },
  faqContent: {
    alignItems: 'center',
  },
  faqHeader: {
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  faqText: {
    color: 'white',
    marginBottom: 16,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: 'orange',
    padding: 16,
  },
  headerText: {
    alignItems: 'center',
    color: 'white',
    fontSize: 56,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    left: 0,
    padding: 16,
    position: 'absolute',
    right: 0,
    top: '30%',
  },
  modalInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  pieChart: {
    aspectRatio: 1,
    height: 200,
    marginTop: 16,
  },
  pieChartContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 1,
  },
  pieChartLabels: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    backgroundColor: '#ccc',
    height: 1,
    marginVertical: 8,
  },
  tagButton: {
    marginBottom: 16,
  },
  tagButtonsContainer: {
    flexDirection: 'column',
    marginTop: 10,
    width: 150,
    alightItems: 'center',
  },
  tagContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  tagManagementContainer: {
    backgroundColor: '#BAD4AA',
    borderRadius: 8,
    marginTop: 20,
    padding: 16,
    alignItems: 'center',
  },
  tagManagementHeader: {
    alignItems: 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    marginBottom: 8,
    paddingBottom: 8,
  },
  tagManagementHeaderText: {
    alignItems: 'center',
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
  },
  tagsBox: {
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  tagsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tagText: {
    fontSize: 16,
  },
totalUsers: {
  color: 'black',
  fontSize: 36,
  fontWeight: 'bold',
  marginBottom: 8,
  textAlign: 'center', // Center the text horizontally
  textShadowColor: '#000',
  textShadowOffset: { width: 1, height: 1 }, // Add shadow for a more appealing look
  textShadowRadius: 2,
},
  totalUsersContainer: {
    marginRight: 5,
    alignItems: 'center',
  },
  totalUsersLabel: {
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center', // Center the text horizontally
    textShadowColor: '#000',
  textShadowOffset: { width: 1, height: 1 }, // Add shadow for a more appealing look
  textShadowRadius: 2
  },
  welcomeText: {
    alignItems: 'center',
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
    analyticsDescription: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  mainContent: {
    backgroundColor: '#BAD4AA',
    borderRadius: 8,
    marginTop: 20,
    padding: 16,
    alignItems: 'center',
  },
  sectionTitle: {
  alignItems: 'center',
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
  },
   sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
    restaurantItem: {
    backgroundColor: "orange",
      width: 250,
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
  },
    restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
      color: "white",
  },
    navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#BAD4AA', // Set your desired background color
    paddingVertical: 10,
  },
  navItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Set your desired text color
  },
});



export default AdminHomepage;
