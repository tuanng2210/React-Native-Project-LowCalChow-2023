import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BarChart} from 'react-native-chart-kit';
import StarRating from 'react-native-star-svg-rating';
import logo from "../assets/icons8-carrot-94.png";
import { StarRatingDisplay } from 'react-native-star-svg-rating';

function RestMenuAnalytics() {
    const route = useRoute();
    const navigation = useNavigation();
    //const { access, restaurantId, mealAnalyticID } = route.params;
    const access = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxODQ3MDkyLCJpYXQiOjE3MDE4Mzk4OTIsImp0aSI6ImY0NjQ0M2UyZWRhYTQ5MzVhOGFiMmFiMDY4Nzc3MWZmIiwidXNlcl9pZCI6M30.VUkOHta-jwcX76e_1mcR_WSCc36ez7k4-HSMlJhvhkk';
    const restaurantId = 1;
    const mealAnalyticID = 1;

    const [analyticData, setAnalyticData] = useState([]);
    const [adSet, setAdSet] = useState(false);

    const [dateStamp, setDateStamp] = useState('');
    const [dateStampThree, setDateStampThree] = useState('');

    const [allergyData, setAllergyData] = useState(null);
    const [ingredientData, setIngredientData] = useState(null);
    const [restrictionData, setRestrictionData] = useState(null);
    const [tasteData, setTasteData] = useState(null);
    const [mealID, setMealID] = useState('');
    const [feedbackData, setFeedbackData] = useState([]);

    const handleGetMeal = async () => {
      try {
        const response = await fetch(`http://localhost:8000/analytics/${restaurantId}/menuitems/${mealAnalyticID}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access,
          },
        });
  
        if (response.status === 200) {
          const data = await response.json();
          setAnalyticData(data);
          setAdSet(true);
          setMealID(data.menuItem_id.id);
          const dateObject = new Date(data.date_stamp);
          setDateStamp(dateObject.toLocaleString());
          const dateObject2 = new Date(data.date_stamp);
          dateObject2.setDate(dateObject2.getDate()-3);
          setDateStampThree(dateObject2.toLocaleString());
  
        }else if (response.status ===403){
          const data = await response.json();
          console.log(data);
        }
      } catch (error) {
        console.error("Error:", error);
        
      }
    }
    useEffect(() => {
      handleGetMeal();
    }, []);

    const handleGetFeedback = async () => {
      try {
        /* TODO MODIFY LINK TO WORK LATER */
        const response = await fetch(`http://localhost:8000/feedback/menuitems/${mealID}/`, {
          method: "GET",
  
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access,
          },
        });
        if (response.status === 200) {
          const newdata = await response.json();
          setFeedbackData(newdata);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }  
    useEffect(() => {
      handleGetFeedback();
    }, [mealID]);

    useEffect(() => {
      if (adSet==true){
      console.log(analyticData);

      setAllergyData({
        labels: [`${analyticData.top_3_allergy.first !== "N/A" ? analyticData.top_3_allergy.first.title : "N/A"}`,
        `${analyticData.top_3_allergy.second !== "N/A" ? analyticData.top_3_allergy.second.title : "N/A"}`,
        `${analyticData.top_3_allergy.third !== "N/A" ? analyticData.top_3_allergy.third.title : "N/A"}`],
        datasets: [
          {
          data: [`${analyticData.top_3_allergy.first !== "N/A" ? analyticData.top_3_allergy.first.count : 0}`,
          `${analyticData.top_3_allergy.second !== "N/A" ? analyticData.top_3_allergy.second.count : 0}`,
          `${analyticData.top_3_allergy.third !== "N/A" ? analyticData.top_3_allergy.third.count : 0}`]
          }
        ]
      });
      setIngredientData({
        labels: [`${analyticData.top_3_ingredients.first !== "N/A" ? analyticData.top_3_ingredients.first.title : "N/A"}`,
        `${analyticData.top_3_ingredients.second !== "N/A" ? analyticData.top_3_ingredients.second.title : "N/A"}`,
        `${analyticData.top_3_ingredients.third !== "N/A" ? analyticData.top_3_ingredients.third.title : "N/A"}`],
        datasets: [
          {
          data: [`${analyticData.top_3_ingredients.first !== "N/A" ? analyticData.top_3_ingredients.first.count : 0}`,
          `${analyticData.top_3_ingredients.second !== "N/A" ? analyticData.top_3_ingredients.second.count : 0}`,
          `${analyticData.top_3_ingredients.third !== "N/A" ? analyticData.top_3_ingredients.third.count : 0}`]
          }
        ]
      });
      setRestrictionData({
        labels: [`${analyticData.top_3_restrictions.first !== "N/A" ? analyticData.top_3_restrictions.first.title : "N/A"}`,
        `${analyticData.top_3_restrictions.second !== "N/A" ? analyticData.top_3_restrictions.second.title : "N/A"}`,
        `${analyticData.top_3_restrictions.third !== "N/A" ? analyticData.top_3_restrictions.third.title : "N/A"}`],
        datasets: [
          {
          data: [`${analyticData.top_3_restrictions.first !== "N/A" ? analyticData.top_3_restrictions.first.count : 0}`,
          `${analyticData.top_3_restrictions.second !== "N/A" ? analyticData.top_3_restrictions.second.count : 0}`,
          `${analyticData.top_3_restrictions.third !== "N/A" ? analyticData.top_3_restrictions.third.count : 0}`]
          }
        ]
      });
      setTasteData({
        labels: [`${analyticData.top_3_taste.first !== "N/A" ? analyticData.top_3_taste.first.title : "N/A"}`,
        `${analyticData.top_3_taste.second !== "N/A" ? analyticData.top_3_taste.second.title : "N/A"}`,
        `${analyticData.top_3_taste.third !== "N/A" ? analyticData.top_3_taste.third.title : "N/A"}`],
        datasets: [
          {
          data: [`${analyticData.top_3_taste.first !== "N/A" ? analyticData.top_3_taste.first.count : 0}`,
          `${analyticData.top_3_taste.second !== "N/A" ? analyticData.top_3_taste.second.count : 0}`,
          `${analyticData.top_3_taste.third !== "N/A" ? analyticData.top_3_taste.third.count : 0}`]
          }
        ]
      });


    }
    }, [analyticData]);
    /*Styling for chart */
    const chartConfig = {
      backgroundGradientFrom: "#00000",
      backgroundGradientFromOpacity: .9,
      backgroundGradientTo: "#3D3D3D",
      backgroundGradientToOpacity: 1,
     color: (opacity = 1) => `rgba(214, 112, 0, 100)`,
      strokeWidth: 4,
      barPercentage: 2,
      useShadowColorFromDataset: false,
      style: {
        padding: 5,
        flex: 1,
      }
      
    }
    const renderFeedbackItem = ({ item }) => (
      <View style={styles.feedbackItem}>
        <StarRatingDisplay
                      rating={item.rating}
                      maxStars={5}
                      starSize={20}
                      color="#5CCD28"
                      borderColor="#000000"
                      enableSwiping='false'
  
                    />
        <Text style={styles.feedbackText}>{item.review}</Text>
      </View>
    );

return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>  
      <TouchableOpacity
          onPress={() => navigation.navigate("Restaurant Dashboard", {access, restaurantId} )}
          style={styles.navItem}
        >
          <Icon name="chevron-left" size={30} color="black" />
          
        </TouchableOpacity>
        <Text style={styles.titleText}>Menu Item Analytics</Text>
      </View> 
      {analyticData.menuItem_id && ( // Check if menuItem_id exists
                <Text style={styles.AnalysisTitle}>{analyticData.menuItem_id.item_name}</Text>
            )}
      <ScrollView>

        <View style={styles.middleBox}> {/*Rating */}
          <Text style={styles.AnalysisTitle}>Average Rating: {analyticData.average_rating}</Text>

          <StarRatingDisplay
            rating={analyticData.average_rating}
            maxStars={5}
            starSize={48}
            color="#5CCD28"
            borderColor="#000000"
            enableSwiping='false'
          />
        
          <Text style={styles.AnalysisSubText}>Based on {analyticData.number_of_ratings} ratings</Text>
        </View>
        {/*Search Exclusions */}
        {/*Top 3 Allergy Exclusions */}
        <Text style={styles.AnalysisSubText}>Top 3 Allergy Exclusions</Text>
        {allergyData!=null && (
        <View style={styles.graphStyle}>
        <BarChart
          data={allergyData}
          width={500}
          height= {250}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          fromZero='true'
          showValuesOnTopOfBars='true'
          
        />
        </View>
       )}

        {/*Top 3 Ingredient Exclusions */}
        <Text style={styles.AnalysisSubText}>Top 3 Ingredient Exclusions</Text>
        {ingredientData!=null && (
        <View style={styles.graphStyle}>
        <BarChart
          data={ingredientData}
          width={500}
          height= {250}
          yAxisLabel=''
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          fromZero='true'
          showValuesOnTopOfBars='true'
          
        />
        </View>
        )}
        {/*Top 3 Restriction Exclusions */}
        <Text style={styles.AnalysisSubText}>Top 3 Restriction Exclusions</Text>
        {restrictionData!=null && (
          <View style={styles.graphStyle}>
          <BarChart
            data={restrictionData}
            width={500}
            height= {250}
            yAxisLabel=''
            chartConfig={chartConfig}
            verticalLabelRotation={30}
            fromZero='true'
            showValuesOnTopOfBars='true'
            
          />
          </View>
        )}
        {/*Top 3 Taste Exclusions */}
        <Text style={styles.AnalysisSubText}>Top 3 Taste Exclusions</Text>
        {tasteData!=null && (
          <View style={styles.graphStyle}>
          <BarChart
            data={tasteData}
            width={500}
            height= {250}
            yAxisLabel=''
            chartConfig={chartConfig}
            verticalLabelRotation={30}
            fromZero='true'
            showValuesOnTopOfBars='true'
          />
          </View>
          )}
        {/*Number of Add to History */}
       
        {/*Date Range MAYBE*/}
        {dateStampThree!='' && ( <Text style={styles.AnalysisSubText}>Analytics TimeStamp: {dateStampThree} to {dateStamp}</Text> )}
        <FlatList
              data={feedbackData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderFeedbackItem}
              horizontal
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={styles.feedbackList}
            />
      </ScrollView>
      </View>
      )
}


      const styles = StyleSheet.create({
        container: {
          flex: 1,
        },
        mainContent: {
          padding: 20,
          backgroundColor: "#fff",
          justifyContent: "top",
          alignItems: "center",
          alignContent: "center",
        },
        AnalysisTitle: {
          padding: 10,
          fontSize: 30,
        },
        AnalysisSubText: {
          padding: 10,
          fontSize: 12,
        },
      
        button: {
          backgroundColor: "#FFA500",
          borderRadius: 8,
          paddingVertical: 10,
          alignItems: "center",
          marginTop: 16,
          marginBottom: 12,
          width: "10%",
        },
        buttonText: {
          color: "#000000",
          fontWeight: 'bold',
          fontSize: 16,
        },
        titleContainer: {
            
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "left",
          backgroundColor: "#FFA500",
          padding: 10,
        },
        titleText: {
          color: "#000000",
          fontSize: 18,
          marginLeft: 10,
        },
        graphStyle: {
          padding: 30,
        },
        feedbackList: {
          flex: 1,
          marginTop: 20,
          width: '80%',
          marginBottom: 20,
        },
        feedbackItem: {
          backgroundColor: '#EFEFEF',
          borderRadius: 10,
          padding: 10,
          marginRight: 10,
          width: 175, 
        },
        feedbackText: {
          fontSize: 14,
          marginBottom: 5,
        },
        feedbackRating: {
          fontSize: 12,
          color: '#888888',
        },
      });
      export default RestMenuAnalytics;