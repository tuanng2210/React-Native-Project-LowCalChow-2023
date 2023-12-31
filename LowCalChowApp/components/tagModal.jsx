import React from "react";
import {
  View,
  Modal,
  FlatList,
  Text,
  TouchableOpacity,
  CheckBox,
  StyleSheet,
} from "react-native";

const TagModal = ({ visible, tags, selectedTags, onSelect, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <FlatList
            data={tags}
            keyExtractor={(item) => item.key.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onSelect(item)}>
                <View style={styles.tagItem}>
                  <CheckBox
                    value={selectedTags.includes(item.key)}
                    onValueChange={() => onSelect(item)}
                  />
                  <Text style={styles.tagText}>{item.value}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "35%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: "90%",
    flexGrow: 1,
  },
  tagItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    backgroundColor: "rgba(255, 165, 0, 0.5)",
    padding: 10,
    marginRight: 20,
    borderRadius: 8,
  },
  tagText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#000000",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FFA500",
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
});

export default TagModal;
