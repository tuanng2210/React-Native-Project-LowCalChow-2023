import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ImageBackground
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { PieChart } from "react-native-svg-charts";
import { BarChart } from "react-native-chart-kit";


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

    fetchAnalyticsData();
  }, [access]);
 // Extracting age demographic data
  const ageDemographics = analyticsData.length > 0 ? analyticsData[0] : {};

  const ageData = [
    { label: "18-24", value: ageDemographics.users_18_24 || 0 },
    { label: "25-34", value: ageDemographics.users_25_34 || 0 },
    { label: "35-44", value: ageDemographics.users_35_44 || 0 },
    { label: "45-54", value: ageDemographics.users_45_54 || 0 },
    { label: "55-64", value: ageDemographics.users_55_64 || 0 },
    { label: "65+", value: ageDemographics.users_65_and_up || 0 },
  ];

    return (
     <View style={styles.container}>
      {/* Header in an orange box */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Admin Homepage</Text>
        <Text style={styles.welcomeText}>Welcome Admin!</Text>
        <Text style={styles.descriptionText}>
          This dashboard provides insights into user analytics and tag management.
          Explore different tag categories or view analytics on user demographics
          and restaurant statistics.
        </Text>
      </View>


      {/* FAQ Container */}
      <View style={styles.faqContainer}>
        <Text style={styles.faqHeader}>FAQ</Text>
        <View style={styles.faqContent}>
          {/* Add FAQ content here */}
          <Text style={styles.faqText}>Frequently Asked Questions...</Text>
          {/* Add an Orange Button here */}
          <Button
            title="FAQ"
            onPress={() => navigation.navigate("Admin FAQ Page")}
            color="orange"
          />
        </View>
      </View>

      {/* New Container for Tag Management */}
      <View style={styles.tagManagementContainer}>
        {/* Header for Tag Management */}
        <View style={styles.tagManagementHeader}>
          <Text style={styles.tagManagementHeaderText}>Tag Management</Text>
        </View>

        {/* Buttons for different tag categories */}
        <View style={styles.tagButtonsContainer}>
          <Button
            title="Rest Tags"
            onPress={() => navigation.navigate("Admin RestTags", { access })}
            color="orange"
            style={styles.tagButton}
          />
          {/* Add other buttons similarly */}
          <Button
            title="Food Type Tags"
            onPress={() => navigation.navigate("Admin Food Type Tags", { access })}
            color="orange"
          />
          {/* ... Add other buttons for different tag categories */}
        </View>
      </View>
      {/* Display Analytics Data */}
      <View style={styles.analyticsContainer}>
        <ImageBackground
          source={require('../assets/SuperOrange_HoneyComb_Background.png')}
          style={styles.analyticsBackgroundImage}>
          <View style={styles.analyticsContent}>
            <Text style={styles.analyticsHeader}>Analytics</Text>
            {/* Render the analytics data here */}
            {analyticsData.map((dataPoint) => (
              <View key={dataPoint.id}>
                {/* Fix the placement of styles.analyticsDataContainer here */}
                <Text style={styles.totalUsersLabel}>Total Users</Text>
                <Text style={styles.totalUsers}>{dataPoint.total_users}</Text>

                {/* Render Pie Chart */}
                <View style={styles.pieChartContainer}>
                  <PieChart
                    style={styles.pieChart}
                    data={[
                      {
                        key: 1,
                        value: dataPoint.total_patrons,
                        svg: { fill: "#FFF8F0" },
                      },
                      {
                        key: 2,
                        value: dataPoint.total_restaurants,
                        svg: { fill: "#9DD9D2" },
                      },
                    ]}
                    innerRadius="0%"
                    outerRadius="80%"
                  />
                  <View style={styles.pieChartLabels}>
                    <Text style={styles.chartLabel}>
                      Total Patrons:{" "}
                      <Text style={styles.chartLabelBold}>{dataPoint.total_patrons}</Text>
                    </Text>
                    <Text style={styles.chartLabel}>
                      Total Restaurants:{" "}
                      <Text style={styles.chartLabelBold}>{dataPoint.total_restaurants}</Text>
                    </Text>
                  </View>
                </View>

            {/* Display Counts for Males, Females, and Others */}
            <Text style={styles.totalUsersLabel}>
             Total Males: {dataPoint.total_males} | Total Females: {dataPoint.total_females} | Total Others: {dataPoint.total_other}
            </Text>

                 {/* Display Total Number of MenuItems */}
            <Text style={styles.totalUsersLabel}>Total Number of Menu Items: {dataPoint.total_menu_items}</Text>

              </View>

            ))}
              {/* Display User Age Demographics Bar Chart */}
            <View style={styles.analyticsContainer}>
              <Text style={styles.baranalyticsHeader}>User Age Demographics</Text>
              <BarChart
                style={styles.barChart}
                data={{
                  labels: ageData.map(item => item.label),
                  datasets: [
                    {
                      data: ageData.map(item => item.value),
                    },
                  ],
                }}
                width={350}
                height={200}
                yAxisLabel=""
                fromZero={true}
                chartConfig={{
                  backgroundColor: "#black",
                  backgroundGradientFrom: "#392F5A",
                  backgroundGradientTo: "#ffa726",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
              />

              </View>
            </View>
                </ImageBackground>
              </View>
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
    backgroundColor: '#ddd',
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
});



export default AdminHomepage;
