import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuComponent = ({menuItems, accessToken, restIDToken, screenName, bookmarkID}) => {
  const navigation = useNavigation();
  const [RestID, setRestID] = useState('');
  const [BookmarkID, setBookmarkID] = useState('');
  const access = accessToken;
  useEffect(() => {
    if (restIDToken) {
      setRestID(restIDToken);
    }
  }, [restIDToken]);
  useEffect(() => {
    if (bookmarkID) {
      setBookmarkID(bookmarkID);
    }
  }, [bookmarkID]);

  const ScreenName = screenName;
  console.log(screenName);
  {/*console.log(ScreenName);*/}
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(`${ScreenName}`, {id: item.id, access: access, ...(RestID && { restaurantId: RestID }), ...(BookmarkID &&{bookmarkID: BookmarkID})})}>
        <View style={styles.menuItem}>
          <Text style={styles.itemName}>{item.item_name}</Text>
          <Text>Calories: {item.calories}</Text>
          <Text>Price: ${item.price}</Text>
          <Text>Restaurant: {item.restaurant.name}</Text>


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

export default MenuComponent;
