import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import MenuComponent from './menuItemComponent';
import {useIsFocused} from '@react-navigation/native';

function MenuPage({route, navigation}){
  const isFocused = useIsFocused();

  const [menuItems, setmenuItems]=useState([]);
  const RestID = route.params.restaurantId;
  const access = route.params.access;
  
  const handlegetMenuItems = async () => {
    try{
      const response = await fetch(`http://localhost:8000/restaurants/${RestID}/menuitems/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + access,
      },
    });

    if (response.ok) 
    {
      const data = await response.json();
      setmenuItems(data);
    } 
  }catch (error) {
    console.error("Error:", error);
  }
} 
useEffect (() => {
  if(isFocused)
  {
    handlegetMenuItems();
  }

}, [isFocused]); 
  
  return(
   <ScrollView style = {{ flex: 1}}>
      <SafeAreaView style={{ flex: 1}}>
        <View style={styles.container}>
            <Text style={styles.title}>Menu</Text>

            <MenuComponent menuItems={menuItems} accessToken={access} restIDToken={RestID}/>

            <Button title="Add Menu Item" onPress={() => navigation.navigate('Menu Creation', {access: access, restaurantId: RestID})}/>
            {/*<Button title="Edit Menu Item" onPress={() => navigation.navigate('Edit Menu')}/>*/}




        </View>
      </SafeAreaView>
     </ScrollView>
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
      },
        buttonText: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 16,
        },
        error: {
            color: 'red',
            fontSize: 20,
            marginBottom: 12,
        }
      });
   
      export default MenuPage;