import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

function Settings({ route, navigation }) {
  const { access, restaurantId } = route.params;

  const navigateToUpdateInfo = () => {
    navigation.navigate("Update Info Screen", { access, restaurantId });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.updateInfoButton}
        onPress={navigateToUpdateInfo}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      {/* Rest of your component */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  updateInfoButton: {
    backgroundColor: "#FFA500",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Settings;
