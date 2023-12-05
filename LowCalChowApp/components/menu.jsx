import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import MenuComponent from './menuItemComponent';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function MenuPage({ route, navigation }) {
  const isFocused = useIsFocused();

  const [menuItems, setmenuItems] = useState([]);
  const RestID = route.params.restaurantId;
  const { access, restaurantId} = route.params;
  const ScreenName = "Edit Menu";

  const handlegetMenuItems = async () => {
    try {
      const response = await fetch(`http://localhost:8000/restaurants/${RestID}/menuitems/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + access,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setmenuItems(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  useEffect(() => {
    if (isFocused) {
      handlegetMenuItems();
    }

  }, [isFocused]);

  return (
    <SafeAreaView>
    <View style={styles.navBar}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Restaurant Dashboard", { access, restaurantId })}
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
            
    <ScrollView>
    
        <View style={styles.container}>
        <Text style={styles.title}>Menu</Text>
          

            <MenuComponent menuItems={menuItems} accessToken={access} restIDToken={RestID} screenName={ScreenName} />

            <TouchableOpacity
        style={[styles.button, { backgroundColor: "orange" }]}
        onPress={() => navigation.navigate("Menu Creation", { access: access, restaurantId: RestID } )}
      >
        <Text style={styles.buttonText}>Add Menu Item</Text>
      </TouchableOpacity>
            {/*<Button title="Edit Menu Item" onPress={() => navigation.navigate('Edit Menu')}/>*/}
</View>

            
</ScrollView>
          
      </SafeAreaView>
    
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight:"bold"
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,

  },
  error: {
    color: 'red',
    fontSize: 20,
    marginBottom: 12,
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

});

export default MenuPage;