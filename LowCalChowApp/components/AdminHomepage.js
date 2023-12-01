import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
  Alert
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";



function AdminHomepage() {
  const route = useRoute();
  const navigation = useNavigation();
  const { access, adminId } = route.params;

    return (
    <View style={styles.container}>
      {/* Header in an orange box */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Admin Homepage</Text>
        <Button
          title="Admin FAQ Page"
          onPress={() => navigation.navigate("Admin FAQ Page")}
        />
      </View>

      {/* New Container for Tag Management */}
      <View style={styles.tagManagementContainer}>
        {/* Header for Tag Management */}
        <View style={styles.tagManagementHeader}>
          <Text style={styles.tagManagementHeaderText}>Tag Management</Text>
        </View>

        {/* Buttons for different tag categories */}
        <View style={styles.tagButtonsContainer}>
          <Button
            title="Rest Tags"
            onPress={() => navigation.navigate("Admin RestTags", { access })}
            color="orange"
            style={styles.tagButton}
          />
          {/* Add other buttons similarly */}
          <Button
            title="Food Type Tags"
            onPress={() => navigation.navigate("Admin Food Type Tags", { access })}
            color="green"
          />
          {/* ... Add other buttons for different tag categories */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  headerContainer: {
    backgroundColor: "orange",
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
  },
  tagsBox: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  tagsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  tagText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
  },
   buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonSpacer: {
    width: 10, // Adjust the width as needed for spacing
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 8,
  },  modalContainer: {
    position: "absolute",
    top: "30%",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
   addButtonContainer: {
    marginBottom: 32, // Add margin to create space between "Add" button and the first tag
  },
  tagManagementContainer: {
    backgroundColor: "green",
    padding: 16,
    marginTop: 20,
    borderRadius: 8,
  },
  tagManagementHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    paddingBottom: 8,
    marginBottom: 8,
  },
  tagManagementHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  tagButtonsContainer: {
    // Update button style to make them orange
    marginTop: 10,
    flexDirection: "column",
  },
  tagButton: {
    marginBottom: 8,
  },
});


export default AdminHomepage;
