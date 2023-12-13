import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import MenuAnalyticsComponent from "./menuAnalComponent";
import { useIsFocused } from "@react-navigation/native";

function RestaurantDashboard() {
  const isFocused = useIsFocused();
  const [menuItems, setMenuItems] = useState([]);
  const [data, setData] = useState({});
  const [alItems, setAlItems] = useState([]);
  const ScreenName = "Restaurant Menu Analytics";
  const route = useRoute();
  const { access, restaurantId } = route.params;
  const currentRoute = useRoute().name;

  const navigation = useNavigation();
  const [restaurantData, setRestaurantData] = useState(null);

  const handlegetMenuItems = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/analytics/${restaurantId}/menuitems/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        setMenuItems(data);
        console.log(menuItems);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handlegetRestAnalytics = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/analytics/${restaurantId}/overall/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        setData(data[0]);
        console.log(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (isFocused) {
      handlegetMenuItems();
      handlegetRestAnalytics();
    }
  }, [isFocused]);
  console.log(menuItems);

  /*useEffect (() => {
    setMenuItems(alItems.map(item => item.menuItem_id));
  }, [alItems]); */

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

  if (!restaurantData) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Restaurant Dashboard", {
              access,
              restaurantId,
            })
          }
          style={[
            styles.navItem,
            currentRoute === "Restaurant Dashboard" && styles.activeNavItem,
          ]}
        >
          <Icon
            name="home"
            size={30}
            color={currentRoute === "Restaurant Dashboard" ? "white" : "black"}
          />
          <Text
            style={[
              styles.navText,
              currentRoute === "Restaurant Dashboard" && styles.activeNavText,
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Menu", { access, restaurantId })}
          style={[
            styles.navItem,
            currentRoute === "Menu" && styles.activeNavItem,
          ]}
        >
          <Icon
            name="restaurant-menu"
            size={30}
            color={currentRoute === "Menu" ? "white" : "black"}
          />
          <Text
            style={[
              styles.navText,
              currentRoute === "Menu" && styles.activeNavText,
            ]}
          >
            Menu
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Settings", { access, restaurantId })
          }
          style={[
            styles.navItem,
            currentRoute === "Settings" && styles.activeNavItem,
          ]}
        >
          <Icon
            name="settings"
            size={30}
            color={currentRoute === "Settings" ? "white" : "black"}
          />
          <Text
            style={[
              styles.navText,
              currentRoute === "Settings" && styles.activeNavText,
            ]}
          >
            Settings
          </Text>
        </TouchableOpacity>
      </View>
      {/* Render other restaurant dashboard content */}

      <ScrollView>
        <View style={styles.mainContent}>
          <View style={styles.twoPane}>
            <View style={styles.titlePane}>
              <Text style={styles.boxLabel}>
                Top Tags Leading To Menu Item Exclusions
              </Text>
              <View style={styles.analytics}>
                <Text style={styles.label}>
                  {/* Taste Tags:{" "}{" "} */}
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>Taste Tags:</Text>{" "}
                  {data.taste_tags_most_eliminations
                    ? data.taste_tags_most_eliminations.tag
                    : "N/A"}{" "}
                  (
                  {data.taste_tags_most_eliminations
                    ? data.taste_tags_most_eliminations.eliminations
                    : 0}{" "}
                  Exclusions)
                </Text>
                {/* <Text style={styles.label}> </Text> */}
                {/* <Text style={styles.label}>
                  Restriction Tags: */}
                <Text style={styles.label}>
                  {/* Restriction Tags:{" "} */}
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    Restriction Tags:
                  </Text>{" "}
                  {data.restriction_tags_most_eliminations
                    ? data.restriction_tags_most_eliminations.tag
                    : "N/A"}{" "}
                  (
                  {data.restriction_tags_most_eliminations
                    ? data.restriction_tags_most_eliminations.eliminations
                    : 0}{" "}
                  Exclusions)
                </Text>
                {/* </Text> */}

                {/* <Text style={styles.label}> </Text> */}
                <Text style={styles.label}>
                  {/* Ingredient Tags:{" "} */}
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    Ingredient Tags:
                  </Text>{" "}
                  {data.ingredient_tags_most_eliminations
                    ? data.ingredient_tags_most_eliminations.tag
                    : "N/A"}{" "}
                  (
                  {data.ingredient_tags_most_eliminations
                    ? data.ingredient_tags_most_eliminations.eliminations
                    : 0}{" "}
                  Exclusions)
                </Text>
                {/* <Text style={styles.label}> </Text> */}
                <Text style={styles.label}>
                  {/* Allergy Tags:{" "} */}
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>Allergy Tags:</Text>{" "}
                  {data.allergies_tags_most_eliminations
                    ? data.allergies_tags_most_eliminations.tag
                    : "N/A"}{" "}
                  (
                  {data.allergies_tags_most_eliminations
                    ? data.allergies_tags_most_eliminations.eliminations
                    : 0}{" "}
                  Exclusions)
                </Text>
              </View>
              <Text style={styles.boxLabel2}>Top Menu Items</Text>
              {/* <Text style={styles.label}> </Text> */}
              <View style={styles.analytics}>
                <Text style={styles.label}>
                  {/* First:{" "} */}
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>First:</Text>{" "}
                  {data.top_three_items ? data.top_three_items.first.title : 0}
                </Text>
                {/* <Text style={styles.label}> </Text> */}
                <Text style={styles.label}>
                  {/* Second:{" "} */}
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>Second:</Text>{" "}
                  {data.top_three_items ? data.top_three_items.second.title : 0}
                </Text>
                {/* <Text style={styles.label}> </Text> */}
                <Text style={styles.label}>
                  {/* Third:{" "} */}
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>Third:</Text>{" "}
                  {data.top_three_items ? data.top_three_items.third.title : 0}
                </Text>
                {/* <Text style={styles.label}> </Text> */}
              </View>
            </View>
            <View style={styles.titlePane}>
              <Text style={styles.menuItemsLabel}>Menu Items</Text>
              {/* <Text style={styles.label}> </Text> */}
              {menuItems.length > 0 && (
                <MenuAnalyticsComponent
                  menuItems={menuItems}
                  accessToken={access}
                  restIDToken={restaurantId}
                  screenName={ScreenName}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignContent: "center",
  },
  navBar: {
    flexDirection: "row",
    backgroundColor: "#FFA500",
    padding: 10,
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  navText: {
    marginLeft: 8,
    fontSize: 18,
    color: "black",
  },
  activeNavText: {
    color: "white",
  },
  twoPane: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  analytics: {
    // backgroundColor: "rgba(255, 165, 0, 0.5)",
    backgroundColor:"#E0E0E0",
    borderRadius: 8,
    padding: 20,
    marginRight: 100,
    marginBottom: 20,
  },
  titlePane: {
    flexDirection: "column",
  },
  label: {
    fontSize: 16,
    margin: 5,
  },
  boxLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 20
  },
  boxLabel2: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 120,
    marginTop: 15
  },
  menuItemsLabel: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10
  },
  mainContent: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "top",
    alignItems: "center",
    alignContent: "center",
  },
});

export default RestaurantDashboard;
