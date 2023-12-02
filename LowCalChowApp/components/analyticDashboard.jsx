import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const AnalyticsDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const adminAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxNTU3Njc4LCJpYXQiOjE3MDE1NTA0NzgsImp0aSI6IjIwZmZkODZiOTRhYjQ4MDBhOTEzMjhiM2RlZTljYTBmIiwidXNlcl9pZCI6OX0.E1l_WHR7QkwGCWWEhWrs81RKiKQ4BdGfTueOI1jln3g";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/analytics/overall/calories/",
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
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderChart = (entry) => {
    const renderBarChart = (data, title) => {};

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
      <Text style={styles.header}>Analytics Dashboard</Text>
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
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 8,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default AnalyticsDashboard;
