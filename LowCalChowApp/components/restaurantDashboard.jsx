import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import MenuAnalyticsComponent from "./menuAnalComponent";
import {useIsFocused} from '@react-navigation/native';

function RestaurantDashboard() {
  const isFocused = useIsFocused();
  const [menuItems, setMenuItems] = useState([]);
  const [alItems, setAlItems] = useState([]);
  const ScreenName = "Restaurant Menu Analytics";
  const route = useRoute();
  const { access, restaurantId } = route.params;
 
  const navigation = useNavigation();
  const [restaurantData, setRestaurantData] = useState(null);
  
  const handlegetMenuItems = async () => {
    try{
      const response = await fetch(`http://localhost:8000/analytics/${restaurantId}/menuitems/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access,
      },
    });
    
   
    if (response.ok) 
    {
      const data = await response.json();
      
      setMenuItems(data);
      console.log(menuItems);
    } 

  }catch (error) {
    console.error("Error:", error);
  }
};
useEffect (() => {
  if(isFocused)
  {
    handlegetMenuItems();
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
          onPress={() => navigation.navigate("Restaurant Dashboard", {access, restaurantId} )}
          style={styles.navItem}
        >
          <Icon name="home" size={30} color="black" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Menu", { access, restaurantId })}
          style={styles.navItem}
        >
          <Icon name="restaurant-menu" size={30} color="black" />
          <Text style={styles.navText}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Settings", { access, restaurantId })}
          style={styles.navItem}
        >
          <Icon name="settings" size={30} color="black" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
      {/* Render other restaurant dashboard content */}
     
        <ScrollView>
      <View style={styles.mainContent}>
      {menuItems.length > 0 && (
        <MenuAnalyticsComponent menuItems={menuItems} accessToken={access} restIDToken= {restaurantId} screenName={ScreenName} />
      )}
    </View>
    </ScrollView>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  navBar: {
    flexDirection: "row",
    backgroundColor: "#FFA500", // Orange color
    padding: 10,
    justifyContent: "space-around",
    alignItems: "center",
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
  mainContent: {
    padding: 20,
    flex: 2,
    backgroundColor: "#fff",
    justifyContent: "top",
    alignItems: "center",
  },
});

export default RestaurantDashboard;
