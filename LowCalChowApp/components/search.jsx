import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import logo from "../assets/icons8-carrot-94.png";

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
        setQuery("");
        setCalorieLimit("");
        setSelectedRestrictionTags([]);
        setSelectedAllergyTags([]);
        setSelectedIngredientTags([]);
        setSelectedTasteTags([]);
        setPriceMax("");
        setPriceMin("");
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
          <Text style={styles.navbarText}></Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navbarItem}
          onPress={() => navigation.navigate("Bookmark", { access })}
        >
          <Icon name="bookmark" size={25} color="#000000" />
        </TouchableOpacity>
        <Image source={logo} style={{ width: 30, height: 30 }} />
        <Text style={styles.title}>Search</Text>
        <TouchableOpacity
          style={styles.navbarItem}
          onPress={() => navigation.navigate("Patron Homepage", { access })}
        >
          <Icon name="home" size={24} color="#000000" />
          <Text style={styles.navbarText}></Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navbarItem}
          onPress={() => navigation.navigate("Search", { access })}
        >
          <Icon name="search" size={24} color="#000000" />
          <Text style={styles.navbarText}></Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navbarItem}
          onPress={() => navigation.navigate("Menu Item History", { access })}
        >
          <Icon name="book" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.root}>
        
          <Text style={styles.title}>Search for a Menu Item</Text>
          <View style={styles.container}>
            <View
              style={
                !clicked
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

            <TextInput
              style={styles.input}
              placeholder="Calorie Limit"
              value={calorieLimit}
              onChangeText={(text) => setCalorieLimit(text)}
            />

            <Text style={styles.modalSelectTag}>
              Select Dietary Restriction Tags
            </Text>
            <View style={{ marginVertical: 5, paddingHorizontal: 0, }}>
              <MultipleSelectList
                setSelected={(val) => setSelectedRestrictionTags(val)}
                data={dietaryRestrictionTags}
                save="key"
                label="Tags"
                boxStyles={{
                  backgroundColor: "rgba(255, 165, 0, 0.5)",
                  borderRadius: 15,
                  width: "100%",
                }}
                dropdownStyles={{
                  backgroundColor: "rgba(255, 165, 0, 0.5)",
                  borderRadius: 15,
                  width: "100%",
                }}
              />
            </View>

            <Text style={styles.modalSelectTag}>
              Select Dietary Allergy Tags
            </Text>
            <View style={{ marginVertical: 5, paddingHorizontal: 0,  }}>
              <MultipleSelectList
                setSelected={(val) => setAllergyTags(val)}
                data={allergyTags}
                save="key"
                label="Tags"
                boxStyles={{
                  backgroundColor: "rgba(255, 165, 0, 0.5)",
                  borderRadius: 15,
                  width: "100%",
                }}
                dropdownStyles={{
                  backgroundColor: "rgba(255, 165, 0, 0.5)",
                  borderRadius: 15,
                  width: "100%",
                }}
              />
            </View>

            <Text style={styles.modalSelectTag}>Select Taste Tags</Text>
            <View style={{ marginVertical: 5, paddingHorizontal: 0,}}>
              <MultipleSelectList
                setSelected={(val) => setSelectedTasteTags(val)}
                data={patronTasteTags}
                save="key"
                label="Tags"
                boxStyles={{
                  backgroundColor: "rgba(255, 165, 0, 0.5)",
                  borderRadius: 15,
                  width: "100%",
                }}
                dropdownStyles={{
                  backgroundColor: "rgba(255, 165, 0, 0.5)",
                  borderRadius: 15,
                  width: "100%",
                }}
              />
            </View>

            <Text style={styles.modalSelectTag}>
              Select Disliked Ingredient Tags
            </Text>
            <View style={{ marginVertical: 5, paddingHorizontal: 0, }}>
              <MultipleSelectList
                setSelected={(val) => setSelectedIngredientTags(val)}
                data={dislikedIngredients}
                save="key"
                label="Tags"
                boxStyles={{
                  backgroundColor: "rgba(255, 165, 0, 0.5)",
                  borderRadius: 15,
                  width: "100%",
                }}
                dropdownStyles={{
                  backgroundColor: "rgba(255, 165, 0, 0.5)",
                  borderRadius: 15,
                  width: "100%",
                }}
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Min Price"
              value={priceMin}
              onChangeText={(text) => setPriceMin(text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Max Price"
              value={priceMax}
              onChangeText={(text) => setPriceMax(text)}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        
      </View>

      {/* {searchResults.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Search Results</Text>
          {searchResults.map((result) => (
            <View key={result.id} style={styles.resultItem}>
              <Text style={styles.resultText}>{result.item_name}</Text>
              <Text style={styles.resultText}>Calories: {result.calories}</Text>
              <Text style={styles.resultText}>Price: ${result.price}</Text>
              <Text style={styles.resultText}>
                Restaurant: {result.restaurant.name}
              </Text>
            </View>
          ))}
        </View>
      )} */}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  mainContent: {
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "top",
    alignItems: "center",
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
    flexDirection: "row", // Align icon and text horizontally
  },
  navbarText: {
    color: "#000000",
    fontSize: 30,
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
    marginBottom: 12,
  },
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
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
    fontSize: 16,
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#b0c4de",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inputSearch: {
    fontSize: 20,
    marginLeft: 10,
    width: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "left",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  modalSelectTag: {
    fontSize: 15,
  },
});
export default Search;
