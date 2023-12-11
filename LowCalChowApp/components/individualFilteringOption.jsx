import React from 'react';
import { View, Text } from 'react-native';

const FilteredDataScreen = ({ route }) => {
  const { analyticType, filterOptionId, accessToken } = route.params;

  // Fetch data based on filterOptionId and accessToken

  return (
    <View>
      <Text>Filtered Data Screen</Text>
      {/* Display your filtered data here */}
    </View>
  );
};

export default FilteredDataScreen;
