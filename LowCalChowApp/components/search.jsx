import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Switch,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import logo from "../assets/icons8-carrot-94.png";
import TagModal from "./tagModal";

function Search({ navigation, route }) {
  const { access } = route.params;
  const [query, setQuery] = useState("");
  const [allergyTags, setAllergyTags] = useState([]);
  const [calorieLimit, setCalorieLimit] = useState("");
  const [dietaryRestrictionTags, setDietaryRestrictionTags] = useState([]);
  const [dislikedIngredients, setDislikedIngredients] = useState([]);
  const [patronTasteTags, setPatronTasteTags] = useState([]);
  const [priceMax, setPriceMax] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [clicked, setClicked] = useState(false);
  const [selectedRestrictionTags, setSelectedRestrictionTags] = useState([]);
  const [selectedAllergyTags, setSelectedAllergyTags] = useState([]);
  const [selectedTasteTags, setSelectedTasteTags] = useState([]);
  const [selectedIngredientTags, setSelectedIngredientTags] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isTasteTagsModalVisible, setIsTasteTagsModalVisible] = useState(false);
  const [isRestrictionTagsModalVisible, setIsRestrictionTagsModalVisible] =
    useState(false);
  const [isAllergyTagsModalVisible, setIsAllergyTagsModalVisible] =
    useState(false);
  const [isIngredientTagsModalVisible, setIsIngredientTagsModalVisible] =
    useState(false);
  const [defaultRestrictionTags, setDefaultRestrictionTags] = useState([]);
  const [defaultTasteTags, setDefaultTasteTags] = useState([]);
  const [defaultAllergyTags, setDefaultAllergyTags] = useState([]);
  const [defaultIngredientTags, setDefaultIngredientTags] = useState([]);
  const [isAdvancedSearch, setAdvancedSearch] = useState(false);

  const fetchDefaultTags = async () => {
    try {
      const response = await fetch(`http://localhost:8000/patrons/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);

        if (!calorieLimit) setCalorieLimit(responseData[0].calorie_limit);
        if (!priceMin) setPriceMin(0.02);
        if (!priceMax) setPriceMax(responseData[0].price_max);

        const patronRestrictionTags =
          responseData[0].patron_restriction_tag.map((tag) => ({
            key: tag.id,
            value: tag.title,
          }));

        const patronTasteTags = responseData[0].patron_taste_tag.map((tag) => ({
          key: tag.id,
          value: tag.title,
        }));

        const patronAllergyTags = responseData[0].patron_allergy_tag.map(
          (tag) => ({
            key: tag.id,
            value: tag.title,
          })
        );

        const patronIngredientTags = responseData[0].disliked_ingredients.map(
          (tag) => ({
            key: tag.id,
            value: tag.title,
          })
        );

        setDefaultRestrictionTags(patronRestrictionTags);
        setDefaultTasteTags(patronTasteTags);
        setDefaultAllergyTags(patronAllergyTags);
        setDefaultIngredientTags(patronIngredientTags);
      } else {
        console.error(await response.json());
      }
    } catch (error) {
      console.error("Error fetching default taste tags", error);
    }
  };

  useEffect(() => {
    fetchDefaultTags();
  }, []);

  useEffect(() => {
    setSelectedRestrictionTags(defaultRestrictionTags.map((tag) => tag.key));
    setSelectedTasteTags(defaultTasteTags.map((tag) => tag.key));
    setSelectedAllergyTags(defaultAllergyTags.map((tag) => tag.key));
    setSelectedIngredientTags(defaultIngredientTags.map((tag) => tag.key));
  }, [
    defaultTasteTags,
    defaultRestrictionTags,
    defaultAllergyTags,
    defaultIngredientTags,
  ]);

  const openTasteTagsModal = () => {
    setIsTasteTagsModalVisible(true);
  };

  const closeTasteTagsModal = () => {
    setIsTasteTagsModalVisible(false);
  };

  const openRestrictionTagsModal = () => {
    setIsRestrictionTagsModalVisible(true);
  };

  const closeRestrictionTagsModal = () => {
    setIsRestrictionTagsModalVisible(false);
  };

  const openAllergyTagsModal = () => {
    setIsAllergyTagsModalVisible(true);
  };

  const closeAllergyTagsModal = () => {
    setIsAllergyTagsModalVisible(false);
  };

  const openIngredientTagsModal = () => {
    setIsIngredientTagsModalVisible(true);
  };

  const closeIngredientTagsModal = () => {
    setIsIngredientTagsModalVisible(false);
  };

  const handleTasteTagSelect = (selectedTasteTag) => {
    const isSelected = selectedTasteTags.includes(selectedTasteTag.key);

    if (isSelected) {
      setSelectedTasteTags(
        selectedTasteTags.filter((tagKey) => tagKey !== selectedTasteTag.key)
      );
    } else {
      setSelectedTasteTags([...selectedTasteTags, selectedTasteTag.key]);
    }
  };

  const handleRestrictionTagSelect = (selectedRestrictionTag) => {
    const isSelected = selectedRestrictionTags.includes(
      selectedRestrictionTag.key
    );

    if (isSelected) {
      setSelectedRestrictionTags(
        selectedRestrictionTags.filter(
          (tagKey) => tagKey !== selectedRestrictionTag.key
        )
      );
    } else {
      setSelectedRestrictionTags([
        ...selectedRestrictionTags,
        selectedRestrictionTag.key,
      ]);
    }
  };

  const handleAllergyTagSelect = (selectedAllergyTag) => {
    const isSelected = selectedAllergyTags.includes(selectedAllergyTag.key);

    if (isSelected) {
      setSelectedAllergyTags(
        selectedAllergyTags.filter(
          (tagKey) => tagKey !== selectedAllergyTag.key
        )
      );
    } else {
      setSelectedAllergyTags([...selectedAllergyTags, selectedAllergyTag.key]);
    }
  };

  const handleIngredientSelect = (selectedIngredientTag) => {
    const isSelected = selectedIngredientTags.includes(
      selectedIngredientTag.key
    );

    if (isSelected) {
      setSelectedIngredientTags(
        selectedIngredientTags.filter(
          (tagKey) => tagKey !== selectedIngredientTag.key
        )
      );
    } else {
      setSelectedIngredientTags([
        ...selectedIngredientTags,
        selectedIngredientTag.key,
      ]);
    }
  };

  const toggleAdvancedSearch = () => {
    setAdvancedSearch((prev) => !prev);
  };

  const handleSubmit = async () => {
    try {
      const searchData = {
        query: query,
        calorie_limit: parseInt(calorieLimit),
        dietary_restriction_tags: selectedRestrictionTags,
        allergy_tags: selectedAllergyTags,
        patron_taste_tags: selectedTasteTags,
        disliked_ingredients: selectedIngredientTags,
        price_max: parseFloat(priceMax),
        price_min: parseFloat(priceMin),
      };
      console.log("Input data sent to the server:", searchData);
      const response = await fetch(
        "http://localhost:8000/patrons/searchhistory/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(searchData),
        }
      );

      if (response.ok) {
        console.log("Search data added successfully.");
        const responseData = await response.json();
        setSearchResults(responseData.results);
        navigation.navigate("Search Results", {
          searchResults: responseData.results,
        });
        console.log("Data received from the server:", responseData);
        // setQuery("");
        // setCalorieLimit("");
        // setSelectedRestrictionTags([]);
        // setSelectedAllergyTags([]);
        // setSelectedIngredientTags([]);
        // setSelectedTasteTags([]);
        // setPriceMax("");
        // setPriceMin("");
      } else {
        console.error(response.json());
      }
    } catch (error) {
      console.error("Error adding search data", error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/restaurants/tags/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const dietary_tags = data.restrictiontags.map((tag) => ({
          key: tag.id,
          value: tag.title,
        }));

        const allergy_tags = data.allergytags.map((tag) => ({
          key: tag.id,
          value: tag.title,
        }));

        const patron_taste_tags = data.tastetags.map((tag) => ({
          key: tag.id,
          value: tag.title,
        }));

        const ingredient_tags = data.ingredienttags.map((tag) => ({
          key: tag.id,
          value: tag.title,
        }));

        setDietaryRestrictionTags(dietary_tags);
        setAllergyTags(allergy_tags);
        setPatronTasteTags(patron_taste_tags);
        setDislikedIngredients(ingredient_tags);
      })
      .catch((error) => {
        console.error("Errors:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navbarItem}
          onPress={() =>
            navigation.navigate("Patron Settings Page", { access })
          }
        >
          <Icon name="gear" size={24} color="#000000" />
        </TouchableOpacity>

        <View style={styles.navbarItem}>
          <Image source={logo} style={{ width: 30, height: 30 }} />
          <Text style={styles.navbarText}>Search</Text>
        </View>
        <TouchableOpacity
          style={styles.navbarItem}
          onPress={() => navigation.navigate("Bookmark", { access })}
        >
          <Icon name="bookmark" size={25} color="#000000" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.mainContent}>
          <View style={styles.root}>
            <Text style={styles.title}>Search for a Menu Item</Text>

            {/* Search Bar */}
            <View
              style={
                !isAdvancedSearch
                  ? styles.searchBar__unclicked
                  : styles.searchBar__clicked
              }
            >
              <Feather
                name="search"
                size={20}
                color="black"
                style={{ marginLeft: 1 }}
              />
              <TextInput
                style={styles.inputSearch}
                placeholder="Search"
                value={query}
                onChangeText={(text) => setQuery(text)}
              />
            </View>

            <Text style={styles.labelInput}> Select Calorie Level: </Text>
            <TextInput
              style={styles.calorieInput}
              placeholder="Calorie Limit"
              value={calorieLimit}
              onChangeText={(text) => setCalorieLimit(text)}
            />

            {/* Additional Fields */}
            {isAdvancedSearch && (
              <View style={styles.additionalFieldsContainer}>
                <Text style={styles.labelInput}> Select Tags: </Text>
                <TouchableOpacity
                  onPress={openRestrictionTagsModal}
                  style={styles.tasteTagsButton}
                >
                  <Text style={styles.modalSelectTag}>
                    Select Restriction Tags
                  </Text>
                </TouchableOpacity>

                <TagModal
                  visible={isRestrictionTagsModalVisible}
                  tags={dietaryRestrictionTags}
                  selectedTags={selectedRestrictionTags}
                  onSelect={handleRestrictionTagSelect}
                  onClose={closeRestrictionTagsModal}
                />

                <TouchableOpacity
                  onPress={openTasteTagsModal}
                  style={styles.tasteTagsButton}
                >
                  <Text style={styles.modalSelectTag}>Select Taste Tags</Text>
                </TouchableOpacity>
                <TagModal
                  visible={isTasteTagsModalVisible}
                  tags={patronTasteTags}
                  selectedTags={selectedTasteTags}
                  onSelect={handleTasteTagSelect}
                  onClose={closeTasteTagsModal}
                />

                <TouchableOpacity
                  onPress={openAllergyTagsModal}
                  style={styles.tasteTagsButton}
                >
                  <Text style={styles.modalSelectTag}>Select Allergy Tags</Text>
                </TouchableOpacity>
                <TagModal
                  visible={isAllergyTagsModalVisible}
                  tags={allergyTags}
                  selectedTags={selectedAllergyTags}
                  onSelect={handleAllergyTagSelect}
                  onClose={closeAllergyTagsModal}
                />

                <TouchableOpacity
                  onPress={openIngredientTagsModal}
                  style={styles.tasteTagsButton}
                >
                  <Text style={styles.modalSelectTag}>
                    Select Disliked Ingredients
                  </Text>
                </TouchableOpacity>

                <TagModal
                  visible={isIngredientTagsModalVisible}
                  tags={dislikedIngredients}
                  selectedTags={selectedIngredientTags}
                  onSelect={handleIngredientSelect}
                  onClose={closeIngredientTagsModal}
                />

                <Text style={styles.labelInput}> Select Price Min: </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Min Price"
                  value={priceMin}
                  onChangeText={(text) => setPriceMin(text)}
                />

                <Text style={styles.labelInput}> Select Price Max: </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Max Price"
                  value={priceMax}
                  onChangeText={(text) => setPriceMax(text)}
                />
              </View>
            )}

            {/* Toggle Switch */}
            <View>
              <Text>Advanced Search</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isAdvancedSearch ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleAdvancedSearch}
                value={isAdvancedSearch}
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.navbarItem}
          onPress={() => navigation.navigate("Patron Homepage", { access })}
        >
          <Icon name="home" size={26} color="#000000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navbarItem}
          onPress={() => navigation.navigate("Search", { access })}
        >
          <Icon name="search" size={24} color="#000000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navbarItem}
          onPress={() => navigation.navigate("Menu Item History", { access })}
        >
          <Icon name="book" size={24} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  mainContent: {
    flex: 2,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "top",
    alignItems: "center",
  },
  labelInput: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFA500",
    padding: 10,
  },
  navbarItem: {
    backgroundColor: "#FFA500",
    alignItems: "left",
    flexDirection: "row",
  },
  navbarText: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginTop: 12,
    marginBottom: 12,
  },
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "60%",
    backgroundColor: "#f0f8ff",
    borderRadius: 15,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#FFA500",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
    width: "10%",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: "16",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "60%",
    backgroundColor: "#f0f8ff",
    borderRadius: 15,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },
  inputSearch: {
    fontSize: 20,
    marginLeft: 10,
    width: "60%",
  },
  calorieInput: {
    width: "60%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginTop: 12,
    marginBottom: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "left",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: 200,
  },
  resultsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  resultItem: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flex: "end",
    flexDirection: "row",
    backgroundColor: "#FFA500",
    width: "100%",
    justifyContent: "space-around",
    padding: 10,
  },
  modalSelectTag: {
    fontSize: 15,
  },
  tasteTagsButton: {
    backgroundColor: "rgba(255, 165, 0, 0.5)",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
});
export default Search;
