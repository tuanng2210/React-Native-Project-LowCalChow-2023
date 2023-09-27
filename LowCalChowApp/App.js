// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LoginPage from './components/loginPage'; 
import Handshake from './components/handshake';
import PatronAccountCreationPage from './components/patron_account_creation';
import RestaurantAccountCreationPage from './components/restaurant_account_creation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuCreate from './components/menuCreate';
import MenuPage from './components/menu';
import EditMenuPage from './components/editMenuItem';
import RestaurantHomepage from './components/sampleRestaurantHomePage';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>      
      <Stack.Navigator>
        <Stack.Screen name="Restaurant Homepage" component={RestaurantHomepage}/>
        <Stack.Screen name="Menu" component={MenuPage}/>
        <Stack.Screen name="Edit Menu" component={EditMenuPage}/>
        <Stack.Screen name="Menu Creation" component={MenuCreate}/>
        <Stack.Screen  name="Login" component={LoginPage}/>
        <Stack.Screen  name="Patron Account Creation" component={PatronAccountCreationPage}/>
        <Stack.Screen  name="Restaurant Account Creation" component={RestaurantAccountCreationPage}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
