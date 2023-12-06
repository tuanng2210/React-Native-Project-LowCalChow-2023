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



function Admin_TasteTags() {
  const route = useRoute();
  const navigation = useNavigation();
  const {access, adminId} = route.params;
  const [tasteTags, setTasteTags] = useState([]);
  const [newTag, setNewTag] = useState(""); // State for user input
  const [editTag, setEditTag] = useState(null); // State to store the tag being edited
   const [editedTag, setEditedTag] = useState(""); // State for edited tag

useEffect(() => {
  const getTasteTags = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/restaurants/tastetags/`,
        {
           method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
        },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Log the data
        setTasteTags(data);
      } else {
        console.error("API Error:", response.status);
        console.error(await response.text()); // Log the response content
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  };


   getTasteTags();
}, [access]);
  const addTag = async () => {
    if (newTag) {
      try {
        const response = await fetch(
          `http://localhost:8000/restaurants/tastetags/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access}`,
            },
            body: JSON.stringify({ title: newTag }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          // Update the local list with the new tag
          setTasteTags([...tasteTags, data]);
          setNewTag(""); // Clear the input
        } else {
          console.error("API Error:", response.status);
          console.error(await response.text()); // Log the response content
        }
      } catch (error) {
        console.error("Network Error:", error);
      }
    }
  };

const handleEditTag = (tag) => {
    setEditedTag(tag.title);
    setEditTag(tag);
  };

  const cancelEdit = () => {
    setEditTag(null);
    setEditedTag(""); // Clear the edited tag state
  };

  const submitEdit = async () => {
    if (editedTag && editTag) {
      try {
        const response = await fetch(
          `http://localhost:8000/restaurants/tastetags/${editTag.id}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access}`,
            },
            body: JSON.stringify({ title: editedTag }),
          }
        );

        if (response.ok) {
          // Update the local list with the edited tag
          setTasteTags((prevTags) =>
            prevTags.map((tag) =>
              tag.id === editTag.id ? { ...tag, title: editedTag } : tag
            )
          );
          // Clear the edit state
          setEditTag(null);
        } else {
          console.error("API Error:", response.status);
          console.error(await response.text()); // Log the response content check
        }
      } catch (error) {
        console.error("Network Error:", error);
      }
    }
  };

const handleDeleteTag = async (tagId) => {
  try {
    const response = await fetch(
      `http://localhost:8000/restaurants/tastetags/${tagId}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );

    if (response.ok) {
      // Remove the deleted tag from the local list
      const updatedTags = tasteTags.filter((tag) => tag.id !== tagId);
      setTasteTags(updatedTags);
    } else {
      console.error("API Error:", response.status);
      console.error(await response.text());
    }
  } catch (error) {
    console.error("Network Error:", error);
  }
};

  return (
  <View style={styles.container}>
    {/* Header in an orange box */}
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Tag Management - Taste Tags</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.tagsDescription}>
          This section allows you to manage Taste tags. You can add new tags, delete existing ones, and edit the titles of the tags.
        </Text>
      </View>
      <View style={styles.buttonSpacer} /> {/* Add vertical space */}
      <Button
        title="Admin Dashboard"
        onPress={() => navigation.navigate("Admin Homepage", {access})}
        color="orange"
      />
    </View>
      <View style={styles.tagsBox}>

<View style={styles.tagsBox}>
  <Text style={styles.tagsHeader}>Taste Tags</Text>

  {/* Add a TextInput for the user to enter a new tag */}
  <TextInput
    style={styles.input}
    placeholder="Add a new tag"
    value={newTag}
    onChangeText={(text) => setNewTag(text)}
  />

  {/* Add button to add a new tag */}
  <Button title="Add" onPress={addTag} color="orange" />
  <View style={styles.addButtonContainer} /> {/* Add vertical space */}

  {/* List of Restaurant Tags */}
  <FlatList
    data={tasteTags}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <View style={styles.tagContainer}>
        <Text style={styles.tagText}>{item.title}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Edit" onPress={() => handleEditTag(item)} color="orange" />
          <View style={styles.buttonSpacer} /> {/* Add vertical space */}
          <Button title="Delete" onPress={() => handleDeleteTag(item.id)} color="orange" />
        </View>
      </View>
    )}
    ItemSeparatorComponent={() => <View style={styles.separator} />}
  />

  {/* Edit tag modal */}
  {editTag && (
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Edit Tag</Text>
      <TextInput
        style={styles.modalInput}
        placeholder="Enter new tag"
        value={editedTag}
        onChangeText={(text) => setEditedTag(text)}
      />
      <View style={styles.modalButtonContainer}>
        <Button title="Cancel" onPress={cancelEdit} color="orange" />
        <Button title="Submit" onPress={submitEdit} color="orange" />
      </View>
    </View>
  )}
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
    backgroundColor: "#BAD4AA",
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
  }, descriptionContainer: {
    paddingHorizontal: 5, // Adjust padding horizontally
    marginBottom: 10,
  },
  tagsDescription: {
    fontSize: 16,
    color: 'white', // Setting text color to white
  },
});


export default Admin_TasteTags;
