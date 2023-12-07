import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { BarChart } from "react-native-chart-kit";

const AnalyticsDashboard = ({ route }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterOptions, setFilterOptions] = useState([]);
  const [filterOptionsLoading, setFilterOptionsLoading] = useState(true);

  useEffect(() => {
    fetchData(route.params.analyticsType, route.params.access);
    fetchFilterOptions(route.params.analyticsType, route.params.access);
  }, [route.params.analyticsType]);

  const fetchData = async (analyticsType, adminAccessToken) => {
    try {
      const response = await fetch(
        `http://localhost:8000/analytics/overall/${analyticsType}/`,
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
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

  const fetchFilterOptions = async (analyticsType, adminAccessToken) => {
    try {
      const response = await fetch(
        `http://localhost:8000/analytics/${analyticsType}/`,
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      setFilterOptions(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error("Filter Options Fetch Error:", error);
    } finally {
      setFilterOptionsLoading(false);
    }
  };

  const renderChart = (entry) => {
    const renderBarChart = (data, title) => {
      if (!data) {
        return (
          <View style={styles.barChartContainer}>
            <Text style={styles.chartTitle}>{`${title}: None`}</Text>
          </View>
        );
      }

      const labels = Object.values(data).map((item) => item.title);
      const values = Object.values(data).map((item) => item.count);

      const chartData = {
        labels,
        datasets: [
          {
            data: values,
          },
        ],
      };

      const chartConfig = {
        backgroundColor: "#f0f0f0",
        backgroundGradientFrom: "#f0f0f0",
        backgroundGradientTo: "#f0f0f0",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      };

      return (
        <View style={styles.barChartContainer}>
          <Text style={styles.chartTitle}>Top 3 {title}</Text>
          <BarChart
            data={chartData}
            width={300}
            height={200}
            yAxisLabel=""
            chartConfig={chartConfig}
          />
        </View>
      );
    };

    return (
      <View>
        {renderBarChart(entry.top_3_inclusions, "Inclusions")}
        {renderBarChart(entry.top_3_added, "Added")}
        {renderBarChart(entry.top_3_exclusions, "Exclusions")}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>
        Analytics Dashboard - {route.params.title}
      </Text>
      <View style={styles.pageContainer}>
        <View style={styles.chartContainer}>
          {data.map((entry) => (
            <View key={entry.id} style={styles.entryContainer}>
              {/* <Text style={styles.date}>
                Date: {new Date(entry.date_stamp).toLocaleDateString()}
              </Text> */}
              {renderChart(entry)}
            </View>
          ))}
        </View>
        <View style={styles.filterOptionsContainer}>
          <Text style={styles.filterOptionsTitle}>Filtering Options:</Text>
          {filterOptionsLoading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            filterOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => handleFilterOptionClick(option.title)}
                style={styles.button}
              >
                {option.calorie_level !== undefined ? (
                  <Text style={styles.buttonText}>{option.calorie_level}</Text>
                ) : (
                  <Text key={option.id} style={styles.buttonText}>
                    {option.tag_id.title}
                  </Text>
                )}
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffcccc",
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: "#ff0000",
  },
  pageContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    alignContent: "center",
    textAlign: "center",
  },
  entryContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  date: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
  chartContainer: {
    margin: 25,
  },
  filterOptionsContainer: {
    margin: 20,
  },
  filterOptionsTitle: {
    fontWeight: "bold",
  },
  barChartContainer: {
    margin: 10,
  },
  chartTitle: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },
});

export default AnalyticsDashboard;
