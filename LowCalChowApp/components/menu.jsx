import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

function MenuPage({navigation}){

    return(

        <View style={styles.container}>
            <Text style={styles.title}>Menu</Text>


            <Button title="Add Menu Item" onPress={() => navigation.navigate('Menu Creation')}/>
            <Button title="Edit Menu Item" onPress={() => navigation.navigate('Edit Menu')}/>




        </View>
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