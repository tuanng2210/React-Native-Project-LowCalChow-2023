import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import logo from "../assets/icons8-carrot-94.png";
import { StarRatingDisplay } from 'react-native-star-svg-rating';
import TrendComponent from "./TrendComponent";
import { Svg, Rect, Text as SvgText } from "react-native-svg";

const BarChart = ({ data, title }) => {
  const chartWidth = 300;
  const chartHeight = 200;
  const barWidth = chartWidth / data.length;

  const maxDataValue = Math.max(...data.map((entry) => entry.value));

  const scale = chartHeight / maxDataValue;

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{title}</Text>
      <Svg width={chartWidth} height={chartHeight + 40}>
        {/* Y-axis scale */}
        {[1, 0.75, 0.5, 0.25, 0].map((tick, idx) => (
          <React.Fragment key={idx}>
            {/* Tick marks along the y-axis */}
            <Rect
              x={-5}
              y={chartHeight - chartHeight * tick}
              width={5}
              height={1}
              fill="#000"
            />
            {/* Labels for each tick along the y-axis */}
            <SvgText
              x={-20}
              y={chartHeight - chartHeight * tick}
              fontSize="10"
              fill="#000"
              textAnchor="end"
            >
              {maxDataValue * tick}
            </SvgText>
          </React.Fragment>
        ))}

        {data.map((entry, index) => (
          <React.Fragment key={entry.label}>
            <Rect
              x={index * barWidth}
              y={chartHeight - entry.value * scale}
              width={barWidth}
              height={entry.value * scale}
              fill="#3498db"
            />

            {/* Display the name of the bar below the bar */}
            <SvgText
              x={index * barWidth + barWidth / 2}
              y={chartHeight + 16}
              fontSize="12"
              fill="#000"
              textAnchor="middle"
            >
              {entry.name}
            </SvgText>

            {/* Conditionally display the value inside the bar if it's not zero */}
            {entry.value > 0 && (
              <SvgText
                x={index * barWidth + barWidth / 2}
                y={chartHeight - entry.value * scale + 16}
                fontSize="12"
                fill="black"
                textAnchor="middle"
              >
                {entry.value}
              </SvgText>
            )}
          </React.Fragment>
        ))}
      </Svg>
    </View>
  );
};

