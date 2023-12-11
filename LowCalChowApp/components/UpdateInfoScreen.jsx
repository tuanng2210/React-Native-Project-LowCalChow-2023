import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Picker,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import TagModal from "./tagModal";

function UpdateInfo({ route, navigation }) {
  const { access, restaurantId } = route.params;
  const states = [
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
  // const [existingData, setExistingData] = useState(null);

  const [newRestaurantName, setNewRestaurantName] = useState("");
  const [rating, setRating] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [priceLevel, setPriceLevel] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [availableTags, setAvailableTags] = useState([]);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [isRestTagsModalVisible, setIsRestTagsModalVisible] = useState(false);
  const [defaultRestTags, setDefaultRestTags] = useState([]);
  const [openingHours, setOpeningHours] = useState({
    mon: { open: "", close: "", openAmPm: "AM", closeAmPm: "PM" },
    tue: { open: "", close: "", openAmPm: "AM", closeAmPm: "PM" },
    wed: { open: "", close: "", openAmPm: "AM", closeAmPm: "PM" },
    thu: { open: "", close: "", openAmPm: "AM", closeAmPm: "PM" },
    fri: { open: "", close: "", openAmPm: "AM", closeAmPm: "PM" },
    sat: { open: "", close: "", openAmPm: "AM", closeAmPm: "PM" },
    sun: { open: "", close: "", openAmPm: "AM", closeAmPm: "PM" },
  });

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

  const fetchExistingData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/restaurants/${restaurantId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (!newRestaurantName) setNewRestaurantName(data.name);
        if (!rating) setRating(data.rating);
        if (!priceLevel) setPriceLevel(data.price_level);
        if (!phoneNumber) setPhoneNumber(data.phone_number);
        if (!website) setWebsite(data.website);
        if (!streetName) setStreetName(data.street_name);
        if (!city) setCity(data.city);
        if (!selectedState) setSelectedState(data.state);
        if (!zipCode) setZipCode(data.zip_code);

        const getAmPm = (time) => {
          const [hour] = time.split(":");
          return parseInt(hour, 10) >= 12 ? "PM" : "AM";
        };

        setOpeningHours((prev) => ({
          mon: {
            open: formatTime12Hour(data.mon_open),
            close: formatTime12Hour(data.mon_close),
            openAmPm: getAmPm(data.mon_open),
            closeAmPm: getAmPm(data.mon_close),
          },
          tue: {
            open: formatTime12Hour(data.tue_open),
            close: formatTime12Hour(data.tue_close),
            openAmPm: getAmPm(data.tue_open),
            closeAmPm: getAmPm(data.tue_close),
          },
          wed: {
            open: formatTime12Hour(data.wed_open),
            close: formatTime12Hour(data.wed_close),
            openAmPm: getAmPm(data.wed_open),
            closeAmPm: getAmPm(data.wed_close),
          },
          thu: {
            open: formatTime12Hour(data.thu_open),
            close: formatTime12Hour(data.thu_close),
            openAmPm: getAmPm(data.thu_open),
            closeAmPm: getAmPm(data.thu_close),
          },
          fri: {
            open: formatTime12Hour(data.fri_open),
            close: formatTime12Hour(data.fri_close),
            openAmPm: getAmPm(data.fri_open),
            closeAmPm: getAmPm(data.fri_close),
          },
          sat: {
            open: formatTime12Hour(data.sat_open),
            close: formatTime12Hour(data.sat_close),
            openAmPm: getAmPm(data.sat_open),
            closeAmPm: getAmPm(data.sat_close),
          },
          sun: {
            open: formatTime12Hour(data.sun_open),
            close: formatTime12Hour(data.sun_close),
            openAmPm: getAmPm(data.sun_open),
            closeAmPm: getAmPm(data.sun_close),
          },
        }));

        const RestTags = data.tags.map((tag) => ({
          key: tag.id,
          value: tag.title,
        }));

        setDefaultRestTags(RestTags);
      } else {
        console.error("Failed to fetch restaurant information");
      }
    } catch (error) {
      console.error("Error fetching restaurant information:", error);
    }
  };

  const formatTime12Hour = (time24Hour) => {
    const [hours, minutes] = time24Hour.split(":");
    const formattedHours = parseInt(hours, 10) % 12 || 12;
    return `${formattedHours}:${minutes}`;
  };

  const handleUpdateInfo = async () => {
    const data = {
      name: newRestaurantName,
      rating: rating,
      tags: selectedTags,
      price_level: priceLevel,
      phone_number: phoneNumber,
      website: website,
      street_name: streetName,
      city: city,
      state: selectedState,
      zip_code: zipCode,
      mon_open: formatTime24Hour(
        openingHours.mon.open,
        openingHours.mon.openAmPm
      ),
      mon_close: formatTime24Hour(
        openingHours.mon.close,
        openingHours.mon.closeAmPm
      ),
      tue_open: formatTime24Hour(
        openingHours.tue.open,
        openingHours.tue.openAmPm
      ),
      tue_close: formatTime24Hour(
        openingHours.tue.close,
        openingHours.tue.closeAmPm
      ),
      wed_open: formatTime24Hour(
        openingHours.wed.open,
        openingHours.wed.openAmPm
      ),
      wed_close: formatTime24Hour(
        openingHours.wed.close,
        openingHours.wed.closeAmPm
      ),
      thu_open: formatTime24Hour(
        openingHours.thu.open,
        openingHours.thu.openAmPm
      ),
      thu_close: formatTime24Hour(
        openingHours.thu.close,
        openingHours.thu.closeAmPm
      ),
      fri_open: formatTime24Hour(
        openingHours.fri.open,
        openingHours.fri.openAmPm
      ),
      fri_close: formatTime24Hour(
        openingHours.fri.close,
        openingHours.fri.closeAmPm
      ),
      sat_open: formatTime24Hour(
        openingHours.sat.open,
        openingHours.sat.openAmPm
      ),
      sat_close: formatTime24Hour(
        openingHours.sat.close,
        openingHours.sat.closeAmPm
      ),
      sun_open: formatTime24Hour(
        openingHours.sun.open,
        openingHours.sun.openAmPm
      ),
      sun_close: formatTime24Hour(
        openingHours.sun.close,
        openingHours.sun.closeAmPm
      ),
    };
    console.log(data);
    try {
      const response = await fetch(
        `http://localhost:8000/restaurants/${restaurantId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        console.log("Restaurant information updated successfully!");

        setSuccessMessageVisible(true);
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 2000);
      } else {
        const errorResponse = await response.json();
        console.error(
          "Failed to update restaurant information:",
          errorResponse
        );
      }
    } catch (error) {
      console.error("Error updating restaurant information:", error);
    }
  };

  // const formatTime24Hour = (time12Hour, amPm) => {
  //   const [hours, minutes] = time12Hour.split(":");
  //   const formattedHours =
  //     amPm === "PM" ? parseInt(hours, 10) + 12 : parseInt(hours, 10);
  //   return `${formattedHours.toString().padStart(2, "0")}:${minutes}:00`;
  // };

  const formatTime24Hour = (time, amPm) => {
    const [hours, minutes] = time.split(":").map(Number);

    if (amPm === "PM" && hours !== 12) {
      return `${hours + 12}:${minutes}`;
    } else if (amPm === "AM" && hours === 12) {
      return `00:${minutes}`;
    } else {
      return `${hours}:${minutes}`;
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
        setAvailableTags(formTags);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchExistingData();
    fetchRestTags();
  }, []);

  useEffect(() => {
    setSelectedTags(defaultRestTags.map((tag) => tag.key));
  }, [defaultRestTags]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const openRestTagsModal = () => {
    setIsRestTagsModalVisible(true);
  };

  const closeRestTagsModal = () => {
    setIsRestTagsModalVisible(false);
  };

  const handleRestTagSelect = (selectedRestTag) => {
    const isSelected = selectedTags.includes(selectedRestTag.key);

    if (isSelected) {
      setSelectedTags(
        selectedTags.filter((tagKey) => tagKey !== selectedRestTag.key)
      );
    } else {
      setSelectedTags([...selectedTags, selectedRestTag.key]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.updateTitle}>
        <Text style={styles.titleText}>Update Restaurant Information</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Update Your Restaurant Information: </Text>
        <TextInput
          style={styles.input}
          placeholder="Restaurant Name"
          onChangeText={setNewRestaurantName}
          value={newRestaurantName}
        />

        <TextInput
          style={styles.input}
          placeholder="Rating"
          onChangeText={setRating}
          value={rating}
        />

        <TouchableOpacity onPress={openRestTagsModal} style={styles.tagsButton}>
          <Text style={styles.modalSelectTag}>Select Tags</Text>
        </TouchableOpacity>
        <TagModal
          visible={isRestTagsModalVisible}
          tags={availableTags}
          selectedTags={selectedTags}
          onSelect={handleRestTagSelect}
          onClose={closeRestTagsModal}
        />

        <Picker
          selectedValue={priceLevel}
          onValueChange={(itemValue) => setPriceLevel(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Select Price Level" value="" />
          <Picker.Item label="$" value="$" />
          <Picker.Item label="$$" value="$$" />
          <Picker.Item label="$$$" value="$$$" />
          <Picker.Item label="$$$$" value="$$$$" />
        </Picker>

        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={handlePhoneNumberInput}
          placeholder="Phone Number"
        />

        <TextInput
          style={styles.input}
          placeholder="Website"
          onChangeText={(text) => setWebsite(text)}
          value={website}
        />

        <TextInput
          style={styles.input}
          placeholder="Street Name"
          onChangeText={(text) => setStreetName(text)}
          value={streetName}
        />

        <TextInput
          style={styles.input}
          placeholder="City"
          onChangeText={(text) => setCity(text)}
          value={city}
        />

        <Picker
          selectedValue={selectedState}
          onValueChange={(itemValue) => setSelectedState(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Select a State" value="" />
          {states.map((state, index) => (
            <Picker.Item key={index} label={state} value={state} />
          ))}
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Zip Code"
          onChangeText={(text) => setZipCode(text)}
          value={zipCode}
        />

        {Object.keys(openingHours).map((day) => (
          <View key={day}>
            <Text style={styles.dayTitle}>{capitalizeFirstLetter(day)}</Text>
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

        <TouchableOpacity style={styles.button} onPress={handleUpdateInfo}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Settings", { access, restaurantId })
          }
        >
          <Text style={styles.buttonText}>Back To Settings</Text>
        </TouchableOpacity>
        {successMessageVisible && (
          <View style={styles.successMessage}>
            <Text style={styles.successMessageText}>
              Restaurant information updated successfully!
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignContent: "center",
    width: "100%",
    height: "100%",
  },
  updateTitle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "left",
    backgroundColor: "#FFA500",
    padding: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  formContainer: {
    margin: 30,
    justifyItems: "center",
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    width: "40%",
    alignSelf: "center",
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
    width: "50%",
    backgroundColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#FFA500",
    margin: 10,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    width: "20%",
  },
  buttonText: {
    color: "#black",
    fontSize: 14,
    fontWeight: "bold",
  },
  picker: {
    height: 40,
    borderColor: "#007bff",
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
  },
  successMessage: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  successMessageText: {
    color: "#ffffff",
    textAlign: "center",
  },
  modalSelectTag: {
    fontSize: 15,
  },
  buttonContainer: {
    flex: "end",
    flexDirection: "row",
    backgroundColor: "#FFA500",
    width: "100%",
    justifyContent: "space-around",
    padding: 10,
  },
  tagsButton: {
    backgroundColor: "#FFA500",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    width: "50%",
    marginBottom: 20,
    marginTop: 0,
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

export default UpdateInfo;
