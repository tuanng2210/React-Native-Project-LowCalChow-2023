import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

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
        <View>
          {analyticsType === "calories" ? (
            <>
              <Text style={styles.dataText}>
                Number of Patron Profiles: {data.number_of_profiles || 0}
              </Text>
              <Text style={styles.dataText}>
                Number of Menu Items: {data.number_of_menuItems || 0}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.dataText}>
                Number of Patron Profiles: {data.number_of_patronProfile || 0}
              </Text>
              <Text style={styles.dataText}>
                Number of Menu Items: {data.number_of_menuItem || 0}
              </Text>
            </>
          )}
        </View>
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
  screenTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  dataText: {
    fontSize: 14,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});

export default FilteredDataScreen;