function RestMenuAnalytics() {
    const route = useRoute();
    const navigation = useNavigation();
    const access = route.params.access;
    const restaurantId = route.params.restaurantId;
    const  mealAnalyticID = route.params.menuItemId;
    //const access = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxODQ3MDkyLCJpYXQiOjE3MDE4Mzk4OTIsImp0aSI6ImY0NjQ0M2UyZWRhYTQ5MzVhOGFiMmFiMDY4Nzc3MWZmIiwidXNlcl9pZCI6M30.VUkOHta-jwcX76e_1mcR_WSCc36ez7k4-HSMlJhvhkk';
    //const restaurantId = 1;
    //const mealAnalyticID = 1;

    const [analyticData, setAnalyticData] = useState([]);
    const [trendData, setTrendData] = useState([]);
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
          setAllergyData(data.top_3_allergy);
          setIngredientData(data.top_3_ingredients);
          setRestrictionData(data.top_3_restrictions);
          setTasteData(data.top_3_taste);
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

    const handleGetTrends = async () => {
      try {
        /* TODO MODIFY LINK TO WORK LATER */
        const response = await fetch(`http://localhost:8000/trends/${restaurantId}/menuitems/${mealID}/`, {
          method: "GET",
  
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access,
          },
        });
        if (response.status === 200) {
          const newdata = await response.json();
          console.log(newdata);
          setTrendData(newdata);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } 
    useEffect(() => { 
        handleGetTrends();
    }, [mealID]);

    /*useEffect(() => {
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
    }, [analyticData]);*/

    /*Styling for chart */
    const chartConfig = {
      backgroundGradientFrom: "#00000",
      backgroundGradientFromOpacity: .9,
      backgroundGradientTo: "#3D3D3D",
      backgroundGradientToOpacity: 1,
     color: (opacity = 1) => `rgba(214, 112, 0, 100)`,
      strokeWidth: 1,
      barPercentage: 2,
      useShadowColorFromDataset: false,
      horizontalLabelRotation: 60,

      style: {
        padding: 5,
        flex: 1,
      }}
    
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
      <View style={styles.iconContainer}>
      <TouchableOpacity
          onPress={() => navigation.navigate("Restaurant Dashboard", {access, restaurantId} )}
          style={styles.navItem}
        >
          <Icon name="chevron-left" size={30} color="black" />
          
        </TouchableOpacity>
        </View>
        <View style={styles.title}>
        <Text style={styles.titleText}>Menu Item Analytics</Text>
        </View>
      </View> 
      <View style={styles.mainContent}>
      {analyticData.menuItem_id && ( // Check if menuItem_id exists
                <Text style={styles.AnalysisTitle}>{analyticData.menuItem_id.item_name}</Text>
            )}
      <ScrollView>

        <View style={styles.mainContent}> {/*Rating */}
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
        {/*{analyticData?.map((entry) => (
          <View key={entry.id} style={styles.entryContainer}>
            <Text style={styles.date}>
            Date: {new Date(entry.date_stamp).toLocaleDateString()}
            </Text>
            {renderChart(entry)}
          </View>
        ))}*/}

        {/*Top 3 Allergy Exclusions */}
        <View style={styles.middleBox}>
        <View style={styles.chartContainer}>
        {/*<Text style={styles.AnalysisSubText}>Top 3 Allergy Exclusions</Text>*/}
        {allergyData!=null && (
        <View style={styles.graphStyle}>

            <BarChart
              title="Top 3 Allergy exclusions"
              data={[
                {
                  label: `${allergyData.first != 'N/A' ? allergyData.first.title: "N/A"}`,
                  name:  `${allergyData.first != 'N/A' ? allergyData.first.title: "N/A"}`,
                  value: `${allergyData.first != 'N/A' ? allergyData.first.count: 0}`,
                },
                {
                  label: `${allergyData.second != 'N/A' ? allergyData.second.title: "N/A"}`,
                  name:  `${allergyData.second != 'N/A' ? allergyData.second.title: "N/A"}`,
                  value: `${allergyData.second != 'N/A' ? allergyData.second.count: 0}`,
                    
                },
                {
                  label: `${allergyData.third != 'N/A' ? allergyData.third.title : "N/A"}`,
                  name:  `${allergyData.third != 'N/A' ? allergyData.third.title : "N/A"}`,
                  value: `${allergyData.third != 'N/A' ? allergyData.third.count: 0}`,
                    
                },
              ]}
            />
        </View>
       )}
</View> 

        {/*Top 3 Ingredient Exclusions */}
        <View style={styles.chartContainer}>
        {/*<Text style={styles.AnalysisSubText}>Top 3 Ingredient Exclusions</Text>*/}
        {ingredientData!=null && (
        <View style={styles.graphStyle}>
       {/*} <BarChart
          data={ingredientData}
          width={500}
          height= {250}
          yAxisLabel=''
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          fromZero='true'
          showValuesOnTopOfBars='true'
          
        />*/}
            <BarChart
              title="Top 3 Ingredient Exclusions"
              data={[
                {
                  label: `${ingredientData.first != 'N/A' ? ingredientData.first.title: "N/A"}`,
                  name:  `${ingredientData.first != 'N/A' ? ingredientData.first.title : "N/A"}`,
                  value: `${ingredientData.first != 'N/A' ? ingredientData.first.count: 0}`,
                },
                {
                  label: `${ingredientData.second != 'N/A' ? ingredientData.second.title: "N/A"}`,
                  name:  `${ingredientData.second != 'N/A' ? ingredientData.second.title : "N/A"}`,
                  value: `${ingredientData.second != 'N/A' ? ingredientData.second.count: 0}`,
                    
                },
                {
                  label: `${ingredientData.third != 'N/A' ? ingredientData.third.title : "N/A"}`,
                  name:  `${ingredientData.third != 'N/A' ? ingredientData.third.title : "N/A"}`,
                  value: `${ingredientData.third != 'N/A' ? ingredientData.third.count: 0}`,
                    
                },
              ]}
            />
        </View>
        )}
        </View>
        </View>
        <View style={styles.middleBox}>

        {/*Top 3 Restriction Exclusions */}
        <View style={styles.chartContainer}>
        {/*<Text style={styles.AnalysisSubText}>Top 3 Restriction Exclusions</Text>*/}
        {restrictionData!=null && (
          <View style={styles.graphStyle}>
         {/*} <BarChart
            data={restrictionData}
            width={500}
            height= {250}
            yAxisLabel=''
            chartConfig={chartConfig}
            verticalLabelRotation={30}
            fromZero='true'
            showValuesOnTopOfBars='true'
            
        />*/}
            <BarChart
              title="Top 3 Restriction Exclusions"
              data={[
                {
                  label: `${restrictionData.first != 'N/A' ? restrictionData.first.title: "N/A"}`,
                  name:  `${restrictionData.first != 'N/A' ? restrictionData.first.title : "N/A"}`,
                  value: `${restrictionData.first != 'N/A' ? restrictionData.first.count: 0}`,
                },
                {
                  label: `${restrictionData.second != 'N/A' ? restrictionData.second.title: "N/A"}`,
                  name:  `${restrictionData.second != 'N/A' ? restrictionData.second.title : "N/A"}`,
                  value: `${restrictionData.second != 'N/A' ? restrictionData.second.count: 0}`,
                    
                },
                {
                  label: `${restrictionData.third != 'N/A' ? restrictionData.third.title : "N/A"}`,
                  name:  `${restrictionData.third != 'N/A' ? restrictionData.third.title : "N/A"}`,
                  value: `${restrictionData.third != 'N/A' ? restrictionData.third.count: 0}`,
                    
                },
              ]}
            />
          </View>
        )}
        </View>
        
        {/*Top 3 Taste Exclusions */}
        <View style={styles.chartContainer}>
        {/*<Text style={styles.AnalysisSubText}>Top 3 Taste Exclusions</Text>*/}
        {tasteData!=null && (
          <View style={styles.graphStyle}>
          {/*<BarChart
            data={tasteData}
            width={500}
            height= {250}
            yAxisLabel=''
            chartConfig={chartConfig}
            verticalLabelRotation={30}
            fromZero='true'
            showValuesOnTopOfBars='true'
        />*/}
            <BarChart
              title="Top 3 Taste Exclusions"
              data={[
                {
                  label: `${tasteData.first != 'N/A' ? tasteData.first.title: "N/A"}`,
                  name:  `${tasteData.first != 'N/A' ? tasteData.first.title: "N/A"}`,
                  value: `${tasteData.first != 'N/A' ? tasteData.first.count: 0}`,
                },
                {
                  label: `${tasteData.second != 'N/A' ? tasteData.second.title: "N/A"}`,
                  name:  `${tasteData.second != 'N/A' ? tasteData.second.title: "N/A"}`,
                  value: `${tasteData.second != 'N/A' ? tasteData.second.count: 0}`,
                    
                },
                {
                  label: `${tasteData.third != 'N/A' ? tasteData.third.title : "N/A"}`,
                  name:  `${tasteData.third != 'N/A' ? tasteData.third.title: "N/A"}`,
                  value: `${tasteData.third != 'N/A' ? tasteData.third.count: 0}`,
                    
                },
              ]}
            />
          </View>
          
          )}
          </View>
          </View>
        {/*Number of Add to History */}
       
       {/*Trends Here */}
       {/*{(trendData[2]) && (
        <View style={styles.trendStyle}>
        <Text style={styles.AnalysisSubText}>Menu Item Exclusion Trends</Text>
        <TrendComponent xCoefficients={[trendData[0]]}/>
        <Text style={styles.AnalysisSubText}>Added to Menu Item History Trends</Text>
        <TrendComponent xCoefficients={[trendData[1]]}/>
        <Text style={styles.AnalysisSubText}>Average Rating Trends</Text>
        <TrendComponent xCoefficients={[trendData[2]]}/>     
        </View>
       )}*/}
        {/*Date Range*/}
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
      </View>
      )
}


      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "#fff",
        },
        mainContent: {
          padding: 10,
          backgroundColor: "#fff",
          justifyContent: "top",
          alignItems: "center",
          alignContent: "center",
        },
        AnalysisTitle: {
          padding: 10,
          fontSize: 30,

        },
        middleBox: {
          flexDirection: "row",
          padding: 10,
          backgroundColor: "#fff",
          justifyContent: "top",
          alignItems: "center",
          alignContent: "center",
        },
        AnalysisSubText: {
          padding: 10,
          fontSize: 20,
        },
        chartContainer: {
          flexDirection: "column",
          alignItems: "center"

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
          backgroundColor: "#FFA500",
          padding: 10,
         alignItems: "center"
        },
        iconContainer: {
          backgroundColor: "#FFA500",
          padding: 10,
          justifyContent: "left",
        },
        title: {
          backgroundColor: "#FFA500",
          padding: 10,
          justifyContent: "center",
        },
        titleText: {
          color: "#000000",
          fontSize: 18,
          marginLeft: 300,
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
        chartTitle: {
          margin: 10,
          fontWeight: "bold"
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
        entryContainer: {
          marginBottom: 20,
          padding: 16,
          backgroundColor: "#ffffff",
          borderRadius: 8,
        },
        trendStyle:{
          maxWidth: '75%',
        },
      });
      export default RestMenuAnalytics;