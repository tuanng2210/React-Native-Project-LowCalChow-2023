import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuAnalyticsComponent = ({menuItems, accessToken, restIDToken, screenName}) => {
  const navigation = useNavigation();
  const [RestID, setRestID] = useState('');
  const access = accessToken;
  useEffect(() => {
    if (restIDToken) {
      setRestID(restIDToken);
    }
  }, [restIDToken]);

  const ScreenName = screenName;
  console.log(screenName);
  {/*console.log(ScreenName);*/}
  const renderItem = ({ item }) => {
    return (

      <TouchableOpacity onPress={() => navigation.navigate(`${ScreenName}`, {menuItemId: item.menuItem_id.id, access: access, restaurantId: RestID })}>
        <View style={styles.menuItem}>
          <Text style={styles.itemName}>{item.menuItem_id.item_name}</Text>
          <Text style={styles.itemName}>Average Rating: {item.average_rating}</Text>
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <FlatList
      data={menuItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  menuItem: {
      backgroundColor: 'rgba(255, 165, 0, 0.5)',
      borderRadius: 8,
      padding: 15,
      marginBottom: 15,
  },
  itemName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    }
  },);

export default MenuAnalyticsComponent;