import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  VirtualizedList,
  Dimensions,
  Modal,
  TextInput,
  Button as RNButton,
  Picker,
  Image,
  ScrollView,
} from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import logo from "../assets/icons8-carrot-94.png";
import TagModal from "./tagModal";
import AppSatisfactionFeedback from "./appSatisfactionFeedback";

function RestaurantHomepage({ navigation, route }) {
  const [restaurants, setRestaurants] = useState([]);
  const [rating, setRating] = useState("");
  const [tags, setTags] = useState([]);
  const [tagSelect, setTagSelect] = useState([]);
  const [priceLevel, setPriceLevel] = useState("");
  const priceLevelOptions = ["$", "$$", "$$$"];
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [openingHours, setOpeningHours] = useState({
    mon: { open: "", close: "", openAmPm: "AM", closeAmPm: "PM" },
    tue: { open: "", close: "", openAmPm: "AM", closeAmPm: "PM" },
    wed: { open: "", close: "", openAmPm: "AM", closeAmPm: "PM" },
    thu: { open: "", close: "", openAmPm: "AM", closeAmPm: "PM" },
    fri: { open: "", close: "", openAmPm: "AM", closeAmPm: "PM" },
    sat: { open: "", close: "", openAmPm: "AM", closeAmPm: "PM" },
    sun: { open: "", close: "", openAmPm: "AM", closeAmPm: "PM" },
  });
  const [newRestaurantName, setNewRestaurantName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const windowWidth = Dimensions.get("window").width;
  const { access } = route.params;
  const isFocused = useIsFocused();
  const [isRestTagsModalVisible, setIsRestTagsModalVisible] = useState(false);
  const stateOptions = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  const fetchRestaurants = async () => {
    try {
      const response = await fetch("http://localhost:8000/restaurants/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRestaurants(data);
      } else {
        setError("Error fetching data");
      }
    } catch (error) {
      setError("Error fetching data");
    }
  };

  const fetchRestTags = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/restaurants/resttags/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access,
          },
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        const formTags = data.map((item) => ({
          key: item.id,
          value: item.title,
        }));
        setTags(formTags);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchRestaurants();
      fetchRestTags();
    }
  }, [isFocused]);

  const handleRestTagSelect = (selectedRestTag) => {
    const isSelected = tagSelect.includes(selectedRestTag.key);

    if (isSelected) {
      setTagSelect(
        tagSelect.filter((tagKey) => tagKey !== selectedRestTag.key)
      );
    } else {
      setTagSelect([...tagSelect, selectedRestTag.key]);
    }
  };

  const openRestTagsModal = () => {
    setIsRestTagsModalVisible(true);
  };

  const closeRestTagsModal = () => {
    setIsRestTagsModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.restaurantItem}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => handleViewRestaurant(item)}
          >
            <MaterialIcons name="visibility" size={24} color="#2196F3" />
            <Text style={styles.buttonText}>View Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteRestaurant(item.id)}
          >
            <MaterialIcons name="delete" size={24} color="#FF0000" />
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const formatTime = (hours, ampm) => {
    let formattedHours = parseInt(hours, 10);
    if (ampm === "PM" && formattedHours !== 12) {
      formattedHours += 12;
    } else if (ampm === "AM" && formattedHours === 12) {
      formattedHours = 0;
    }

    return `${formattedHours.toString().padStart(2, "0")}:00:00`;
  };

  const handleAddRestaurant = () => {
    setModalVisible(true);
  };

  const confirmAddRestaurant = async () => {
    try {
      setModalVisible(false);

      const formattedOpeningHours = {};
      Object.keys(openingHours).forEach((day) => {
        const { open, close, openAmPm, closeAmPm } = openingHours[day];

        if (open && close) {
          formattedOpeningHours[`${day}_open`] = formatTime(open, openAmPm);
          formattedOpeningHours[`${day}_close`] = formatTime(close, closeAmPm);
        } else {
          formattedOpeningHours[`${day}_open`] = "";
          formattedOpeningHours[`${day}_close`] = "";
        }
      });

      const newRestaurantData = {
        name: newRestaurantName,
        rating: rating,
        tags: tagSelect,
        price_level: priceLevel,
        phone_number: phoneNumber,
        website: website,
        street_name: streetName,
        city: city,
        state: state,
        zip_code: zipCode,
        ...formattedOpeningHours,
      };
      console.log("Input data sent to the server:", newRestaurantData);
      const response = await fetch("http://localhost:8000/restaurants/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRestaurantData),
      });

      if (response.ok) {
        console.log("Restaurant added successfully.");
        fetchRestaurants();
      } else {
        console.error(response.json());
      }
    } catch (error) {
      console.error("Error adding restaurant", error);
    }
    setNewRestaurantName("");
    setRating("");
    setTagSelect("");
    setPriceLevel("");
    setPhoneNumber("");
    setWebsite("");
    setStreetName("");
    setCity("");
    setState("");
    setZipCode("");
  };

  const handleViewRestaurant = (restaurant) => {
    navigation.navigate("Restaurant Dashboard", {
      restaurantId: restaurant.id,
      access,
    });
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handleDeleteRestaurant = async (restaurantId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/restaurants/${restaurantId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log(`Restaurant with ID ${restaurantId} deleted successfully.`);
        fetchRestaurants();
      } else {
        console.error("Error deleting restaurant");
      }
    } catch (error) {
      console.error("Error deleting restaurant", error);
    }
  };

  const getItemCount = () => restaurants.length;

  const getItem = (data, index) => {
    return data[index];
  };

  const formatPhoneNumber = (input) => {
    const cleaned = input.replace(/\D/g, "");
    const formattedPhoneNumber = cleaned.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "$1-$2-$3"
    );
    return formattedPhoneNumber;
  };

  const handlePhoneNumberInput = (text) => {
    const formattedPhoneNumber = formatPhoneNumber(text);
    setPhoneNumber(formattedPhoneNumber);
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={[styles.sidebar, windowWidth < 600 && styles.smallSidebar]}>
        {/* Home */}
        <TouchableOpacity
          style={[
            styles.sidebarItem,
            route.name === "Restaurant Homepage" && styles.activeSidebarItem,
          ]}
          onPress={() => navigation.navigate("Restaurant Homepage", { access })}
        >
          <MaterialIcons name="home" size={24} color="black" />
          {windowWidth >= 600 && (
            <Text style={styles.sidebarItemText}>Home</Text>
          )}
        </TouchableOpacity>

        {/* Analytics */}
        <TouchableOpacity
          style={[
            styles.sidebarItem,
            route.name === "Restaurant Analytics Overview" &&
              styles.activeSidebarItem,
          ]}
          onPress={() =>
            navigation.navigate("Restaurant Analytics Overview", { access })
          }
        >
          <MaterialIcons name="analytics" size={24} color="black" />
          {windowWidth >= 600 && (
            <Text style={styles.sidebarItemText}>Analytics</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarItem}>
          <AppSatisfactionFeedback navigation={navigation} access={access}/>
        </TouchableOpacity>
      
      </View>

      {/* Main content */}
      <View style={styles.mainContent}>
        {/* Section Title and Add Restaurant Button */}
        <View style={styles.sectionTitleContainer}>
          <Image source={logo} style={{ width: 60, height: 60 }} />
          <Text style={styles.sectionTitle}>List of Restaurants</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddRestaurant()}
          >
            <MaterialIcons name="add" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* List of Restaurants */}
        <View style={styles.restaurantListContainer}>
          <VirtualizedList
            data={restaurants}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            getItemCount={getItemCount}
            getItem={getItem}
          />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <ScrollView
            contentContainerStyle={styles.modalContentScroll}
            showsVerticalScrollIndicator={true}
          >
            <View style={styles.modalContent}>
              {/* ... (existing modal content) */}
              <Text style={styles.modalTitle}>Enter Restaurant Info</Text>
              <TextInput
                style={styles.input}
                value={newRestaurantName}
                onChangeText={(text) => setNewRestaurantName(text)}
                placeholder="Restaurant Name"
              />

              <TextInput
                style={styles.input}
                value={rating}
                onChangeText={(text) => setRating(text)}
                placeholder="Rating"
              />

              <Picker
                selectedValue={priceLevel}
                onValueChange={(itemValue, itemIndex) =>
                  setPriceLevel(itemValue)
                }
                style={styles.input}
              >
                <Picker.Item label="Select Price Level" value="" />{" "}
                {/* default empty option */}
                {priceLevelOptions.map((option, index) => (
                  <Picker.Item label={option} value={option} key={index} />
                ))}
              </Picker>

              <TouchableOpacity
                onPress={openRestTagsModal}
                style={styles.tagsButton}
              >
                <Text style={styles.modalSelectTag}>Select Tags</Text>
              </TouchableOpacity>
              <TagModal
                visible={isRestTagsModalVisible}
                tags={tags}
                selectedTags={tagSelect}
                onSelect={handleRestTagSelect}
                onClose={closeRestTagsModal}
              />

              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={handlePhoneNumberInput}
                placeholder="Phone Number"
              />

              <TextInput
                style={styles.input}
                value={website}
                onChangeText={(text) => setWebsite(text)}
                placeholder="Website - Example: https://www.website.com"
              />

              <TextInput
                style={styles.input}
                value={streetName}
                onChangeText={(text) => setStreetName(text)}
                placeholder="Street name"
              />

              <TextInput
                style={styles.input}
                value={city}
                onChangeText={(text) => setCity(text)}
                placeholder="City"
              />
              <Picker
                selectedValue={state}
                onValueChange={(itemValue, itemIndex) => setState(itemValue)}
                style={styles.input}
              >
                <Picker.Item label="Select State" value="" />{" "}
                {/* default empty option */}
                {stateOptions.map((stateCode, index) => (
                  <Picker.Item
                    label={stateCode}
                    value={stateCode}
                    key={index}
                  />
                ))}
              </Picker>

              <TextInput
                style={styles.input}
                value={zipCode}
                onChangeText={(text) => setZipCode(text)}
                placeholder="Zip code"
              />

              {Object.keys(openingHours).map((day) => (
                <View key={day}>
                  <Text style={styles.dayTitle}>
                    {capitalizeFirstLetter(day)}
                  </Text>
                  <View style={styles.operatingHoursInput}>
                    <TextInput
                      style={styles.input}
                      placeholder="Open"
                      value={openingHours[day].open}
                      onChangeText={(text) =>
                        setOpeningHours({
                          ...openingHours,
                          [day]: { ...openingHours[day], open: text },
                        })
                      }
                    />
                    <Picker
                      selectedValue={openingHours[day].openAmPm}
                      onValueChange={(value) =>
                        setOpeningHours({
                          ...openingHours,
                          [day]: { ...openingHours[day], openAmPm: value },
                        })
                      }
                      style={styles.amPmPicker}
                    >
                      <Picker.Item label="AM" value="AM" />
                      <Picker.Item label="PM" value="PM" />
                    </Picker>
                    <TextInput
                      style={styles.input}
                      placeholder="Close"
                      value={openingHours[day].close}
                      onChangeText={(text) =>
                        setOpeningHours({
                          ...openingHours,
                          [day]: { ...openingHours[day], close: text },
                        })
                      }
                    />
                    <Picker
                      selectedValue={openingHours[day].closeAmPm}
                      onValueChange={(value) =>
                        setOpeningHours({
                          ...openingHours,
                          [day]: { ...openingHours[day], closeAmPm: value },
                        })
                      }
                      style={styles.amPmPicker}
                      itemStyle={styles.amPmPickerItem}
                    >
                      <Picker.Item label="AM" value="AM" />
                      <Picker.Item label="PM" value="PM" />
                    </Picker>
                  </View>
                </View>
              ))}

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.button]}
                  onPress={confirmAddRestaurant}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: 250,
    backgroundColor: "#FF9800",
    padding: 20,
  },
  sidebarItem: {
    backgroundColor: "#FF9800",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 12,
    flexDirection: "row",
  },
  sidebarItemText: {
    color: "#black",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  mainContent: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  restaurantItem: {
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    width: "50%",
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  activeSidebarItem: {
    backgroundColor: "#FFC107",
  },
  restaurantListContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FFA500",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    width: "40%",
  },
  addButton: {
    backgroundColor: "#FF9800",
    margin: 30,
    width: 70,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    bottom: 20,
    right: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  smallSidebar: {
    width: 100,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100%",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 60,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalSelectTag: {
    fontSize: 15,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  modalButtons: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalContentScroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tagsButton: {
    backgroundColor: "#FFA500",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    marginTop: 0,
    width: "100%",
    marginBottom: 20,
  },
  operatingHoursInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  amPmPicker: {
    width: 80,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  amPmPickerItem: {
    fontSize: 16,
    color: "#333",
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default RestaurantHomepage;
