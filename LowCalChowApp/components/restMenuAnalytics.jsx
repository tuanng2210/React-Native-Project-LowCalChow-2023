import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';

function RestMenuAnalytics() {
    const route = useRoute();
    const navigation = useNavigation();
    const { access, restaurantId } = route.params;

return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
      <TouchableOpacity
          onPress={() => navigation.navigate("Restaurant Dashboard", {access, restaurantId} )}
          style={styles.navItem}
        >
          <Icon name="chevron-left" size={30} color="black" />
          
        </TouchableOpacity>
        <Text style={styles.titleText}>Menu Item Analytics</Text>
      </View> 
      <ScrollView>

      </ScrollView>
      </View>)
}


      const styles = StyleSheet.create({
        container: {
          flex: 1,
        },
        mainContent: {
          padding: 20,
          backgroundColor: "#fff",
          justifyContent: "top",
          alignItems: "center",
          alignContent: "center",
        },
      
        button: {
          backgroundColor: "#FFA500",
          borderRadius: 8,
          paddingVertical: 10,
          alignItems: "center",
          marginTop: 16,
          marginBottom: 12,
          width: "10%",
        },
        buttonText: {
          color: "#000000",
          fontWeight: 'bold',
          fontSize: 16,
        },
        titleContainer: {
            
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "left",
          backgroundColor: "#FFA500",
          padding: 10,
        },
        titleText: {
          color: "#000000",
          fontSize: 18,
          marginLeft: 10,
        },
      });
      export default RestMenuAnalytics;