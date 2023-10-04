// import React, { useEffect, useState } from "react";
// import { View, Text } from "react-native";
// import { useRoute } from "@react-navigation/native";

// function RestaurantDashboard() {
//   const route = useRoute();
//   const { restaurantId, access } = route.params;
//   const [restaurantData, setRestaurantData] = useState(null);
// //   const { access } = route.params;

//   useEffect(() => {
//     // Fetch restaurant data based on restaurantId
//     const fetchRestaurantData = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8000/restaurants/${restaurantId}/`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${access}`,
//             },
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           setRestaurantData(data); // Update restaurantData state with fetched data
//         } else {
//           // Handle error
//         }
//       } catch (error) {
//         // Handle error
//       }
//     };

//     fetchRestaurantData();
//   }, [restaurantId]);

//   if (!restaurantData) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <View>
//       <Text>Restaurant Dashboard for {restaurantData.name}</Text>
//       {/* Render restaurant dashboard content */}
//     </View>
//   );
// }

// export default RestaurantDashboard;
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

function RestaurantDashboard() {
  const route = useRoute();
  const navigation = useNavigation();
  const { restaurantId } = route.params;
  const [restaurantData, setRestaurantData] = useState(null);
  const { access } = route.params;

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/restaurants/${restaurantId}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setRestaurantData(data);
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchRestaurantData();
  }, [restaurantId]);

  const handleMenuPress = () => {
    // Navigate to MenuItems screen and pass access token and restaurant ID as params
    navigation.navigate("Menu", {
      access: access,
      restaurantId: restaurantId,
    });
  };

  if (!restaurantData) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Restaurant Dashboard for {restaurantData.name}</Text>
      <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
        <Text style={styles.buttonText}>Menu Items</Text>
      </TouchableOpacity>
      {/* Render other restaurant dashboard content */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  menuButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default RestaurantDashboard;
