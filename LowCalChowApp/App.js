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
import SignUpPage from './components/SignUp';
import Handshake from './components/handshake';
import PatronProfileCreationPage from './components/patronProfileCreationPage';
import PatronAccountCreationPage from './components/patron_account_creation';
import RestaurantAccountCreationPage from './components/restaurant_account_creation';
import RestaurantHomepage from './components/restaurantHomePage';
import PatronPreferenceCreationPage from './components/patronPreferenceCreationPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>      
      <Stack.Navigator>
        <Stack.Screen  name="Patron Profile Creation Page" component={PatronProfileCreationPage}/>
        <Stack.Screen  name="Login" component={LoginPage}/>
        <Stack.Screen  name="Sign Up" component={SignUpPage}/>
        <Stack.Screen  name="Patron Account Creation" component={PatronAccountCreationPage}/>
        <Stack.Screen  name="Restaurant Account Creation" component={RestaurantAccountCreationPage}/>
        <Stack.Screen  name="Restaurant Homepage" component={RestaurantHomepage}/>
        <Stack.Screen  name="Patron Preference Creation Page" component={PatronPreferenceCreationPage}/>
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
