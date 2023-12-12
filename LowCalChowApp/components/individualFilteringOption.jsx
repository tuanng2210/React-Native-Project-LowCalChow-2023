// import React, { useState, useEffect } from "react";
// import { View, Text, ActivityIndicator } from "react-native";

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
//       <View>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View>
//         <Text>Error: {error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View>
//       <Text>Filtered Data Screen</Text>
//       {/* Display your filtered data here using the 'data' state */}
//       {/* Example: */}
//       {data && (
//         <View>
//           <Text>Data from API:</Text>
//           <Text>{JSON.stringify(data)}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default FilteredDataScreen;

import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { BarChart } from "react-native-chart-kit";

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
        console.log(jsonData);
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
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const chartData = {
    labels: ["Number of Patron Profiles", "Number of Menu Items"],
    datasets: [
      {
        data: [data.number_of_patronProfile || 0, data.number_of_menuItem || 0],
      },
    ],
  };

  

  return (
    <View>
      <Text>Filtered Data Screen</Text>
      {/* Display your filtered data here using the 'data' state */}
      {/* Example: */}
      {data && (
        <View>
          <Text>Data from API:</Text>
          <Text>{JSON.stringify(data)}</Text>

          {/* Display Bar Chart */}
          <BarChart
            data={chartData}
            width={300}
            height={200}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            style={{ marginVertical: 8, borderRadius: 16 }}
          />
        </View>
      )}
    </View>
  );
};

export default FilteredDataScreen;
