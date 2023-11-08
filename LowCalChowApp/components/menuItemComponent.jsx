import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const MenuComponent = ({menuItems, accessToken, restIDToken}) => {
  const navigation = useNavigation();
  const access = accessToken;
  const RestID = restIDToken;
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Edit Menu', {id: item.id, access: access, restaurantId: RestID})}>
        <View style={{ padding: 16, borderWidth: 1, borderBottomColor: '#ccc', margin: 5, borderRadius: 15, backgroundColor: '#FECA83' }}>
          <Text>{item.item_name}</Text>
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

export default MenuComponent;
