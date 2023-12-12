import React, { useState, useEffect } from "react";
import {
  View,
  Text,

  StyleSheet,
 TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { BarChart } from "react-native-chart-kit";


function AdminHomepage() {
  const route = useRoute();
  const navigation = useNavigation();
  const { access, adminId } = route.params;
  const [analyticsData, setAnalyticsData] = useState([]);
  const [averageRating, setAverageRating] = useState([]);
  const [totalNumberOfRatings, setTotalNumberOfRatings] = useState([]);


  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch('http://localhost:8000/analytics/overall/login/', {
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
  const fetchAppSatisfactionData = async () => {
      try {
        const response = await fetch('http://localhost:8000/analytics/satisfaction/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAverageRating(data);
        } else {
          console.error('API Error:', response.status);
          console.error(await response.text()); // Log the response content
        }
      } catch (error) {
        console.error('Network Error:', error);
      }
    };
    fetchAnalyticsData();
    fetchAppSatisfactionData();
  }, [access]);


 const total_logins = [
  { label: "Patrons Total Logins", value: analyticsData.patron_total_logins || 0 },
  { label: "Restaurant Total Logins", value: analyticsData.rest_total_logins || 0 }
];

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

      {/* App Satisfaction Setting */}
      <View style={styles.mainContent}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>User Feedback </Text>
             </View>
        <Text style={[styles.analyticsDescription, { textAlign: 'center' }]}>
        The User Feedback page offers comprehensive insights for administrators, showcasing app ratings, reviews, and detailed analytics on overall user logins. It provides a holistic view of user sentiments and engagement, amalgamating app performance with login analytics for informed decision-making. </Text>


         {averageRating.map((dataPoint) => (
              <View key={dataPoint.id}>
                 <Text style={styles.totalUsersLabel}>
             Average Rating: {dataPoint.average_rating} | Total Number of Ratings: {dataPoint.number_of_rating_total}
            </Text>
      </View>
         ))}


            <View style={styles.analyticsContainer}>
              <Text style={styles.baranalyticsHeader}>Login Analytics</Text>
               <View style={styles.chartBackground}>
              <BarChart
                style={styles.barChart}
                data={{
                  labels: total_logins.map(item => item.label),
                  datasets: [
                    {
                      data: total_logins.map(item => item.value),

                    },
                  ],
                }}
                width={350}
                height={200}
                yAxisLabel=""
                fromZero={true}
      chartConfig={{
        backgroundGradientFrom: "#392F5A",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        barPercentage: 2.0,
        propsForBackgroundLines: {
          strokeWidth: 0,
        },
        propsForLabels: {
          fontSize: 14,
        },
        barRadius: 5,
        propsForVerticalLabels: {
          fontSize: 14,
        },
        propsForHorizontalLabels: {
          fontSize: 14,
        },
      }}
      bezier
              />
               </View>
                                         <Text style={styles.totalUsersLabel}>
    Patron Logins Since: {analyticsData?.patron_logins_since || 0}
  </Text>
  <Text style={styles.totalUsersLabel}>
    Restaurant Logins Since: {analyticsData?.rest_logins_since || 0}
  </Text>
            </View>
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
  fontSize: 24,
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
    fontSize: 18,
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
    backgroundColor: 'orange',
    borderRadius: 8,
    marginTop: 20,
    padding: 16,
    alignItems: 'center',
  },
  sectionTitle: {
  alignItems: 'center',
    color: 'white',
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
  chartBackground: {
    backgroundColor: "#BAD4AA", // Add your desired background color here
    borderRadius: 8,
    padding: 10,
  },
});



export default AdminHomepage;
