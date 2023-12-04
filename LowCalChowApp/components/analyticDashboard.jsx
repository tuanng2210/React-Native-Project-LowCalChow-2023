import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { BarChart } from "react-native-chart-kit";

const AnalyticsDashboard = ({ route }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(route.params.analyticsType, route.params.access);
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
          <Text style={styles.chartTitle}>{title}</Text>
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
    <View style={styles.container}>
      <Text style={styles.header}>
        Analytics Dashboard - {route.params.title}
      </Text>
      {data.map((entry) => (
        <View key={entry.id} style={styles.entryContainer}>
          <Text style={styles.date}>
            Date: {new Date(entry.date_stamp).toLocaleDateString()}
          </Text>
          {renderChart(entry)}
        </View>
      ))}
    </View>
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
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
});

export default AnalyticsDashboard;
