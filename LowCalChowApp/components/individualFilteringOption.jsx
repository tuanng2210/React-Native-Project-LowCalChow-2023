import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
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
          </React.Fragment>
        ))}
      </Svg>
    </View>
  );
};

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

  return (
    <View style={styles.container}>
      {data && (
        <>
          {/* Add a container with gray background */}
          <View style={styles.chartWrapper}>
            <BarChart
              title="Number of Tags"
              data={[
                {
                  label: "Number of Patron Profiles",
                  name: "Num of Tag in Profiles",
                  value:
                    analyticsType === "calories"
                      ? data.number_of_profiles || 0
                      : data.number_of_patronProfile || 0,
                },
                {
                  label: "Number of Menu Items",
                  name: "Num of Tag in Menu Items",
                  value:
                    analyticsType === "calories"
                      ? data.number_of_menuItems || 0
                      : data.number_of_menuItem || 0,
                },
              ]}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  chartContainer: {
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  chartWrapper: {
    backgroundColor: "#E0E0E0", // Set the background color to gray
    borderRadius: 8,
    padding: 16,
  },
});

export default FilteredDataScreen;
