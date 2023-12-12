// import React, { useState, useEffect } from "react";
// import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
// import { BarChart } from "react-native-chart-kit";

// const FilteredDataScreen = ({ route }) => {
//   const { analyticsType, filterOptionId, accessToken } = route.params;
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8000/analytics/${analyticsType}/${filterOptionId}/`,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const jsonData = await response.json();
//         setData(jsonData);
//         console.log(jsonData);
//       } catch (error) {
//         console.error("Fetch Error:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [analyticsType, filterOptionId, accessToken]);

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Error: {error}</Text>
//       </View>
//     );
//   }

//   const chartData = {
//     labels: ["Patron Profile", "Menu Item"],
//     datasets: [
//       {
//         data: [data.number_of_patronProfile, data.number_of_menuItem],
//       },
//     ],
//   };

//   const chartConfig = {
//     backgroundColor: "black",
//     backgroundGradientFrom: "#392F5A",
//     backgroundGradientTo: "#ffa726",
//     decimalPlaces: 0,
//     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//     barPercentage: 0.75,
//   };

//   console.log("ChartData:", chartData);

//   return (
//     <View style={styles.container}>
//       {data && (
//         <View style={styles.chartContainer}>
//           <Text style={styles.chartTitle}>
//             Number of Patron vs Num of Menu Items Containing the Tag
//           </Text>
//           <BarChart
//             data={chartData}
//             width={300}
//             height={200}
//             yAxisLabel="#"
//             fromZero={true}
//             chartConfig={chartConfig}
//           />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   screenTitle: {
//     fontSize: 20,
//     color: "#FFFFFF",
//     marginBottom: 10,
//   },
//   chartContainer: {
//     alignItems: "center",
//   },
//   chartTitle: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   errorText: {
//     fontSize: 16,
//     color: "#FF0000",
//   },
// });

// export default FilteredDataScreen;
import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";

const FilteredDataScreen = ({ route }) => {
  const { analyticsType, filterOptionId, accessToken } = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/analytics/${analyticsType}/${filterOptionId}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [analyticsType, filterOptionId, accessToken]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const chartData = [
    { category: "Patron Profile", value: data.number_of_patronProfile },
    { category: "Menu Item", value: data.number_of_menuItem },
  ];

  return (
    <View style={styles.container}>
      {data && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>
            Number of Patron vs Num of Menu Items Containing the Tag
          </Text>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryAxis />
            <VictoryAxis dependentAxis />
            <VictoryBar
              data={chartData}
              x="category"
              y="value"
              barRatio={0.8}
              style={{ data: { fill: "#4CAF50" } }} 
            />
          </VictoryChart>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  chartContainer: {
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: "#FF0000",
  },
});

export default FilteredDataScreen;
