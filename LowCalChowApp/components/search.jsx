import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";

function Search({ navigation, route }) {
  const { access } = route.params;
  const [query, setQuery] = useState("");
  const [allergy_tags, setAllergy_tags] = useState([]);
  const [calorie_limit, setCalorie_limit] = useState("");
  const [dietary_restriction_tags, setDietary_restriction_tags] = useState([]);
  const [disliked_ingredients, setDisliked_ingredients] = useState([]);
  const [patron_taste_tags, setPatron_taste_tags] = useState([]);
  const [price_max, setPrice_max] = useState("");
  const [price_min, setPrice_min] = useState("");
  const [clicked, setClicked] = useState(false);
  // const handleSubmit = () => {
  //     let errors = {};
  //     const data = {
  //         query: query,
  //         allergy_tags: allergy_tags,
  //         calorie_limit: calorie_limit,
  //         dietary_restriction_tags: dietary_restriction_tags,
  //         disliked_ingredients: disliked_ingredients,
  //         patron_taste_tags: patron_taste_tags,
  //         price_max: price_max,
  //         price_min: price_min,
  //     };

  //     fetch("http://localhost:8000/patrons/searchhistory/", {
  //         method: "POST",
  //         headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //             "Authorization": "Bearer " + access,
  //         },
  //         body: JSON.stringify(data),
  //     })
  //         .then((response) => response.json())
  //         .then((responseData) => {
  //             // Handle the API response here
  //             console.log("API response:", responseData);

  //             if (responseData.message === "No Results or Search Failed") {
  //                 const [query] = responseData.content;
  //                 console.log("Menu Items:", [query]);
  //                 navigation.navigate("PatronHomepage");
  //             }
  //             else {
  //                 // Handle any error messages returned by the API
  //                 console.log("Message :", responseData.message);
  //                 // You can display an error message to the user if needed
  //             }
  //         })
  // };
  const handleSubmit = async () => {
    try {
      const searchData = {
        query: query,
        allergy_tags: allergy_tags,
        calorie_limit: parseInt(calorie_limit), // Convert to integer if necessary
        dietary_restriction_tags: dietary_restriction_tags,
        disliked_ingredients: disliked_ingredients,
        patron_taste_tags: patron_taste_tags,
        price_max: parseFloat(price_max), // Convert to float if necessary
        price_min: parseFloat(price_min),
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
      } else {
        console.error(response.json());
      }
    } catch (error) {
      console.error("Error adding search data", error);
    }
  };
  
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
          <Text style={styles.navbarText}></Text>
        </TouchableOpacity>
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
      </View>
      {/* <TouchableOpacity style={styles.button}
                onPress={() => navigation.navigate("SearchResults", { access })}>
                <Text style={styles.buttonText}>SearchResults</Text>
            </TouchableOpacity> */}

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
              value={calorie_limit}
              onChangeText={(text) => setCalorie_limit(text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Allergy"
              value={allergy_tags}
              onChangeText={(text) => setAllergy_tags(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Dietary tags"
              value={dietary_restriction_tags}
              onChangeText={(text) => setDietary_restriction_tags(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Disliked Ingredients"
              value={disliked_ingredients}
              onChangeText={(text) => setDisliked_ingredients(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Patron taste tags"
              value={patron_taste_tags}
              onChangeText={(text) => setPatron_taste_tags(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Max Price"
              value={price_max}
              onChangeText={(text) => setPrice_max(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Min Price"
              value={price_min}
              onChangeText={(text) => setPrice_min(text)}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const Results = ({ message, results }) => (
  <View style={styles.title}>
    <Text style={styles.mainContent}>{message}</Text>
    <Text style={styles.mainContent}>{results}</Text>
  </View>
);

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
});
export default Search;
