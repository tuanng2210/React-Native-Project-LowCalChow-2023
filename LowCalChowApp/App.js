import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LoginPage from './components/loginPage';
import SignUpPage from './components/SignUp';
import Handshake from './components/handshake';
import PatronProfileCreationPage from './components/patronProfileCreationPage';
import PatronAccountCreationPage from './components/patron_account_creation';
import RestaurantAccountCreationPage from './components/restaurant_account_creation';
import RestaurantHomepage from './components/restaurantHomePage';
import PatronHomepage from './components/patronHomepage';
import RestaurantAnalytics from './components/restaurantGlobalAnalytics';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuCreate from './components/menuCreate';
import MenuPage from './components/menu';
import EditMenuPage from './components/editMenuItem';
import RestaurantDashboard from './components/restaurantDashboard';
import PatronSettingsPage from './components/patronSettingsPage';
import PatronProfileEditPage from './components/patronProfileEditPage';
import Search from './components/search';
import Bookmark from './components/bookmark';
import AdminHomepage from './components/AdminHomepage';
import AdminFAQPage from './components/AdminFAQPage';
import Settings from './components/settings';
import MenuItemHistory from "./components/menuItemHistory";
import UpdateInfo from './components/UpdateInfoScreen';
import PatronPreferenceCreationPage from './components/patronPreferenceCreationPage';
import ViewMenuItem from './components/patronViewMenuItem';
import SearchResultsScreen from './components/searchResults';
import RestMenuAnalytics from './components/restMenuAnalytics';
import Admin_RestTags from "./components/Admin_Resttags";
import Admin_FoodTypeTags from "./components/Admin_FoodTypeTags";
import AnalyticsDashboard from './components/analyticDashboard';
import Admin_CookStyleTags from "./components/Admin_CookStyleTags";
import Admin_TasteTags from "./components/Admin_TasteTags";
import Admin_RestrictionTags from "./components/Admin_RestrictionTags";
import Admin_AllergyTags from "./components/Admin_AllergyTags";
import Admin_IngredientTags from "./components/Admin_IngredientTags";
import FilteredDataScreen from './components/individualFilteringOption';
import Admin_TagManagement from './components/Admin_TagManagement';
import Admin_Restaurant_Analytics from "./components/Admin_Restaurant_Analytics";
import Admin_UserFeedback from "./components/Admin_UserFeedback";




const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
       
      
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Sign Up" component={SignUpPage} />
        <Stack.Screen name="Menu" component={MenuPage} />
        <Stack.Screen name="Edit Menu" component={EditMenuPage} />
        <Stack.Screen name="Menu Creation" component={MenuCreate} />
        <Stack.Screen name="Patron Account Creation"  component={PatronAccountCreationPage}/>
        <Stack.Screen name="Patron Profile Creation" component={PatronProfileCreationPage}/>
        <Stack.Screen name="Restaurant Account Creation" component={RestaurantAccountCreationPage}/>
        <Stack.Screen name="Patron Preference Creation" component={PatronPreferenceCreationPage}/>
        <Stack.Screen name="Restaurant Homepage" component={RestaurantHomepage} />
        <Stack.Screen name="Patron Homepage" component={PatronHomepage} />
        <Stack.Screen name="Patron Settings Page"  component={PatronSettingsPage}/>
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Bookmark" component={Bookmark} />
        <Stack.Screen name="Patron Profile Edit Page" component={PatronProfileEditPage} />
        <Stack.Screen name="Restaurant Analytics Overview"  component={RestaurantAnalytics}/>
        <Stack.Screen name="Restaurant Dashboard" component={RestaurantDashboard}/>
        <Stack.Screen name="Admin Homepage" component={AdminHomepage} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="View Menu Item" component={ViewMenuItem} />
        <Stack.Screen name="Update Info" component={UpdateInfo} />
        <Stack.Screen name="Search Results" component={SearchResultsScreen} />
        <Stack.Screen name="Menu Item History" component={MenuItemHistory} />
        <Stack.Screen name="Restaurant Menu Analytics" component={RestMenuAnalytics} />
        <Stack.Screen name="Admin FAQ Page" component={AdminFAQPage} />
        <Stack.Screen name="Admin RestTags" component={Admin_RestTags} />
        <Stack.Screen name="Admin Food Type Tags" component={Admin_FoodTypeTags} />
        <Stack.Screen name="Analytic Dashboard" component={AnalyticsDashboard} />
        <Stack.Screen name="Admin Cook Style Tags" component={Admin_CookStyleTags} />
        <Stack.Screen name="Admin Taste Tags" component={Admin_TasteTags} />
        <Stack.Screen name="Admin Restriction Tags" component={Admin_RestrictionTags} />
        <Stack.Screen name="Admin Allergy Tags" component={Admin_AllergyTags} />
        <Stack.Screen name="Admin Ingredient Tags" component={Admin_IngredientTags} />
        <Stack.Screen name="Filtered Data" component={FilteredDataScreen} />
        <Stack.Screen name="Admin Tag Management" component={Admin_TagManagement} />
        <Stack.Screen name="Admin Restaurant Analytics" component={Admin_Restaurant_Analytics} />
        <Stack.Screen name="Admin User Feedback" component={Admin_UserFeedback} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;